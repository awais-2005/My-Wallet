import React from 'react';
import { Text, Dimensions, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import AddTxScreen from './src/screens/AddTxScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TransactionScreen from './src/screens/TransactionScreen';
import EditTxScreen from './src/screens/EditTxScreen';
import TxContextProvider from './src/context/TransactionContext';
import CustomBottomTabBar from './components/CustomBottomTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from './src/screens/OnboardingScreens';
import { storage } from './src/context/TransactionContext';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const isNewUser = storage.getBoolean('newUser') ?? true;
  isNewUser && storage.set('newUser', false);
  return (
    <Stack.Navigator
      initialRouteName={isNewUser ? 'screen1' : 'mainApp'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      {/* Onboarding Screens */}
      <Stack.Screen name="screen1" component={OnboardingScreen1}/>
      <Stack.Screen name="screen2" component={OnboardingScreen2}/>
      <Stack.Screen name="screen3" component={OnboardingScreen3}/>
      
      {/* Login/Sign-up */}
      {/* here -- */}

      {/* Main App Entry Point */}
      <Stack.Screen name="mainApp" component={TabNavigator}/>
    </Stack.Navigator>
    )
  };

const TabNavigator = () => {
  return (<Tabs.Navigator
    screenOptions={{headerShown: false}}
    tabBar={(props) => {return <CustomBottomTabBar {...props} />}}
    >
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="History" component={TransactionScreen} />
    <Tabs.Screen name="New" component={AddTxScreen} />
    <Tabs.Screen name="Analysis" component={AnalysisScreen} />
    <Tabs.Screen name="Settings" component={SettingsScreen} />
    <Tabs.Screen name="Edit" component={EditTxScreen} />
  </Tabs.Navigator>);
};
// work on splash screen
export default function App() {
  return (
    <TxContextProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </TxContextProvider>
  );
}
