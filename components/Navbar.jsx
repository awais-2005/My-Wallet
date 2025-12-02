import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TransactionContext } from '../src/context/TransactionContext';

function Navbar({ screenTitle }) {
    const context = useContext(TransactionContext);
    const goBack = () => {
        if (context.navigation.canGoBack()) {
            try {
                if(screenTitle === 'Edit Transaction') {
                    context.navigation.jumpTo('History');
                } else {
                    context.navigation.goBack();
                }
            } catch (err) {
                console.log("Got Error while going back:", err)
            }
        }
    };
    return (
        <View style={styles.navBar}>
            <TouchableOpacity style={styles.back} onPress={goBack}>
                <Ionicons name="chevron-back" size={25} color={screenTitle === 'Statistics' || screenTitle === 'Settings' ? '#000' : '#fff'} />
            </TouchableOpacity>
            <Text style={[styles.title, screenTitle === 'Statistics' || screenTitle === 'Settings' ? { color: '#000' } : {}]}>{screenTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
    back: {
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: '3%',
    },
});

export default Navbar;
