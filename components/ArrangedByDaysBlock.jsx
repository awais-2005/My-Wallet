import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import EditableTxCard from './EditableTxCard';
import { formatAmount } from '../src/screens/HomeScreen';

function ArrangedByDaysBlock({ item }) {
    const dets = item[0].date.split(' ');
    const dateLabel = dets[0] + ' ' + dets[1] + ' ' + dets[2];
    let total = 0;
    for (let tx of item) {
        total += tx.amount;
    }
    const sign = total > 0 ? '+' : '-';
    const color = total > 0 ? '#34bb51ff' : '#fd4e4eff';
    total = total > 0 ? total : -total;
    return (
        <View style={styles.block}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateLabel}>{dateLabel}</Text>
                <Text style={[styles.amount, { color: color }]}>{sign} Rs {formatAmount(total)}</Text>
            </View>
            <View style={styles.cardsContainer}>
                <FlatList
                    data={item}
                    renderItem={({ item: transaction }) => <EditableTxCard item={transaction} />}
                    keyExtractor={transaction => transaction.id}
                    initialNumToRender={10}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        marginTop: 10,
        elevation: 2,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 10,
        borderRadius: 10,
    },
    cardsContainer: {
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
    },
    dateLabel: {
        color: '#2F7D79',
        fontSize: 16,
        fontWeight: '700',
    },
    dateContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 3,
        paddingHorizontal: 15,
        backgroundColor: '#f0f0f0',
        width: '100%',
        borderRadius: 5,
        marginBottom: 5,
        marginTop: 10,
        flexDirection: 'row',
    },
    amount: {
        fontSize: 15,
        fontWeight: '700',
    },
});

export default ArrangedByDaysBlock;
