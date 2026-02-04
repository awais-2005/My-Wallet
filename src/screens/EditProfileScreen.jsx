import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { storage } from '../context/TransactionContext';
import { wp } from './TransactionScreen';
import { pickImage, uploadImage } from '../utils/imageUpload';
import { API_KEY, SERVER_URL } from '../config/constants';
import saveNewInfo from '../utils/saveNewInfo';
import saveAvatarUri from '../utils/saveNewAvatar';
import LoadingAnimation from '../../components/LoadingAnimation';
import { themeColor } from '../config/theme';

const EditProfileScreen = ({ navigation }) => {

    const user = storage.getString('user') ? JSON.parse(storage.getString('user')) : {};

    const [profilePic, setProfilePic] = useState(user.avatar || '');
    const [newName, setNewName] = useState(user.name || 'There is something wrong');
    const [newEmail, setNewEmail] = useState(user.email || 'There is something wrong');
    const [loading, setLoading] = useState(false);
    const [imgObj, setImgObj] = useState({});

    const getImage = async () => {
        try {
            const image = await pickImage();
            setImgObj(image);
            setProfilePic(image.uri);
        } catch (e) {
            console.log(e);
        }
    }

    const uploadChanges = async () => {
        try {
            setLoading(true);
            await saveAvatar();
            await saveNameAndEmail();
            storage.set('user', JSON.stringify(user));
            navigation.canGoBack() && navigation.goBack();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const saveAvatar = async () => {
        if(Object.keys(imgObj).length === 0) {
            return;
        }
        const uri = await uploadImage(imgObj);
        if(!user.token) {
            throw new Error("JWT token is not available!");
        }
        await saveAvatarUri(uri, user.token);
        user.avatar = uri;
    }

    const saveNameAndEmail = async () => {
        if (user.name !== newName || user.email !== newEmail) {
            const res = await saveNewInfo(newName, newEmail, user.token);
            if(user.email !== newEmail) {
                const { token } = await res.json();
                user.token = token;
            }
            user.email = newEmail;
            user.name = newName;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Back */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
                <Icon name="arrow-back" size={22} color="#0F172A" />
            </TouchableOpacity>

            {/* Avatar */}
            <View style={styles.avatarWrapper}>
                <View style={styles.avatarCircle}>
                    {!profilePic && (<Icon name="person-outline" size={64} color="#7CCFC4" />)}
                    {profilePic && (<Image source={{ uri: profilePic }} height={120} width={120} resizeMode='cover' />)}
                </View>

                <TouchableOpacity style={styles.editAvatarBtn} onPress={getImage}>
                    <Icon name="camera-outline" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Title */}
            <Text style={styles.title}>Edit Profile</Text>
            <Text style={styles.subtitle}>
                Update your personal information
            </Text>

            {/* Full Name */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    placeholder={user.name || "John Doe"}
                    placeholderTextColor="#9CA3AF"
                    value={newName}
                    onChangeText={setNewName}
                    style={styles.input}
                />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    placeholder={user.email || ""}
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    value={newEmail}
                    onChangeText={setNewEmail}
                    style={styles.input}
                />
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.button} onPress={uploadChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            {loading && (<LoadingAnimation message={'Saving Changes...'} />)}
        </SafeAreaView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAF9',
        paddingHorizontal: 24,
    },

    backBtn: {
        marginTop: 12,
        marginBottom: 16,
        width: 40,
    },

    avatarWrapper: {
        alignItems: 'center',
        marginBottom: 24,
    },

    avatarCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E6F2EF',
        borderWidth: 2,
        borderColor: '#9ADBD2',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        left: (wp(50) - 24) - 20 + 40,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: themeColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A',
        textAlign: 'center',
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 15,
        color: '#6B8F8A',
        textAlign: 'center',
        marginBottom: 32,
    },

    inputGroup: {
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 8,
    },

    input: {
        height: 54,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
    },

    button: {
        height: 56,
        borderRadius: 16,
        backgroundColor: '#2F7D73',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
    },
});

