import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function EmptyMessage(props) {
  return (
    <>
        <View style={[styles.container, {marginTop: props.marginTop}]}>
            <Text style={styles.message}>{props.message}</Text>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 3,
    },
    message: {
        color: 'grey',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default EmptyMessage;
