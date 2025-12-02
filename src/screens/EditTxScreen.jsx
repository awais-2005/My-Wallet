/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import Navbar from '../../components/Navbar';
import { TransactionContext } from '../context/TransactionContext';
import { SafeAreaView } from 'react-native-safe-area-context';

function EditTxScreen({ navigation, route }) {

    const context = useContext(TransactionContext);

    const [tx, setTx] = useState(route.params);
    
    useEffect(() => {
        setTx(route.params);
    }, [route.params]);
    
    useEffect(() => {
        setTxTitle(tx.title);
        setTxAmount((tx.amount < 0 ? -tx.amount : tx.amount) + '');
        setValue2(tx.type !== 'Income' ? 'Expense' : 'Income');
        setValue(tx.type === 'Income' ? null : tx.type);
    }, [tx]);

    const [txTitle, setTxTitle] = useState('');
    const [txAmount, setTxAmount] = useState('');

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState('');
    const [items2, setItems2] = useState([
        {
            label: 'Income',
            value: 'Income',
            icon: () => <View style={[styles.dropDownIconContainer, { backgroundColor: 'rgba(23, 209, 79, 0.3)' }]}><Ionicons name="trending-up" size={20} color="rgba(10, 145, 50, 1)" /></View>,
        },
        {
            label: 'Expense',
            value: 'Expense',
            icon: () => <View style={[styles.dropDownIconContainer, { backgroundColor: 'rgba(255, 50, 50, 0.3)' }]}><Ionicons name="trending-down" size={20} color="rgba(255, 50, 50, 1)" /></View>,
        },
    ]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([
        {
            label: 'Chai',
            value: 'Chai',
            icon: () => <View style={[styles.dropDownIconContainer, { backgroundColor: 'rgba(209, 145, 48, 0.3)' }]}><FontAwesome name="coffee" size={20} color="#d19130ff" /></View>,
        },
        {
            label: 'Food',
            value: 'Food',
            icon: () => <View style={[styles.dropDownIconContainer, { backgroundColor: 'rgba(56, 189, 78, 0.3)' }]}><Ionicons name="fast-food-outline" size={20} color="rgba(56, 189, 78, 1)" /></View>,
        },
        {
            label: 'Fuel',
            value: 'Fuel',
            icon: () => <View style={[styles.dropDownIconContainer, { backgroundColor: 'rgba(255, 64, 64, 0.3)' }]}><MaterialIcons name="local-gas-station" size={20} color="#ff4040ff" /></View>,
        },
        {
            label: 'Grocery',
            value: 'Grocery',
            icon: () => <View style={[styles.dropDownIconContainer, { backgroundColor: 'rgba(255, 68, 0, 0.3)' }]}><FontAwesome name="shopping-cart" size={20} color="#ff4400" /></View>,
        },
        {
            label: 'Rent',
            value: 'Rent',
            icon: () => <View style={[styles.dropDownIconContainer, { backgroundColor: 'rgba(0, 81, 255, 0.3)' }]}><Ionicons name="home-outline" size={20} color="rgba(0, 81, 255, 1)" /></View>,
        },
        {
            label: 'Shopping',
            value: 'Shopping',
            icon: () => <View style={[styles.dropDownIconContainer, { backgroundColor: 'rgba(177, 0, 162, 0.3)' }]}><Ionicons name="shirt-outline" size={20} color="rgba(177, 0, 162, 1)" /></View>,
        },
        {
            label: 'Travel',
            value: 'Travel',
            icon: () => <View style={[styles.dropDownIconContainer, { backgroundColor: 'rgba(0, 174, 187, 0.3)' }]}><FontAwesome name="plane" size={20} color="rgba(0, 174, 187, 1)" /></View>,
        },
        {
            label: 'Personal Care',
            value: 'Personal Care',
            icon: () => <View style={[styles.dropDownIconContainer, {
                backgroundColor: 'rgba(255, 238, 0, 0.1)'
            }]}><Ionicons name="sparkles" size={20} color="rgba(255, 238, 0, 1)" /></View>,
        },
        {
            label: 'Medical',
            value: 'Medical',
            icon: () => <View style={[styles.dropDownIconContainer, {
                backgroundColor: 'rgba(255, 0, 0, 0.2)'
            }]}><Ionicons name="medical" size={20} color="rgba(255, 0, 0, 1)" /></View>,
        },
        {
            label: 'Loan Repayment',
            value: 'Loan Repayment',
            icon: () => <View style={[styles.dropDownIconContainer, {
                backgroundColor: 'rgba(0, 255, 0, 0.2)'
            }]}><Ionicons name="return-up-back-outline" size={20} color="rgba(21, 112, 21, 1)" /></View>,
        },
        {
            label: 'Lend Money',
            value: 'Lend Money',
            icon: () => <View style={[styles.dropDownIconContainer, {
                backgroundColor: 'rgba(0, 0, 255, 0.2)'
            }]}><Ionicons name="arrow-up-circle-outline" size={20} color="rgba(21, 21, 112, 1)" /></View>,
        },
        {
            label: 'Bad Debt',
            value: 'Bad Debt',
            icon: () => <View style={[styles.dropDownIconContainer, {
                backgroundColor: 'rgba(204, 45, 45, 0.2)'
            }]}><FontAwesome name="money" size={20} color="rgba(204, 0, 0, 1)" /></View>,
        },
        {
            label: 'Family Support',
            value: 'Family Support',
            icon: () => <View style={[styles.dropDownIconContainer, {
                backgroundColor: 'rgba(0, 255, 0, 0.2)'
            }]}><FontAwesome name="money" size={20} color="rgba(21, 112, 21, 1)" /></View>,
        },
        {
            label: 'Bills',
            value: 'Bills',
            icon: () => <View style={[styles.dropDownIconContainer, {
                backgroundColor: 'rgba(255, 166, 0, 0.3)'
            }]}><Ionicons name="receipt-outline" size={20} color="rgba(255, 166, 0, 1)" /></View>,
        },
        {
            label: 'Other',
            value: 'Other',
            icon: () => <View style={[styles.dropDownIconContainer, {
                backgroundColor: 'hsla(189, 15%, 53%, 0.3)'
            }]}><Ionicons name="ellipsis-horizontal-outline" size={20} color="hsla(189, 15%, 53%, 1.00)" /></View>,
        },
    ]);

    const resetState = () => {
        setOpen(false);
        setOpen2(false);
        setValue(null);
        setValue2(null);
        setTxTitle(null);
        setTxAmount(null);
    };

    const handleSave = () => {
        if (!txTitle || !txAmount || (value2 === 'Expense' ? (!value || !value2) : !value2)) { return; }
        context.updateTransaction(
            {
                id: tx.id,
                title: txTitle,
                type: value2 === 'Expense' ? value : value2,
                amount: value2 === 'Expense' ? -Number(txAmount) : Number(txAmount), // make a validator
                date: tx.date,
            },
        );
        resetState();
    };
    return (
        <View style={styles.main}>
            <View style={styles.topBgShape} />
            <Navbar
                navigation={navigation}
                screenTitle="Edit Transaction"
            />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.popup}>
                    <Text style={styles.inputLabel}>Transaction Type</Text>
                    <DropDownPicker
                        open={open2}
                        value={value2}
                        items={items2}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setItems2}
                        placeholder="Select transaction type"
                        zIndex={1010}
                        style={[styles.dropDown, { zIndex: 1010 }]}
                        dropDownContainerStyle={styles.dropDownContainer}
                        textStyle={styles.dropDownText}
                        labelStyle={styles.dropDownLabel}
                        placeholderStyle={styles.dropDownPlaceholder}
                        arrowIconStyle={styles.dropDownArrowIcon}
                    />
                    {(value2 === 'Expense') && (
                        <>
                            <Text style={styles.inputLabel}>Expense Type</Text>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                placeholder="Select type of Expense"
                                zIndex={1000}
                                style={[styles.dropDown, { zIndex: 1000 }]}
                                dropDownContainerStyle={styles.dropDownContainer}
                                textStyle={styles.dropDownText}
                                labelStyle={styles.dropDownLabel}
                                placeholderStyle={styles.dropDownPlaceholder}
                                arrowIconStyle={styles.dropDownArrowIcon}
                            />
                        </>
                    )}
                    <Text style={styles.inputLabel}>Title</Text>
                    <TextInput style={styles.textInput} onChangeText={setTxTitle} value={txTitle} placeholder="Enter a title" placeholderTextColor={'grey'} />
                    <Text style={styles.inputLabel}>{value2 === 'Expense' ? 'Cost' : 'Amount'}</Text>
                    <TextInput style={styles.textInput} onChangeText={setTxAmount} value={txAmount} keyboardType="numeric" placeholder="Enter the amount" placeholderTextColor={'grey'} />
                    <TouchableOpacity style={styles.button} onPress={handleSave}><Text style={styles.buttonText}>Confirm</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
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
    scrollContainer: {
        width: '100%',
        marginTop: 60,
        borderRadius: 15,
    },
    popup: {
        width: '90%',
        marginLeft: '5%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        elevation: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: '2%',
        color: '#333',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 15,
        borderRadius: 10,
        paddingHorizontal: 15,
        width: '95%',
        marginLeft: '2.5%',
        color: '#3c3c3c',
    },
    dropDown: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '95%',
        marginLeft: '2.5%',
    },
    dropDownContainer: {
        backgroundColor: '#f9f9f9',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 2,
        width: '95%',
        marginLeft: '2.5%',
    },
    dropDownIconContainer: {
        height: 30,
        width: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropDownText: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
    },
    dropDownLabel: {
        fontSize: 14,
        color: '#555',
    },
    dropDownPlaceholder: {
        color: '#aaa',
        fontSize: 14,
    },
    dropDownArrowIcon: {
        tintColor: 'grey',
    },
    button: {
        width: '95%',
        marginLeft: '2.5%',
        backgroundColor: '#2F7D79',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
});

export default EditTxScreen;
