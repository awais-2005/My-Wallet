import NetInfo from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'
export const useInternetConnection = () => {
    const [connection, setConnection] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            console.log(state);
            setConnection(state.isConnected && state.isInternetReachable);
        })

        return unsubscribe
    }, []);

    return connection;
}