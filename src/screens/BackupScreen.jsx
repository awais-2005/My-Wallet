import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { themeColor } from '../config/theme';
import { storage, TransactionContext } from '../context/TransactionContext';
import { useInternetConnection } from '../hooks/useInternetInfo';

const BackupScreen = ({ navigation }) => {

    const { listOfTransactions, syncPendingTransactions } = useContext(TransactionContext);
    const connection = useInternetConnection();
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        try {
            const data = storage.getString('pendingQueue');
            const pendingQueue = data ? JSON.parse(data) : [];
            setNonBackedUpCount(Array.isArray(pendingQueue) ? pendingQueue.length : 0);
        } catch (err) {
            setNonBackedUpCount(0);
        }
    }, [listOfTransactions]);

    const [nonBackedUpCount, setNonBackedUpCount] = useState(0);
    const [networkType, setNetworkType] = useState(() => {
        const value = storage.getString('networkType');
        return value === 'cellular' ? 'wifiOrCellular' : (value ?? 'wifi');
    }); // 'wifi' | 'wifiOrCellular'
    const [autoBackup, setAutoBackup] = useState(storage.getBoolean('autoBackup') ?? true);

    useEffect(() => {
        storage.set('autoBackup', autoBackup);
    }, [autoBackup]);

    useEffect(() => {
        storage.set('networkType', networkType);
    }, [networkType]);

    const handleBackupNow = async () => {
        if (syncing) return;
        if (!connection.isConnected) {
            Alert.alert('No Internet', 'Connect to internet and try again.');
            return;
        }

        try {
            setSyncing(true);
            const result = await syncPendingTransactions();
            if (result?.syncedCount > 0) {
                Alert.alert('Success', `${result.syncedCount} transaction(s) backed up.`);
            } else {
                Alert.alert('Up to Date', 'No pending transactions to backup.');
            }
        } catch (err) {
            Alert.alert('Backup Failed', err?.message || 'Unable to backup transactions.');
        } finally {
            setSyncing(false);
        }
    };

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
                    {nonBackedUpCount > 0 ? `${nonBackedUpCount} transactions not backed up` : 'Your transactions are up to date'}
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
                        networkType === 'wifiOrCellular' && styles.optionSelected,
                    ]}
                    onPress={() => setNetworkType('wifiOrCellular')}
                >
                    <Text
                        style={[
                            styles.optionText,
                            networkType === 'wifiOrCellular' && styles.optionTextSelected,
                        ]}
                    >
                        Wi-Fi + Cellular
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Manual Backup Button */}
            <TouchableOpacity style={[styles.button, syncing && styles.buttonDisabled]} onPress={handleBackupNow} disabled={syncing}>
                <Text style={styles.buttonText}>{syncing ? 'Backing up...' : 'Backup Now'}</Text>
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
    buttonDisabled: {
        opacity: 0.65,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});
