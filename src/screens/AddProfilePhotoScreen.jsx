import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { pickImage, uploadImage } from '../utils/imageUpload';
import { storage, TransactionContext } from '../context/TransactionContext';
import LoadingAnimation from '../../components/LoadingAnimation';
import saveAvatarUri from '../utils/saveNewAvatar';

const AddProfilePhotoScreen = ({ navigation }) => {

  const {user, setUser} = useContext(TransactionContext);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [imgObj, setImgObj] = useState({});

  const getImage = async () => {
    try {
      const image = await pickImage();
      setImgObj(image);
      setProfilePic(image.uri);
    } catch (err) {
      console.log(err);
    }
  };

  const upload = async () => {
    try {
      setLoading(true);
      const uri = await uploadImage(imgObj);
      if(!user.token) throw new Error("Token is not found");
      await saveAvatarUri(uri, user.token);
      user.avatar = uri;
      setUser({...user});
      storage.set('user', JSON.stringify(user));
      navigation.navigate('mainApp');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip */}
      <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate("mainApp")}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.title}>Add a Profile Photo</Text>
      <Text style={styles.subtitle}>
        Adding a photo helps us personalize your experience and makes your
        profile stand out.
      </Text>

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          {!profilePic && (<Icon name="person-outline" size={64} color="#7CCFC4" />)}
          {profilePic && (<Image source={{uri: profilePic}} height={220} width={220} resizeMode='cover'/>)}
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={ getImage }>
          <Icon name="add" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadBtn} onPress={ upload }>
        <Text style={styles.uploadText}>Upload Photo</Text>
      </TouchableOpacity>

      {/* Info */}
      <Text style={styles.infoText}>
        Supported formats: JPG, PNG. Max size 5MB.
      </Text>

      {loading && (<LoadingAnimation message={'Uploading profile photo...'}/>)}
    </SafeAreaView>
  );
};

export default AddProfilePhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF9',
    paddingHorizontal: 24,
  },

  skipBtn: {
    alignSelf: 'flex-end',
    marginTop: 12,
    marginBottom: 24,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B8F8A',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B8F8A',
    textAlign: 'center',
    marginBottom: 56,
  },

  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 72,
  },

  avatarCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#E6F2EF',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#9ADBD2',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  addBtn: {
    position: 'absolute',
    bottom: 10,
    right: 68,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2F7D73',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  uploadBtn: {
    height: 58,
    borderRadius: 30,
    backgroundColor: '#2F7D73',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  infoText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
