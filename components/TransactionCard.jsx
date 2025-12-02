import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatAmount } from '../src/screens/HomeScreen';
import { getIcon } from './EditableTxCard';

export default function TransactionCard(props) {
    let amountSpent = props.transObj.amount;
    let color = amountSpent > 0 ? '#34bb51ff' : '#fd4e4eff';
    let sign = amountSpent > 0 ? '+' : '-';
    amountSpent = amountSpent > 0 ? amountSpent : -amountSpent;
    return (
        <View style={styles.card}>
            {getIcon(props.transObj.type, styles.logo, 25)}
            <View style={styles.textBlock}>
                <Text style={styles.title}>{props.transObj.title}</Text>
                <Text style={styles.timeStamp}>{getDuration(props.transObj.date)}</Text>
            </View>
            <Text style={[styles.amount, {color: color}]}>{sign} Rs {formatAmount(amountSpent)}</Text>
        </View>
    );
}

export function getDuration(timeStamp) {
    const dets = timeStamp.split(' ');
    const currDets = new Date().toString().split(' ').slice(1, 5);
    if((dets[0] !== currDets[0]) || Number(dets[2]) !== Number(currDets[2])) {
        return dets[0] + ' ' + dets[1] + ' ' + dets[2];
    }
    const daysDiff = (Number(currDets[1]) - Number(dets[1])) * 24;
    const time = dets[3].split(':');
    const crrTime = currDets[3].split(':');
    let hrs = daysDiff + Number(crrTime[0]) - Number(time[0]);
    hrs += (Number(crrTime[1]) - Number(time[1])) / 60;
    hrs += (Number(crrTime[2]) - Number(time[2])) / (60 * 60);
    return (hrs / 24 > 2 ? dets[0] + ' ' + dets[1] + ' ' + dets[2] : (hrs / 24 >= 1) ? 'Yesterday' : hrs >= 1 ? Math.floor(hrs) + ' hours ago' : hrs * 60 >= 1 ? Math.floor(hrs * 60) + ' minutes ago' : hrs * (60 * 60) >= 30 ? Math.floor(hrs * (60 * 60)) + ' seconds ago' : 'Just now');
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: 5,
        width: '90%',
        flexDirection: 'row',
        marginLeft: '5%',
        gap: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    logo: {
        height: 45,
        width: 45,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBlock: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    amount: {
        fontSize: 16,
        fontWeight: '700',
    },
    timeStamp: {
        color: 'grey',
        fontSize: 12,
    },
});
