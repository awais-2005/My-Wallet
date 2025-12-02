/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Navbar from '../../components/Navbar';
import EditableTxCard from '../../components/EditableTxCard';
import ArrangedByDaysBlock from '../../components/ArrangedByDaysBlock';
import ArrangedByTypeBlock from '../../components/ArrangedByTypeBlock';
import { TransactionContext } from '../context/TransactionContext';
import DropDown from '../../components/DropDown';

function TransactionScreen({ navigation }) {

    const context = useContext(TransactionContext);
    const [arrangedByDays, setArrangedByDays] = useState([]);
    const [arrangedByType, setArrangedByType] = useState([]);

    useEffect(() => {
        setArrangedByDays(getArrangedByDays(context.listOfTransactions));
        setArrangedByType(getArrangedByType(context.listOfTransactions));
    }, [context.listOfTransactions]);

    const [value, setValue] = useState(null);
    const items = [
        { label: 'Days', value: 'Days' },
        { label: 'Types', value: 'Types' },
        { label: 'None', value: 'None' },
    ];

    return (
        <View style={styles.main}>
            <View style={styles.topBgShape} />
            <Navbar
                navigation={navigation}
                screenTitle="Transaction History"
            />

            <DropDown value={value} setValue={setValue} options={items}/>

            <View style={styles.listContainer}>
                <View style={[styles.cardsContainer, {backgroundColor:  value === 'None' || !value ? '#f0f0f0' : 'transparent'}]}>
                    {
                        (value === 'None' || !value) && (
                            <FlatList
                                data={context.listOfTransactions}
                                renderItem={({ item }) => <EditableTxCard item={item} />}
                                keyExtractor={item => item.id}
                                initialNumToRender={20}
                            />

                        ) ||
                        (value === 'Days') && (
                            <FlatList
                                data={arrangedByDays}
                                renderItem={({ item, index }) => <ArrangedByDaysBlock item={item} index={index} />}
                                keyExtractor={(item, index) => index.toString()}
                                initialNumToRender={3}
                            />
                        ) ||
                        (value === 'Types') && (
                            <FlatList
                                data={arrangedByType}
                                renderItem={({ item, index }) => <ArrangedByTypeBlock item={item} index={index} />}
                                keyExtractor={(item, index) => index.toString()}
                                initialNumToRender={3}
                            />
                        )
                    }
                </View>
            </View>
        </View>
    );
}

function getArrangedByDays(transactions) {
    console.log("Arranging by days");
    let days = [];
    let txCorrespondingToDays = [];
    let dayCount = -1;
    for (let tx of transactions) {
        let dets = tx.date.split(' ');
        let newDets = dets[0] + ' ' + dets[1] + ' ' + dets[2];
        if (!days.includes(newDets)) {
            days.push(newDets);
            txCorrespondingToDays.push([]);
            dayCount++;
        }
        txCorrespondingToDays[dayCount].push(tx);
    }
    console.log('Done.');
    return txCorrespondingToDays;
}

function getArrangedByType(transactions) {
    console.log("Arranging by type");
    let types = [];
    let txCorrespondingToType = [];
    for (let tx of transactions) {
        if (!types.includes(tx.type)) {
            types.push(tx.type);
            txCorrespondingToType.push([]);
        }
        txCorrespondingToType[types.indexOf(tx.type)].push(tx);
    }
    console.log('Done.');
    return txCorrespondingToType;
}

const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    topBgShape: {
        height: '200%',
        width: '300%',
        backgroundColor: '#368984',
        position: 'absolute',
        top: '-162%',
        left: '-100%',
        borderRadius: 690,
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
