import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Navbar from '../../components/Navbar'
import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { Clipboard } from 'react-native'

const options = (text, icon, size, choice) => { // pass icon name as well later
  return (
    <TouchableOpacity style={styles.option} onPress={() => {
      Alert.alert('Coming Soon', 'This feature is coming soon!');
    }}>
      <View style={{ width: 30, alignItems: 'center' }}>
        {choice === 1 && (<Foundation name={icon || 'info'} size={size} color="#368984" />)}
        {choice === 2 && (<MaterialIcons name={icon || 'info'} size={size} color="#368984" />)}
        {choice === 3 && (<FontAwesome6 name={icon || 'info'} size={size} color="#368984" />)}
        {choice === 4 && (<Ionicons name={icon || 'info'} size={size} color="#368984" />)}
      </View>
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  );
};

const SettingsScreen = ({ navigation }) => {
  // const [value, setValue] = useState('');
  
  const { setAllRemainingsTx, listOfTransactions } = useContext(TransactionContext);
  const copyData = () => Clipboard.setString(JSON.stringify(listOfTransactions))
  // const optionsList = [
  //   options('Change Currency (Coming Soon)', 'dollar', 30, 1),
  //   options('Backup Data (Coming Soon)', 'backup', 24, 2),
  //   options('Import Data (Coming Soon)', 'file-import', 22, 3),
  //   options('Edit username (Coming Soon)', 'user-pen', 20, 3),
  //   options('Guide (Coming Soon)', 'book', 24, 4),
  //   options('About App (Coming Soon)', 'information-circle', 24, 4),
  // ];
  
  return (
    <View style={styles.main}>
      <Navbar navigation={navigation} screenTitle={'Settings'} />
      {/* <TextInput
        value={value}
        onChangeText={setValue}
        placeholder='Paste your data here...'
        placeholderTextColor={'grey'}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} disabled={!value} onPress={() => {
        if(value.trim()) {
          try {
            JSON.parse(value);
          } catch (error) {
            Alert.alert('Failed', 'Invalid Data, please check and try again.');
            return;
          }
          Alert.alert('Import Data', 'Are you sure you want to import this data? This will overwrite your existing transaction history.', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Import',
              style: 'destructive',
              onPress: () => importData(value),
            }
          ]);
        }
        }}>
        <Text style={styles.buttonText}>Import Data</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.copyButton} onPress={copyData}>
        <Text style={styles.copyButtonText}>Copy Data</Text>
      </TouchableOpacity>
      {/* <View style={{ marginTop: 30 }}>
        {optionsList}
      </View> */}

      <TouchableOpacity style={styles.copyButton} onPress={setAllRemainingsTx}>
        <Text style={styles.copyButtonText}>Merge Months' Remainings</Text>
      </TouchableOpacity>
    </View >
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  input: {
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 200,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#368984',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  copyButton: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
    backgroundColor: '#368984',
    paddingVertical: 10,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  option: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    borderBottomWidth: 1,
    gap: 10,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 15,
    color: '#303030',
    fontWeight: '500',
  },
  mergeButton: {
    width: '90%',
    alignSelf: 'center',
    height: 60,
    backgroundColor: 'green',
  },
})