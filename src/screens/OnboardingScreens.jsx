import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { hp, wp } from './TransactionScreen';
import { storage } from '../context/TransactionContext';

const OnboardingScreen1 = ({ navigation }) => {
  
  return (
    <View style={styles.main} >

        <View style={styles.animationContainer}>
            <LottieView
                source={require('../../assets/revenue.json')}
                autoPlay={true}
                style={{width: wp(95), height: wp(95)}}
            />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.heading} >Master Your Money</Text>
          <Text style={styles.subText} >Track your every penny and gain control over your financial life.</Text>
        </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("screen2")}>
        <Text style={styles.nextButtonText} >Next</Text>
      </TouchableOpacity>
    </View>
  )
};


const OnboardingScreen2 = ({ navigation }) => {
  return (
    <View style={styles.main} >

        <View style={styles.textBlock}>
          <Text style={styles.heading} >Log Daily Expenses</Text>
          <Text style={styles.subText} >Easily record your spending on the go just in few taps.</Text>
        </View>

        <View style={styles.animationContainer}>
            <LottieView
                source={require('../../assets/writing.json')}
                autoPlay={true}
                style={{width: wp(95), height: wp(95)}}
            />
        </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("screen3")}>
        <Text style={styles.nextButtonText} >Next</Text>
      </TouchableOpacity>
    </View>
  )
};

const OnboardingScreen3 = ({ navigation }) => {
  return (
    <View style={styles.main} >

        <View style={styles.designedBlock}>
          <Text style={[styles.heading, {color: '#f0f0f0'}]} >Insightful Analysis</Text>
          <Text style={[styles.subText, {color: '#f0f0f0'}]} >Visualize your spending patterns and save more every month.</Text>
        </View>

        <View style={[styles.animationContainer, {marginTop: hp(25)}]}>
            <LottieView
                source={require('../../assets/chart.json')}
                autoPlay={true}
                loop={false}
                speed={4}
                style={{width: wp(130), height: wp(130)}}
            />
        </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => {
        storage.set('newUserCheck', false);
        navigation.navigate("login");
        }}>
        <Text style={styles.nextButtonText} >Get Started</Text>
      </TouchableOpacity>
    </View>
  )
};

export { OnboardingScreen1 };
export { OnboardingScreen2 };
export { OnboardingScreen3 };

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        paddingTop: hp(12),
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    designedBlock: {
      width: wp(200),
      height: wp(200),
      backgroundColor: '#368984',
      borderRadius: wp(100),
      borderWidth: 5,
      borderColor: '#9dcecb',
      alignItems: 'center',
      paddingHorizontal: wp(55),
      paddingVertical: wp(15),
      gap: 5,
      justifyContent: 'flex-end',
      position: 'absolute',
      top: -wp(145),
    },
    animationContainer: {
        width: wp(100),
        height: wp(100),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBlock: {
      width: '85%',
      alignItems: 'center',
      gap: 5,
    },
    heading: {
      fontSize: wp(8.2),
      fontWeight: '700',
      textAlign: 'center',
      color: '#368984',
      transform: [{scaleY: 1.05}]
    },
    subText: {
      textAlign: 'center',
      color: '#505050',
      fontSize: wp(4.3),
    },
    nextButton: {
        width: '90%',
        backgroundColor: '#368984',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 10,
        position: 'absolute',
        bottom: 20,
    },
    nextButtonText: {
      fontSize: wp(4.5),
      fontWeight: 700,
      color: '#fff',
    }
})