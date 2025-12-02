/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatAmount } from '../src/screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getDuration } from './TransactionCard';
import { TransactionContext } from '../src/context/TransactionContext';

export default function EditableTxCard({ item }) {
 
    const {
        deleteTransaction,
        navigation,
    } = useContext(TransactionContext);
    
    let amountSpent = item.amount;
    let color = amountSpent > 0 ? '#34bb51ff' : '#fd4e4eff';
    let cardBg = amountSpent > 0 ? 'rgba(250, 255, 252, 1)' : 'rgba(255, 250, 252, 1)';
    let sign = amountSpent > 0 ? '+' : '-';
    amountSpent = amountSpent > 0 ? amountSpent : -amountSpent;

    const handleDelete = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this transaction?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => { deleteTransaction(item); },
            },
        ]);
    };

    return (
        <View style={[styles.card, {backgroundColor: cardBg}]}>
            {getIcon(item.type, null, 32)}
            <View style={styles.textBlock}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.timeStamp}>{getDuration(item.date)}</Text>
            </View>
            <View style={styles.amountAndActionsBlock}>
                <Text style={[styles.amount, { color: color }]}>{sign} Rs {formatAmount(amountSpent)}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => {
                        
                        // Navigating to Edit Transaction screen.
                        navigation && navigation.navigate('Edit', item);

                    }} ><Text style={styles.editButtonText}>Edit</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}><Text style={styles.deleteButtonText}>Delete</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export function getIcon(txType, logo1, size) {
    if (txType === 'Income') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(23, 209, 79, 0.3)' }]}><Ionicons name="trending-up" size={size} color="rgba(10, 145, 50, 1)" /></View>);
    }
    if (txType === 'Chai') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(209, 145, 48, 0.3)' }]}><FontAwesome name="coffee" size={size} color="#d19130ff" /></View>);
    }
    if (txType === 'Food') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(56, 189, 78, 0.3)' }]}><Ionicons name="fast-food-outline" size={size} color="rgba(56, 189, 78, 1)" /></View>);
    }
    if (txType === 'Fuel') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(255, 64, 64, 0.3)' }]}><MaterialIcons name="local-gas-station" size={size} color="#ff4040ff" /></View>);
    }
    if (txType === 'Grocery') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(255, 68, 0, 0.3)' }]}><FontAwesome name="shopping-cart" size={size} color="#ff4400" /></View>);
    }
    if (txType === 'Rent') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(0, 81, 255, 0.3)' }]}><Ionicons name="home-outline" size={size} color="rgba(0, 81, 255, 1)" /></View>);
    }
    if (txType === 'Shopping') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(177, 0, 162, 0.3)' }]}><Ionicons name="shirt-outline" size={size} color="rgba(177, 0, 162, 1)" /></View>);
    }
    if (txType === 'Travel') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(0, 174, 187, 0.3)' }]}><FontAwesome name="plane" size={size} color="rgba(0, 174, 187, 1)" /></View>);
    }
    if (txType === 'Personal Care') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(255, 238, 0, 0.1)' }]}><Ionicons name="sparkles" size={size} color="rgba(255, 238, 0, 1)" /></View>);
    }
    if (txType === 'Pay Loan') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(0, 255, 0, 0.1)' }]}><Ionicons name="card-outline" size={size} color="rgba(0, 255, 0, 1)" /></View>);
    }
    if (txType === 'Bills') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(255, 166, 0, 0.3)' }]}><Ionicons name="receipt-outline" size={size} color="rgba(255, 166, 0, 1)" /></View>);
    }
    if (txType === 'Medical') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(255, 0, 0, 0.1)' }]}><Ionicons name="medical" size={size} color="rgba(255, 0, 0, 1)" /></View>);
    }
    if (txType === 'Other') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'hsla(189, 15%, 53%, 0.3)' }]}><Ionicons name="ellipsis-horizontal-outline" size={size} color="hsla(189, 15%, 53%, 1.00)" /></View>);
    }
    if (txType === 'Loan Repayment') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(0, 255, 0, 0.2)' }]}><Ionicons name="return-up-back-outline" size={size} color="rgba(21, 112, 21, 1)" /></View>);
    }
    if (txType === 'Lend Money') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(0, 0, 255, 0.2)' }]}><Ionicons name="arrow-up-circle-outline" size={size} color="rgba(21, 21, 112, 1)" /></View>);
    }
    if (txType === 'Bad Debt') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(204, 45, 45, 0.2)' }]}><FontAwesome name="money" size={size} color="rgba(204, 0, 0, 1)" /></View>);
    }
    if (txType === 'Family Support') {
        return (<View style={[logo1 || styles.logo, { backgroundColor: 'rgba(0, 255, 0, 0.2)' }]}><FontAwesome name="money" size={size} color="rgba(21, 112, 21, 1)" /></View>);
    }
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: 5,
        paddingHorizontal: 6,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    logo: {
        height: 55,
        width: 55,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBlock: {
        minHeight: 45,
        flex: 1,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    timeStamp: {
        color: 'grey',
        fontSize: 12.5,
    },
    amountAndActionsBlock: {
        justifyContent: 'space-between',
    },
    amount: {
        fontSize: 15,
        fontWeight: '700',
        alignSelf: 'flex-end',
        marginRight: 5,
    },
    actions: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 5,
    },
    actionButton: {
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 20,
        paddingBottom: 3,
        paddingTop: 2,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 12.5,
    },
    deleteButton: {
        backgroundColor: 'rgba(248, 46, 46, 1)',
        borderColor: 'rgba(248, 46, 46, 1)',
    },
    editButton: {
        borderColor: '#368984',
    },
    editButtonText: {
        color: '#368984',
        fontSize: 12.5,
    },
});
