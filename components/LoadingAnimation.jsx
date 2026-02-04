import LottieView from 'lottie-react-native'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { lowOpacityThmClr, themeColor } from '../src/config/theme'

export const screenWidth = Dimensions.get('window').width;

const LoadingAnimation = ({ message }) => {
  return (
    <View style={styles.loadingScreen}> 
        <View style={styles.container}>
            <LottieView 
            source={require('../assets/loading.json')}
            autoPlay={true}
            loop={true}
            style={{height: wp(33), width: wp(33)}}
            />
            <Text style={styles.loadingText} >{message || "Loading..."}</Text>
        </View>
    </View>
  )
}

const wp = (scale) => (screenWidth / 100) * scale;

export default LoadingAnimation

const styles = StyleSheet.create({
    loadingScreen: {
        width: wp(100),
        height: '100%',
        backgroundColor: '#ffffff80',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '80%',
        height: 200,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: themeColor || "#888888",
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '700',
        color: lowOpacityThmClr || '#888888',
    },
})
