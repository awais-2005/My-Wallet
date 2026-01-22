
    // useEffect(() => {
    //     console.log("Balancer useEffect is running!");
        
    //     const [day, month, date, year] = new Date().toString().split(' ');
    //     if (listOfTransactions.length === 0) {
    //         console.log("break!!!!!!!!!!!!!!!");
    //         return;
    //     }
    //     const [lastTxMonth, lastTxDay, lastTxYear] =  listOfTransactions[0].date.split(" ");
    //     console.log(typeof(lastTxYear) === typeof(year));
    //     if(lastTxMonth && lastTxYear && (lastTxMonth !== month || lastTxYear !== year)) { 
    //         const [totalReceived, totalSpent] = getTotalReceivedAndSpent(lastTxMonth, lastTxYear);
    //         balanceTransaction(totalReceived, totalSpent, month, year);
    //     }
    // }, [balanceTransaction, getTotalReceivedAndSpent, listOfTransactions]);

    // const balanceTransaction = useCallback((totalReceived, totalSpent, month, year) => {
    //     console.log("balancer Func called!")    
        
    //     const remainings = {
    //         id: `${month}1${year}000001`,
    //         title: 'Remaining from last month',
    //         type: 'remainings',
    //         amount: totalReceived - totalSpent,
    //         date: `${month} 1 ${year} 00:00:01`,
    //     }

    //     setListOfTransactions(prev => [remainings, ...prev]);
    //     EncryptedStorage.setItem('transactions', JSON.stringify(listOfTransactions));
    // }, [listOfTransactions]);

    // const getTotalReceivedAndSpent = useCallback((month, year) => {
    //     let received = 0;
    //     let spent = 0;
    //     listOfTransactions.forEach((tx) => {
    //         let [txMonth, date, txYear] = tx.date.split(' ');
    //         if(month === txMonth && year === txYear) {
    //             if (tx.amount > 0) {
    //                 received += tx.amount;
    //             } else {
    //                 spent += tx.amount;
    //             }
    //         }
    //     });
    //     return [received, -spent];
    // }, [listOfTransactions]);

    // const getPreviousMonth = useCallback((month) => {
    //     if(month === 'Jan') return 'Dec';
    //     return getMonthNumberOrName(getMonthNumberOrName(month) - 1);
    // }, []);

    // const getRemaingAmount = useCallback((month, year) => {
    //     const [totalReceived, totalSpent] = getTotalReceivedAndSpent(month, year);
    //     return totalReceived - totalSpent;
    // }, [getTotalReceivedAndSpent])

    // const setAllRemainingsTx = useCallback(async () => {
    //     console.log("Test - 1");
    //     let copyOfList = [...listOfTransactions];
    //     console.log("Test - 2");
    //     for(let i = copyOfList.length - 1; i > 0; i--) {
    //         const [prevMonth, prevDay, prevYear] = copyOfList[i].date.split(' ');
    //         const [nextMonth, nextDay, nextYear] = copyOfList[i - 1].date.split(' ');
    //         if(prevMonth !== nextMonth && copyOfList[i - 1].type !== "remainings") {
    //             console.log(prevMonth)
    //             console.log(nextMonth)
    //             const part1 = copyOfList.slice(0, i);
    //             const part2 = copyOfList.slice(i);
    //             console.log("Test - 3");
    //             const remainingsTransaction = {
    //                 id: `${nextMonth}1${nextYear}000001`, // Like Jan 1 2026 00:00:01 --> Jan12026000001
    //                 title: "Remainings from previous month",
    //                 type: "remainings",
    //                 amount: getRemaingAmount(prevMonth, prevYear),
    //                 date: `${nextMonth} 1 ${nextYear} 00:00:01`,
    //             }
    //             console.log("Transaction: ", remainingsTransaction);
    //             copyOfList = [
    //                 ...part1,
    //                 remainingsTransaction,
    //                 ...part2
    //             ];
    //             i++;
    //         }
    //     }
    //     const [lastTxMonth, lastTxDay, lastTxYear] =  copyOfList[0].date.split(" ");
    //     const [day, currMonth, currDay, currYear] = new Date().toString().split(" ");
        
    //     if (lastTxMonth !== currMonth || lastTxYear !== currYear) {
    //         const remainingsTransaction = {
    //             id: `${currMonth}1${currYear}000001`, // Like Jan 1 2026 00:00:01 --> Jan12026000001
    //             title: "Remainings from previous month",
    //             type: "remainings",
    //             amount: getRemaingAmount(lastTxMonth, lastTxYear),
    //             date: `${currMonth} 1 ${currYear} 00:00:01`,
    //         }
    //         copyOfList = [remainingsTransaction, ...copyOfList];
    //     }
        
    //     try {
    //         console.log("Test - 4");
    //         await EncryptedStorage.setItem("transactions", JSON.stringify(copyOfList))
    //         console.log("Test - 5");
    //         setListOfTransactions(copyOfList);
    //         console.log(copyOfList);
    //         console.log(listOfTransactions);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, [getRemaingAmount, listOfTransactions]);
    

    // const getMonthNumberOrName = (id) => {
    //         const monthNumber = {
    //             Jan: 1,
    //             Feb: 2,
    //             Mar: 3,
    //             Apr: 4,
    //             May: 5,
    //             Jun: 6,
    //             Jul: 7,
    //             Aug: 8,
    //             Sep: 9,
    //             Oct: 10,
    //             Nov: 11, 
    //             Dec: 12,
    //         }
    
    //         if(typeof(id) === 'string'){
    //             try {
    //                 return monthNumber[id];
    //             } catch (e) {
    //                 console.log(e);
    //             }
    //         } else if (typeof(id) === 'number' && id > 0 && id < 13) {
    //             for (let key in monthNumber) {
    //                 id--;
    //                 if(id === 0) {
    //                     return key;
    //                 }
    //             }
    //         }
    //     }

    