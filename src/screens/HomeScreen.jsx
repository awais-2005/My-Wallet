import { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EmptyMessage from '../../components/EmptyMessage';
import TransactionCard from '../../components/TransactionCard';
import { screenHeight } from '../../App';
import { TransactionContext } from '../context/TransactionContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { lightTheme, themeColor } from '../config/theme';
import { useCurrencyInfo } from '../hooks/useCurrencyInfo';
export let allTransactions = [];

export default function HomeScreen({ navigation }) {

  const hei = screenHeight - 500;

  const [overviewCardType, setOverviewCardType] = useState('monthly');

  const context = useContext(TransactionContext);
  console.log(context.listOfTransactions)
  useEffect(() => {
    context.setNavigation(navigation);
  }, [context, navigation]);

  useEffect(() => {
    let total = 0;
    let spent = 0;
    let inWallet = 0;
    if (overviewCardType === 'allTime') {
      context.listOfTransactions.forEach((tx) => {
        total += tx.amount > 0 ? tx.amount : 0;
        spent += tx.amount < 0 ? tx.amount : 0;
        inWallet += tx.amount;
      });
    }
    else {
      context.currentMonthTransactions.forEach((tx) => {
        total += tx.amount > 0 ? tx.amount : 0;
        spent += tx.amount < 0 ? tx.amount : 0;
      });
      context.listOfTransactions.forEach((tx) => {
        inWallet += tx.amount;
      });
    }
    setTotalBalance(total);
    setSpent(spent === 0 ? spent : -spent);
    setInWallet(inWallet);
  }, [context.listOfTransactions, overviewCardType, context.currentMonthTransactions]);

  const { symbol, multiplyer } = useCurrencyInfo();

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalSpent, setSpent] = useState(0);
  const [totalInWallet, setInWallet] = useState(0);
  const [showOptions, setShowOptions] = useState(false);


  return (
    <View style={styles.main}>
      <View style={styles.topBgShape} />
      <View style={styles.header}>
        {context.user.avatar && (<View style={styles.profileContainer}>
          <Image source={{ uri: context.user.avatar }} height={50} width={50} resizeMode='cover' />
        </View>)}
        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.name}>{context.user.name || "xyz"}</Text>
        </View>
      </View>
      <View style={styles.overviewCard}>
        <TouchableOpacity style={styles.option} disabled={false} onPress={() => { setShowOptions(!showOptions) }}>
          <Ionicons name={showOptions ? "close" : "ellipsis-vertical"} size={20} color={'#fff'} />
        </TouchableOpacity>
        {showOptions && (
          <View style={styles.optionContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => {
              setOverviewCardType('monthly');
              setShowOptions(false);
            }}>
              <Text style={styles.optionButtonText}>Monthy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => {
              setOverviewCardType('allTime');
              setShowOptions(false);
            }}>
              <Text style={styles.optionButtonText}>All Time</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.totalBlock}>
          <Text style={styles.title}>In Wallet</Text>
          <Text style={styles.totalAmount}>{symbol} {formatAmount(totalInWallet*multiplyer)}</Text>
        </View>
        <View style={styles.lowerBlock}>
          <View style={styles.walletBlock}>
            <Text style={styles.title}>Total Received</Text>
            <Text style={styles.walletAmount}>{symbol} {formatAmount(totalBalance*multiplyer)}</Text>
          </View>
          <View style={styles.walletBlock}>
            <Text style={styles.title}>Spent</Text>
            <Text style={styles.walletAmount}>{symbol} {formatAmount(totalSpent*multiplyer)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.txSeeAllBlock}>
        <Text style={styles.blockLabel}>Recent Transactions</Text>
        {(context.listOfTransactions.length > 0) && (<TouchableOpacity style={styles.seeAllButton} onPress={() => { navigation.navigate('History') }} ><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>)}
      </View>
      <ScrollView style={styles.listOfTransactions} >
        {
          (context.listOfTransactions.length === 0) && (<EmptyMessage marginTop={30} message="No Transaction Found" />) ||
          ((context.listOfTransactions.length > Math.floor(hei / 55)) && (context.listOfTransactions.slice(0, Math.floor(hei / 55)).map((tx) => <TransactionCard key={tx.id} transObj={tx} />))) ||
          (context.listOfTransactions.map((tx) => <TransactionCard key={tx.id} transObj={tx} />))
        }
      </ScrollView>
    </View>
  );
}

export function formatAmount(amount, frac = 2) {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  });
}

function getGreeting() {
  let currentTime = new Date().toString().split(' ');
  const hr = Number(currentTime[4].slice(0, 2));
  if (hr >= 5 && hr <= 11) {
    return 'Good Morning';
  }
  if (hr >= 12 && hr <= 16) {
    return 'Good Afternoon';
  }
  if (hr >= 17 && hr <= 20) {
    return 'Good Evening';
  }
  if (hr >= 21 || hr <= 4) {
    return 'Good Night';
  }

}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  topBgShape: {
    height: '35%',
    width: '100%',
    backgroundColor: themeColor,
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginLeft: '5%',
    marginTop: 60,
  },
  profileContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: lightTheme,
    overflow: 'hidden',
  },
  greeting: {
    color: '#fff',
    fontSize: 13,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  overviewCard: {
    marginLeft: '5%',
    marginTop: 30,
    height: 200,
    width: '90%',
    backgroundColor: '#2F7D79',
    borderRadius: 20,
    padding: 25,
    justifyContent: 'space-between',
    elevation: 20,
  },
  option: {
    backgroundColor: '#368984',
    height: 25,
    width: 25,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: 'center',
    position: 'absolute',
    top: 25,
    right: 25,
    zIndex: 200,
  },
  optionButton: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2F7D79',
    paddingRight: 30,
    backgroundColor: '#368984',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 13,
  },
  optionContainer: {
    position: 'absolute',
    top: 25,
    right: 25,
    backgroundColor: '#2F7D79',
    borderRadius: 10,
    elevation: 10,
    zIndex: 100,
    overflow: 'hidden',
  },
  title: {
    fontSize: 15,
    color: '#fff',
  },
  totalAmount: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
  },
  lowerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletBlock: {
    gap: 5,
  },
  walletAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  txSeeAllBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: '5%',
    marginTop: 30,
  },
  blockLabel: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
  },
  seeAllButton: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 13.5,
    borderRadius: 50,
  },
  seeAllText: {
    color: '#3c3c3c',
  },
  listOfTransactions: {
    width: '100%',
    marginTop: 15,
    backgroundColor: '#fff',
  },
  addButton: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32.5,
    backgroundColor: '#368984',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
