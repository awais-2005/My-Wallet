import NetInfo from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'
export const useInternetConnection = () => {
    const [connectionDetails, setConnectionDetails] = useState({});

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            console.log(state);
            setConnectionDetails({
                isConnected: state.isConnected && state.isInternetReachable,
                type: state.type,
            });
        })

        return unsubscribe
    }, []);

    return connectionDetails;
}