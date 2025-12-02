/* eslint-disable react/no-unstable-nested-components */
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { formatAmount } from '../src/screens/HomeScreen';

const Chart = ({ data }) => {
  // Calculate max value dynamically from data
  const maxSpent = typeof(data) !== 'string' ? Math.max(...data.map(item => item.spent)) : 0;
  const barWidth = 60;

  const Bar = ({ item }) => {
    const barHeight = (item.spent / maxSpent) * 250; // 250 is max height

    return (
      <View style={[styles.barContainer, { width: barWidth }]}>
        <Text style={styles.spentLabel}>{formatAmount(item.spent, 0)}</Text>
        <View style={[styles.bar, { height: barHeight }]} />
        <Text style={styles.label}>{item.label}</Text>
      </View>
    );
  };

  return (
    <>
      {typeof(data) !== 'string' && data.length > 0 && <View style={styles.chartContainer}>
        (<FlatList
          horizontal
          renderItem={Bar}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.chartContent}
        />)
      </View>}
      {(typeof(data) === 'string' || data.length === 0) && (
        <View style={[styles.chartContainer, styles.emptyChartBlock]}>
          <Text style={styles.boldMessage}>{typeof(data) === 'string' ? '' : 'No Transaction'}</Text>
          <Text style={styles.liteMessage}>{typeof(data) === 'string' ? data : "Seems Like you didn't make any."}</Text>
        </View>
      )}
    </>
  )
}

export default Chart

const styles = StyleSheet.create({
  chartContainer: {
    width: '90%',
    marginLeft: '5%',
    height: 330,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    paddingHorizontal: 10,
  },
  emptyChartBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldMessage: {
    fontSize: 15,
    fontWeight: '700',
    color: '#303030'
  },
  liteMessage: {
    fontSize: 13,
    color: 'grey',
  },
  chartContent: {
    paddingHorizontal: 10,
    alignItems: 'flex-end', // Align bars to bottom
    gap: 10,
  },
  barContainer: {
    height: 280, // Slightly less than chart container
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '75%',
    backgroundColor: '#368984',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    minHeight: 5, // Minimum height for very small values
  },
  spentLabel: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '500',
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
    marginBottom: 10,
  },
})