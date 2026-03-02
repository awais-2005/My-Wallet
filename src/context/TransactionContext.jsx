import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import { createMMKV } from "react-native-mmkv";
import { deleteTransactionById, extractBackendIds, savePendingTransactions, updateTransactionById } from "../utils/saveTransaction";

export const TransactionContext = createContext();

export const storage = createMMKV();

export default function TxContextProvider({ children }) {

    const [listOfTransactions, setListOfTransactions] = useState([]);
    const [navigation, setNavigation] = useState({});
    const [user, setUser] = useState(storage.getString('user') ? JSON.parse(storage.getString('user')) : {});
    const listRef = useRef(listOfTransactions);

    useEffect(() => {
        listRef.current = listOfTransactions;
    }, [listOfTransactions]);

    const fixList = useCallback((list = []) => {
        return list.map((t) => ({ ...t, created_at: t.created_at || t.date }));
    }, []);

    const parseStoredArray = useCallback((key) => {
        try {
            const raw = storage.getString(key);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            return [];
        }
    }, []);

    const getPendingQueue = useCallback(() => parseStoredArray('pendingQueue'), [parseStoredArray]);

    const setPendingQueue = useCallback((pendingQueue = []) => {
        if (!Array.isArray(pendingQueue) || pendingQueue.length === 0) {
            storage.remove('pendingQueue');
            return;
        }
        storage.set('pendingQueue', JSON.stringify(pendingQueue));
    }, []);

    useEffect(() => {
        // Fetching transactions from storage.
        let objArray = parseStoredArray('transactions');
        if (objArray.length > 0 && !objArray[0]?.created_at) {
            objArray = fixList(objArray);
            storage.set('transactions', JSON.stringify(objArray));
        }
        setListOfTransactions(objArray);
    }, [fixList, parseStoredArray]);

    const syncPendingQueueEntry = useCallback((transaction, remove = false) => {
        const pendingQueue = getPendingQueue();
        const index = pendingQueue.findIndex((tx) => String(tx.id) === String(transaction.id));

        if (remove) {
            if (index === -1) return;
            pendingQueue.splice(index, 1);
            setPendingQueue(pendingQueue);
            return;
        }

        if (index === -1) return;

        pendingQueue[index] = {
            ...pendingQueue[index],
            ...transaction,
            isBackedup: false,
        };
        setPendingQueue(pendingQueue);
    }, [getPendingQueue, setPendingQueue]);

    const deleteTransaction = useCallback(async (transaction) => {
        const updatedTransactions = listOfTransactions.filter((tx) => String(tx.id) !== String(transaction.id) && tx);
        try {
            storage.set('transactions', JSON.stringify(updatedTransactions))
            setListOfTransactions(updatedTransactions);
            syncPendingQueueEntry(transaction, true);

            if (user?.token && transaction?.isBackedup === true) {
                try {
                    await deleteTransactionById(transaction.id, user.token);
                } catch (err) {
                    Alert.alert('Deleted Locally', err?.message || 'Unable to delete transaction from backup right now.');
                }
            }
        } catch (error) {
            Alert.alert('Failed', 'Could not deleted the transaction. ' + error);
        }
    }, [listOfTransactions, syncPendingQueueEntry, user?.token]);

    useEffect(() => {
        storage.set('user', JSON.stringify(user));
    }, [user])

    const addInPendingQueue = useCallback((newTransaction) => {
        try {
            const pendingQueue = getPendingQueue();
            const existingIndex = pendingQueue.findIndex((tx) => String(tx.id) === String(newTransaction.id));
            if (existingIndex === -1) {
                pendingQueue.push(newTransaction);
            } else {
                pendingQueue[existingIndex] = newTransaction;
            }
            setPendingQueue(pendingQueue);
        } catch (err) {
            console.log(err);
        }
    }, [getPendingQueue, setPendingQueue]);


    const addNewTransaction = useCallback((newTransaction, showAlert = true) => {
        if (!newTransaction.isBackedup) addInPendingQueue(newTransaction);
        const updatedTransactions = [newTransaction, ...listOfTransactions];
        try {
            storage.set('transactions', JSON.stringify(updatedTransactions));
            setListOfTransactions(updatedTransactions);
            showAlert && Alert.alert('Success', 'Transaction has been saved.', [
                {
                    text: 'Ok',
                    style: 'default',
                    onPress: () => { navigation && navigation.canGoBack() && navigation.goBack() },
                }
            ]);

        } catch (error) {
            Alert.alert('Failed', 'Could not save transaction. ' + error);
        }
    }, [addInPendingQueue, listOfTransactions, navigation]);

    const updateTransaction = useCallback(async (editedTransaction) => {
        const previousTransaction = listOfTransactions.find((tx) => String(editedTransaction.id) === String(tx.id));
        const updatedTransactions = listOfTransactions.map((tx) => String(editedTransaction.id) === String(tx.id) ? { ...tx, ...editedTransaction } : tx);
        try {
            storage.set('transactions', JSON.stringify(updatedTransactions));
            setListOfTransactions(updatedTransactions);
            syncPendingQueueEntry(editedTransaction);
            navigation && navigation.canGoBack() && navigation.goBack();

            if (user?.token && previousTransaction?.isBackedup === true) {
                try {
                    await updateTransactionById(editedTransaction.id, editedTransaction, user.token);
                } catch (err) {
                    Alert.alert('Updated Locally', err?.message || 'Unable to update transaction backup right now.');
                }
            }
        } catch (error) {
            Alert.alert('Failed', 'Could not update transaction history.');
        }
    }, [listOfTransactions, navigation, syncPendingQueueEntry, user?.token]);

    const syncPendingTransactions = useCallback(async () => {
        if (!user?.token) {
            throw new Error('Missing user token.');
        }

        const pendingQueue = getPendingQueue();
        if (pendingQueue.length === 0) {
            return { syncedCount: 0, remainingCount: 0 };
        }

        const response = await savePendingTransactions(pendingQueue, user.token);
        const ids = extractBackendIds(response);

        if (!Array.isArray(ids) || ids.length === 0) {
            throw new Error('Backend did not return ids for pending transactions.');
        }

        const idMap = new Map();
        const limit = Math.min(ids.length, pendingQueue.length);

        for (let i = 0; i < limit; i++) {
            const pendingTx = pendingQueue[i];
            const backendId = ids[i];

            if (pendingTx?.id === undefined || pendingTx?.id === null) continue;
            if (backendId === undefined || backendId === null || backendId === '') continue;

            idMap.set(String(pendingTx.id), backendId);
        }

        if (idMap.size === 0) {
            throw new Error('No valid id mapping returned by backend.');
        }

        const updatedTransactions = listRef.current.map((tx) => {
            const backendId = idMap.get(String(tx.id));
            if (backendId === undefined) return tx;
            return { ...tx, id: backendId, isBackedup: true };
        });

        storage.set('transactions', JSON.stringify(updatedTransactions));
        setListOfTransactions(updatedTransactions);

        const remainingQueue = pendingQueue.filter((tx) => !idMap.has(String(tx.id)));
        setPendingQueue(remainingQueue);

        return { syncedCount: idMap.size, remainingCount: remainingQueue.length };
    }, [getPendingQueue, setPendingQueue, user?.token]);

    const importData = (transactions) => {
        try {
            storage.set('transactions', transactions)
            setListOfTransactions(JSON.parse(transactions));
            Alert.alert('Success', 'Transaction history has been imported successfully.');
        } catch (error) {
            Alert.alert('Failed', 'Could not import transaction history.');
        }
    };

    // Extracting years and months for chart
    const yearAndMonths = useMemo(() => {
        let data = {};
        listOfTransactions.forEach((tx) => {
            const [month, , year] = tx.created_at.split(' ');
            data[year] ?? (data[year] = new Set());
            data[year].add(month);
        });
        for (let year in data) {
            data[year] = [...data[year]].reverse();
        }
        return data;
    }, [listOfTransactions]);

    const getDataOfYear = useCallback((year, setData = null) => {
        let listOfCatagorizedByMonth = {};
        listOfTransactions.forEach((tx) => {
            if (!tx.created_at.includes(year)) return;
            const month = tx.created_at.split(' ')[0];
            listOfCatagorizedByMonth[month] ?? (listOfCatagorizedByMonth[month] = 0)
            listOfCatagorizedByMonth[month] += tx.amount > 0 ? 0 : -tx.amount;
        });
        let data = [];
        for (let key in listOfCatagorizedByMonth) {
            data = [{ label: key, spent: listOfCatagorizedByMonth[key] }, ...data];
            // data.push({ label: key, spent: listOfCatagorizedByMonth[key] })
        }
        setData && setData(data);
        return data;
    }, [listOfTransactions]);

    const getDataOfDays = useCallback((month, year, setData = null, justList = false) => {
        let list = {};
        listOfTransactions.forEach((tx) => {
            if (!tx.created_at.includes(year) || !tx.created_at.includes(month)) return;
            const key = tx.created_at.split(' ')[1];
            list[key] ?? (list[key] = 0)
            list[key] += tx.amount > 0 ? 0 : -tx.amount;
        })

        if (justList) return list;

        let data = [];
        for (let key in list) {
            data.push({ label: `${Number(key)} ${month}`, spent: list[key] });
        }

        // pass setter or not optional
        setData && setData(data);

        return data;
    }, [listOfTransactions]);

    const getNumberOfDaysInMonth = (month, year) => {
        const months = {
            'Jan': 31,
            'Feb': (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28,
            'Mar': 31,
            'Apr': 30,
            'May': 31,
            'Jun': 30,
            'Jul': 31,
            'Aug': 31,
            'Sep': 30,
            'Oct': 31,
            'Nov': 30,
            'Dec': 31
        }
        if (months[month]) {
            return months[month];
        } else {
            Alert.alert('Error', 'Invalid month provided to get number of days.');
        }
    }

    const getDataOfWeeks = useCallback((month, year, setData = null) => {

        let dailyList = getDataOfDays(month, year, null, true);
        let weekList = {}
        let lastDayOfMonth = getNumberOfDaysInMonth(month, Number(year));
        console.log("Last day of month:", lastDayOfMonth);
        for (let key in dailyList) {
            if (Number(key) <= 7) {
                weekList['1-7'] ?? (weekList['1-7'] = 0)
                weekList['1-7'] += dailyList[key];
            }
            else if (Number(key) <= 14) {
                weekList['8-14'] ?? (weekList['8-14'] = 0)
                weekList['8-14'] += dailyList[key];
            }
            else if (Number(key) <= 21) {
                weekList['15-21'] ?? (weekList['15-21'] = 0)
                weekList['15-21'] += dailyList[key];
            }
            else if (Number(key) <= 28) {
                weekList['22-28'] ?? (weekList['22-28'] = 0)
                weekList['22-28'] += dailyList[key];
            }
            else {
                weekList[`29-${lastDayOfMonth}`] ?? (weekList[`29-${lastDayOfMonth}`] = 0)
                weekList[`29-${lastDayOfMonth}`] += dailyList[key];
            }
        }

        let data = [];

        for (let key in weekList) {
            data.push({ label: `${key} ${month}`, spent: weekList[key] });
        }

        setData(data);
        return data;
    }, [getDataOfDays]);

    const currentMonthTransactions = useMemo(() => {
        console.log("Extracting Current Year...");

        let [, currMonth, , currYear] = new Date().toString().split(' ');

        let data = [];

        listOfTransactions.forEach((tx) => {
            const [txMonth, , txYear] = tx.created_at.split(' ');
            if (currMonth === txMonth && currYear === txYear) {
                data.push(tx);
            }
        });
        return data;
    }, [listOfTransactions]);

    const values = useMemo(() => ({
        navigation,
        listOfTransactions,
        user,
        setUser,
        setNavigation,
        setListOfTransactions,
        addNewTransaction,
        updateTransaction,
        deleteTransaction,
        getDataOfDays,
        getDataOfWeeks,
        getDataOfYear,
        importData,
        yearAndMonths,
        currentMonthTransactions,
        syncPendingTransactions
    }), [addNewTransaction, currentMonthTransactions, deleteTransaction, getDataOfDays, getDataOfWeeks, getDataOfYear, listOfTransactions, navigation, syncPendingTransactions, updateTransaction, user, yearAndMonths]);

    return (
        <TransactionContext.Provider value={values}>
            {children}
        </TransactionContext.Provider>
    );

}
