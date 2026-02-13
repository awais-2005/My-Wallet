import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { storage, TransactionContext } from '../context/TransactionContext';
import register from '../utils/register';
import login from '../utils/login';
import LoadingAnimation from '../../components/LoadingAnimation';
import { screenHeight } from '../../App';

const RegisterScreen = ({ navigation }) => {

  const {user, setUser} = useContext(TransactionContext);

  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const DEFAULT_CURRENCY = "PKR";

  const handleAccountCreation = async () => {
    try {
      if([name, email, password, confirmPassword].some( f => !f.trim())) {
        Alert.alert("Register Failure", "Please fill all the fields.");
        return;
      }
      if (password !== confirmPassword) throw new Error("Password confirmation failed");
      setLoading(true);
      const registerResponse = await register(name.trim(), email.trim(), DEFAULT_CURRENCY, password.trim());
      if (!registerResponse.ok) {
        const data = await registerResponse.json();
        throw new Error("Register Api failure: " + JSON.stringify(data));
      }
      const loginResponse = await login(email.trim(), password.trim());
      if (!loginResponse.ok) {
        const data = await loginResponse.json();
        throw new Error("Login Api failure: " + JSON.stringify(data));
      }
      const { id, token } = await loginResponse.json();
      user.id = id;
      user.name = name;
      user.email = email;
      user.currency = DEFAULT_CURRENCY;
      user.token = token;
      setUser({...user});
      storage.set('user', JSON.stringify(user));
      navigation.navigate('addProfile');
    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.alert("Registration Failure", "Sorry for inconvenience, Please again later. | ERR: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Back Arrow */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
        <Icon name="arrow-back" size={22} color="#0F172A" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoCircle}>
          <Icon name="wallet-outline" size={28} color="#2F7D73" />
        </View>
      </View>

      {/* Header */}
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Start tracking your expenses today.
      </Text>

      <ScrollView>
        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="e.g. John Doe"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            placeholder="name@example.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={secure1}
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setSecure1(!secure1)}>
              <Icon
                name={!secure1 ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Re-enter password"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={secure2}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setSecure2(!secure2)}>
              <Icon
                name={secure2 ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleAccountCreation}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.signInText}> Sign In</Text>
        </TouchableOpacity>
      </View>
      {loading && (<LoadingAnimation message={'Signing up...'}/>)}
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    height: (screenHeight - 30) || '100%',
    backgroundColor: '#F8FAF9',
    paddingHorizontal: 24,
  },

  backBtn: {
    marginTop: 24,
    marginBottom: 12,
    width: 40,
  },

  logoWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#E6F2EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 32,
  },

  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    color: '#4c4c4c',
  },
  
  currencyWrapper: {
    flexDirection: 'row',
    gap: 5,
  },
  
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#4c4c4c',
  },

  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#2F7D73',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signInText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2F7D73',
  },
});

