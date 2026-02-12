import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import AddTxScreen from './src/screens/AddTxScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TransactionScreen from './src/screens/TransactionScreen';
import EditTxScreen from './src/screens/EditTxScreen';
import TxContextProvider, { TransactionContext } from './src/context/TransactionContext';
import CustomBottomTabBar from './components/CustomBottomTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from './src/screens/OnboardingScreens';
import { storage } from './src/context/TransactionContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AddProfilePhotoScreen from './src/screens/AddProfilePhotoScreen';
import ChangeCurrencyScreen from './src/screens/ChangeCurrencyScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import AboutAppScreen from './src/screens/AboutAppScreen';
import BackupScreen from './src/screens/BackupScreen';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Onboarding = () => {
  const isNewUser = storage.getBoolean('newUserCheck') ?? true;
  const { user } = useContext(TransactionContext);
  const copiedUser = { ...user }
  return (
    <Stack.Navigator
      initialRouteName={isNewUser ? 'screen1' : (Object.keys(copiedUser).length === 0 ? 'login' : 'mainApp')}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      {/* Onboarding Screens */}
      <Stack.Screen name="screen1" component={OnboardingScreen1} />
      <Stack.Screen name="screen2" component={OnboardingScreen2} />
      <Stack.Screen name="screen3" component={OnboardingScreen3} />

      {/* Login/Sign-up */}
      <Stack.Screen name='login' component={LoginScreen} options={{ animation: 'fade_from_bottom' }} />
      <Stack.Screen name='register' component={RegisterScreen} options={{ animation: 'fade_from_bottom' }} />
      <Stack.Screen name='addProfile' component={AddProfilePhotoScreen} options={{ animation: 'slide_from_right' }} />

      {/* Main App Entry Point */}
      <Stack.Screen name="mainApp" component={TabNavigator} />
    </Stack.Navigator>
  )
};

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}
    >
      <Stack.Screen name="settingsScreen" component={SettingsScreen} />
      <Stack.Screen name="changeCurrency" component={ChangeCurrencyScreen}/>
      <Stack.Screen name="editProfile" component={EditProfileScreen} />
      <Stack.Screen name="backup" component={BackupScreen} />
      <Stack.Screen name="aboutApp" component={AboutAppScreen} />
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (<Tabs.Navigator
    screenOptions={{ headerShown: false }}
    tabBar={(props) => { return <CustomBottomTabBar {...props} /> }}
  >
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="History" component={TransactionScreen} />
    <Tabs.Screen name="New" component={AddTxScreen} />
    <Tabs.Screen name="Analysis" component={AnalysisScreen} />
    <Tabs.Screen name="Settings" component={SettingsStackNavigator} />
    <Tabs.Screen name="Edit" component={EditTxScreen} />
  </Tabs.Navigator>);
};
// work on splash screen
export default function App() {
  return (
    <TxContextProvider>
      <NavigationContainer>
        <Onboarding />
      </NavigationContainer>
    </TxContextProvider>
  );
}
