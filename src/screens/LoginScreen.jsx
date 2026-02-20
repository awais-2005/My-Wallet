import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import login from '../utils/login';
import { storage, TransactionContext } from '../context/TransactionContext';
import getUserById from '../utils/getUserById';
import LoadingAnimation from '../../components/LoadingAnimation';
import { fetchTransactions } from '../utils/saveTransaction';

const LoginScreen = ({ navigation }) => {
  const [secure, setSecure] = useState(true);
  const { setUser, setListOfTransactions } = useContext(TransactionContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if(!email.trim() || !password.trim()) {
      Alert.alert("Login Failure", "Please enter your email and password");
      return;
    }
    try {
      setLoading(true);
      const response1 = await login(email.trim(), password.trim());
      if(!response1.ok) {
        throw new Error('Invalid credentials')
      }
      const { id, token } = await response1.json();

      const response2 = await getUserById(id);
      const data = await response2.json();

      const user = {
        ...data,
        token
      };

      const transactions = await fetchTransactions(user.token);
      const reversed = transactions.reverse();
      storage.set('transactions', JSON.stringify(reversed));
      setListOfTransactions(reversed);

      storage.set('user', JSON.stringify(user));
      setUser(user);
      navigation.replace("mainApp");
    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.alert("Login Failure", "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoCircle}>
          <Icon name="wallet-outline" size={28} color="#2F7D73" />
        </View>
      </View>

      {/* Heading */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Please sign in to your account
      </Text>

      {/* Email */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="user@example.com"
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
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Icon
              name={!secure ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot password */}
      <TouchableOpacity style={styles.forgotWrapper}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.signupText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
      {loading && (<LoadingAnimation message={'Signing in...'}/>)}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
    paddingHorizontal: 24,
  },

  logoWrapper: {
    alignItems: 'center',
    marginTop: 60,
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
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
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
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#444444',
    backgroundColor: '#FFFFFF',
  },

  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#444444'
  },

  forgotWrapper: {
    alignItems: 'flex-end',
    marginBottom: 28,
  },
  forgotText: {
    color: '#2F7D73',
    fontSize: 14,
    fontWeight: '600',
  },

  button: {
    height: 54,
    borderRadius: 14,
    backgroundColor: '#2F7D73',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signupText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2F7D73',
  },
});

