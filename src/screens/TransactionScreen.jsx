/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Navbar from '../../components/Navbar';
import EditableTxCard from '../../components/EditableTxCard';
import { TransactionContext } from '../context/TransactionContext';
import LottieView from 'lottie-react-native';
import { screenHeight, screenWidth } from '../../App';

function TransactionScreen({ navigation }) {

    const context = useContext(TransactionContext);

    return (
        <View style={styles.main}>
            <View style={styles.topBgShape} />
            <Navbar
                navigation={navigation}
                screenTitle="Transaction History"
            />

            {context.listOfTransactions.length > 0 && (<View style={styles.listContainer}>
                <View style={[styles.cardsContainer, { backgroundColor: '#f0f0f0' }]}>
                    <FlatList
                        data={context.listOfTransactions}
                        renderItem={({ item }) => <EditableTxCard item={item} />}
                        keyExtractor={item => item.id}
                        initialNumToRender={20}
                    />
                </View>
            </View>)}
            {context.listOfTransactions.length === 0 &&
                (<View style={styles.animationContainer}>
                    <LottieView
                        source={require('../../assets/no_result_found.json')}
                        autoPlay={true}
                        loop={false}
                        style={{ width: wp(90), height: wp(60) }}
                    />
                    <Text style={styles.emptyText}>No Transaction!</Text>
                </View>)
            }
        </View>
    );
}
export const wp = (scale) => (screenWidth / 100) * scale;
export const hp = (scale) => (screenHeight / 100) * scale;
const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    topBgShape: {
        height: '33%',
        width: '100%',
        backgroundColor: '#368984',
        position: 'absolute',
        top: 0,
        left: 0,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    animationContainer: {
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        marginTop: -20,
        fontSize: (screenWidth / 100) * 4.5,
    },
    listContainer: {
        width: '100%',
        paddingHorizontal: '2.5%',
        marginTop: 90,
        borderRadius: 10,
        marginBottom: 140,
        overflow: 'hidden',
    },
    cardsContainer: {
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
    },
    dropDown: {
        backgroundColor: '#2F7D79',
        borderWidth: 0,
        borderRadius: 10,
        width: 170,
        marginTop: 60,
        alignSelf: 'flex-end',
        marginRight: '2.5%',
        zIndex: 1000,
    },
    dropDownContainer: {
        backgroundColor: 'rgba(59, 153, 148, 1)',
        borderWidth: 0,
        borderRadius: 10,
        marginTop: 60,
        width: 170,
        position: 'absolute',
        right: '2.5%',
    },
    dropDownIconContainer: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    dropDownText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
        marginLeft: 10,
    },
    dropDownLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        marginLeft: 10,
    },
    dropDownPlaceholder: {
        color: '#fff',
        fontSize: 15,
    },
    dropDownArrowIcon: {
        tintColor: '#fff',
    },
});

export default TransactionScreen;
