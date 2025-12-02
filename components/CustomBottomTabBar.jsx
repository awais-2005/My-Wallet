import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomBottomTabBar = ({ state, descriptors, navigation}) => {
  if(state.index < state.routes.length - 1)
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        if(route.name !== 'Edit')
          return (<Tab key={index} name={route.name} isFocused={isFocused} navigation={navigation} />)
      })}
    </View>
  );
};

const Tab = ({ name, navigation, isFocused }) => {

  const onPress = () => {
      !isFocused && navigation.navigate(name);
    }

    const {text, icon} = getTextAndIcon(name);

    return (
        <TouchableOpacity style={name === 'New' ? styles.addButton : styles.button} onPress={onPress}>
            <View style={name === 'New' ? {} : styles.iconContainer}>
                <Icon name={!isFocused && name !== 'New' ? icon + '-outline' : icon} size={name === 'New' ? 45 : 24} color={name === 'New' ? '#fff' : '#368984'}/>
            </View>
            { name !== 'New' && ( <Text style={styles.buttonText}>{text}</Text>)}
        </TouchableOpacity>
    );
};

const getTextAndIcon = (name) => {
  if(name === 'Home')  return {text: 'Home', icon: 'home'};  
  if(name === 'History')  return {text: 'History', icon: 'time'};  
  if(name === 'New')  return {text: '', icon: 'add'};  
  if(name === 'Analysis')  return {text: 'Analysis', icon: 'bar-chart'};  
  if(name === 'Settings')  return {text: 'Settings', icon: 'settings'};  
  if(name === 'Edit')  return {text: 'Edit', icon: 'pencil'};  
};

export default CustomBottomTabBar;

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#368984',
        position: 'absolute',
        bottom: 0,
    },
    button: {
        height: 50,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        marginTop: 3,
        fontSize: 12.5,
        color: '#368984',
    },
    iconContainer: {
        paddingHorizontal: 10,
    },
    iconName: {
        color: '#368984',
        fontSize: 25,
    },
    addButton: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27.5,
    backgroundColor: '#368984',
  },
});
