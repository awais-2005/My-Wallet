import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

const ChangeCurrencyScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('PKR');

  return (
    <SafeAreaView style={styles.container}>
      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
        <Icon name="arrow-back" size={22} color="#0F172A" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.title}>Change Currency</Text>
      <Text style={styles.subtitle}>
        Select the currency you want to use for transactions
      </Text>

      {/* Currency List */}
      <FlatList
        data={CURRENCIES}
        keyExtractor={(item) => item.code}
        contentContainerStyle={{ paddingTop: 16 }}
        renderItem={({ item }) => {
          const active = item.code === selected;

          return (
            <TouchableOpacity
              style={[
                styles.currencyItem,
                active && styles.currencyItemActive,
              ]}
              onPress={() => setSelected(item.code)}
            >
              <View>
                <Text style={styles.currencyName}>
                  {item.name}
                </Text>
                <Text style={styles.currencyCode}>
                  {item.code} · {item.symbol}
                </Text>
              </View>

              {active && (
                <Icon
                  name="checkmark-circle"
                  size={22}
                  color="#2F7D73"
                />
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* Save */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Currency</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChangeCurrencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
    paddingHorizontal: 24,
  },

  backBtn: {
    marginTop: 24,
    marginBottom: 16,
    width: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: '#6B8F8A',
    textAlign: 'center',
    marginBottom: 16,
  },

  currencyItem: {
    height: 64,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  currencyItemActive: {
    borderColor: '#2F7D73',
    backgroundColor: '#E6F2EF',
  },

  currencyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },

  currencyCode: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },

  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#2F7D73',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 85,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
