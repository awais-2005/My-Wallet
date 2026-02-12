import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { themeColor } from '../config/theme';

const BackupScreen = ({ navigation }) => {
    // Replace with real DB query
    const nonBackedUpCount = 12;

    const [autoBackup, setAutoBackup] = useState(true);
    const [networkType, setNetworkType] = useState('wifi'); // 'wifi' | 'cellular'

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
                <Icon name="arrow-back" size={22} color="#0F172A" />
            </TouchableOpacity>

            {/* Header */}
            <Text style={styles.title}>Backup Settings</Text>
            {/* Pending Backups */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Pending Backups</Text>
                <Text style={styles.pendingCount}>
                    {nonBackedUpCount} transactions not backed up
                </Text>
            </View>

            {/* Auto Backup Toggle */}
            <View style={styles.cardRow}>
                <View>
                    <Text style={styles.sectionTitle}>Auto Backup</Text>
                    <Text style={styles.subText}>
                        Automatically backup new transactions
                    </Text>
                </View>

                <Switch
                    value={autoBackup}
                    onValueChange={setAutoBackup}
                    trackColor={{ false: '#ccc', true: themeColor }}
                    thumbColor="#fff"
                />
            </View>

            {/* Network Type */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Network Type</Text>
                <Text style={styles.subText}>
                    Choose when backup is allowed
                </Text>

                <TouchableOpacity
                    style={[
                        styles.option,
                        networkType === 'wifi' && styles.optionSelected,
                    ]}
                    onPress={() => setNetworkType('wifi')}
                >
                    <Text
                        style={[
                            styles.optionText,
                            networkType === 'wifi' && styles.optionTextSelected,
                        ]}
                    >
                        Wi-Fi Only
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.option,
                        networkType === 'cellular' && styles.optionSelected,
                    ]}
                    onPress={() => setNetworkType('cellular')}
                >
                    <Text
                        style={[
                            styles.optionText,
                            networkType === 'cellular' && styles.optionTextSelected,
                        ]}
                    >
                        Wi-Fi + Cellular
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Manual Backup Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Backup Now</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default BackupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    backBtn: {
        marginTop: 24,
        marginBottom: 16,
        width: 40,
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A',
        textAlign: 'center',
        marginBottom: 24,
    },

    card: {
        backgroundColor: '#f8f9fb',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    cardRow: {
        backgroundColor: '#f8f9fb',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        marginBottom: 4,
    },
    subText: {
        fontSize: 13,
        color: '#666',
    },
    pendingCount: {
        fontSize: 15,
        color: '#444',
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    optionSelected: {
        borderColor: themeColor,
        backgroundColor: 'rgba(54, 137, 131, 0.05)',
    },
    optionText: {
        fontSize: 14,
        color: '#444',
    },
    optionTextSelected: {
        color: themeColor,
        fontWeight: '600',
    },
    button: {
        marginTop: 10,
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: themeColor,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});
