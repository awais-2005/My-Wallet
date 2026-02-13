import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

export function useCurrencyInfo () {
    const { user } = useContext(TransactionContext);
    const [infoObj, setInfoObj] = useState({});
    
    
    useEffect(() => {
        const symbols = {
          INR: '₹',
          PKR: '₨',
          GBP: '£',
          USD: '$',
          EUR: '€',
        };
        const multiplyers = {
          USD: 1 / 279.5,
          EUR: 1 / 331.8,
          GBP: 1 / 381.3,
          INR: 1 / 3.08,
          PKR: 1
        }
        setInfoObj({symbol: symbols[user.currency], multiplyer: multiplyers[user.currency]})
    }, [user]);

    return infoObj;
}