import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const DropDown = ({ title, value, setValue, options, dropDownContainerStyle, dropDownButtonStyle, dropDownTextStyle, optionsContainerStyle, optionsTextStyle }) => {

    const [open, setOpen] = useState(false);

    return (
        <View style={dropDownContainerStyle || styles.dropDownContainer}>
            <TouchableOpacity style={dropDownButtonStyle || styles.dropDownButton} onPress={() => setOpen(!open)}>
                <Text style={dropDownTextStyle || styles.dropDownText}>{value || title || 'Categorize by'}</Text>
                <Icon name={open ? 'chevron-down-outline' : 'chevron-back'} color="#888888" size={18} />
            </TouchableOpacity>
            {open && (
                <View style={optionsContainerStyle || styles.optionsContainer}>
                    <FlatList
                        data={options}
                        renderItem={({ item }) => (<Option
                            key={item.value}
                            label={item.symbol + '    ' + item.label}
                            value={item.value}
                            setValue={setValue}
                            setOpen={setOpen}
                            optionsTextStyle={optionsTextStyle}
                            dropDownButtonStyle={dropDownButtonStyle}
                        />)}
                        nestedScrollEnabled={true}
                        
                    />
                </View>
            )}
        </View>
    )
}

const Option = ({ label, value, setValue, setOpen, dropDownButtonStyle, optionsTextStyle }) => {
    const handlePress = () => {
        setValue(value);
        setOpen(false);
    };
    return (
        <TouchableOpacity style={[dropDownButtonStyle || styles.dropDownButton, {borderTopWidth: 1, borderTopColor: '#eee'}]} onPress={handlePress}>
            <Text style={optionsTextStyle || styles.optionsText}>{label}</Text>
        </TouchableOpacity>
    );
};

export default DropDown

const styles = StyleSheet.create({
    dropDownContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: 1000,
    },
    dropDownButton: {
        height: 54,
        gap: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropDownText: {
        color: '#555555',
        fontSize: 15,
        fontWeight: '700',
    },
    optionsContainer: {
        backgroundColor: '#fff',
    },
    optionsText: {
        color: '#999999',
        fontSize: 14,
    },
})