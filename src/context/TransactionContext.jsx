import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { createMMKV } from "react-native-mmkv";

export const TransactionContext = createContext();

export const storage = createMMKV();

export default function TxContextProvider({ children }) {

    const [listOfTransactions, setListOfTransactions] = useState([]);
    const [navigation, setNavigation] = useState({});
    const [user, setUser] = useState(storage.getString('user') ? JSON.parse(storage.getString('user')) : {});

    useEffect(() => {
        // Fetching transactions from storage.
        const data = storage.getString('transactions')
        const objArray = data ? JSON.parse(data) : [];
        setListOfTransactions(typeof (objArray) === 'string' ? [] : objArray);
    }, []);

    const deleteTransaction = useCallback((transaction) => {
        let updatedTransactions = listOfTransactions.filter(tx => tx.id !== transaction.id && tx);
        try {
            storage.set('transactions', JSON.stringify(updatedTransactions))
            setListOfTransactions(updatedTransactions);
        } catch (error) {
            Alert.alert('Failed', 'Could not deleted the transaction. ' + error);
        }
    }, [listOfTransactions]);

    useEffect(() => {
        console.log("user updated", user);
    }, [user])    

    const addNewTransaction = useCallback((newTransaction, showAlert = true) => {

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
    }, [listOfTransactions, navigation]);

    const updateTransaction = useCallback((editedTransaction) => {
        let updatedTransactions = listOfTransactions.map((tx) => editedTransaction.id === tx.id ? editedTransaction : tx);
        try {
            storage.set('transactions', JSON.stringify(updatedTransactions));
            setListOfTransactions(updatedTransactions);
            navigation && navigation.canGoBack() && navigation.goBack();
        } catch (error) {
            Alert.alert('Failed', 'Could not update transaction history.');
        }
    }, [listOfTransactions, navigation]);

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
            const [month, day, year] = tx.date.split(' ');
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
            if (!tx.date.includes(year)) return;
            const month = tx.date.split(' ')[0];
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
            if (!tx.date.includes(year) || !tx.date.includes(month)) return;
            const key = tx.date.split(' ')[1];
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

        let [Day, currMonth, date, currYear] = new Date().toString().split(' ');

        let data = [];

        listOfTransactions.forEach((tx) => {
            const [txMonth, txDate, txYear] = tx.date.split(' ');
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
        currentMonthTransactions
    }), [addNewTransaction, currentMonthTransactions, deleteTransaction, getDataOfDays, getDataOfWeeks, getDataOfYear, listOfTransactions, navigation, updateTransaction, user, yearAndMonths]);

    return (
        <TransactionContext.Provider value={values}>
            {children}
        </TransactionContext.Provider>
    );

}