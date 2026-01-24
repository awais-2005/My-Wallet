import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const OnboardingScreen1 = ({ navigation }) => {
  return (
    <View style={styles.main} >

        <View style={styles.animationContainer}>
            <LottieView
                source={require('../../assets/loading.json')}
                loop
                autoplay
                style={{width: 250}}
            />
        </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("screen2")}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  )
};


const OnboardingScreen2 = ({ navigation }) => {
  return (
    <View style={styles.main} >

        <View style={styles.animationContainer}>
            <LottieView
                source={require('../../assets/Revenue.json')}
                loop
                autoplay
                style={{width: 250}}
            />
        </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("screen3")}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  )
};

const OnboardingScreen3 = ({ navigation }) => {
  return (
    <View style={styles.main} >

        <View style={styles.animationContainer}>
            <LottieView
                source={require('../../assets/no_result_found.json')}
                loop
                autoplay
                style={{width: 250}}
            />
        </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("mainApp")}>
        <Text>Next</Text>
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
    },
    animationContainer: {
        width: '100%',
        marginTop: 50,
        alignItems: 'center',
    },
    nextButton: {
        width: '90%',
        marginLeft: '5%',
        backgroundColor: '#ff4400',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        bottom: 20,
    }
})