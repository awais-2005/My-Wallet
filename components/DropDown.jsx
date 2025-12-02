import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const DropDown = ({ value, setValue, options }) => {

    const [open, setOpen] = useState(false);

    return (
        <View style={styles.dropDownContainer}>
            <TouchableOpacity style={styles.dropDownButton} onPress={() => setOpen(!open)}>
                <Text style={styles.dropDownText}>{value || 'Categorize by'}</Text>
                <Icon name={open ? 'chevron-down-outline' : 'chevron-back'} color="#fff" size={18} />
            </TouchableOpacity>
            {open && (
                <View style={styles.optionsContainer}>
                    {options.map((option) => (
                        <Option
                            key={option.value}
                            label={option.label}
                            value={option.value}
                            setValue={setValue}
                            setOpen={setOpen}
                        />
                    ))}
                </View>
            )}
        </View>
    )
}

const Option = ({ label, value, setValue, setOpen }) => {
    const handlePress = () => {
        setValue(value);
        setOpen(false);
    };
    return (
        <TouchableOpacity style={styles.dropDownButton} onPress={handlePress}>
            <Text style={styles.optionsText}>{label}</Text>
        </TouchableOpacity>
    );
};

export default DropDown

const styles = StyleSheet.create({
    dropDownContainer: {
        backgroundColor: '#368984',
        width: 145,
        borderRadius: 5,
        overflow: 'hidden',
        position: 'absolute',
        top: 100,
        right: '2.5%',
        zIndex: 1000,
    },
    dropDownButton: {
        width: 145,
        backgroundColor: '#24706bff',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropDownText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    optionsContainer: {
        backgroundColor: '#368984',
    },
    optionsText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
})