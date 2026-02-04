import { launchImageLibrary } from 'react-native-image-picker';
import { CLOUDINARY_CLOUD_NAME } from '../config/constants';

const CLOUD_NAME = CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = 'profile_uploads';


export const pickImage = async () => {
  const res = await launchImageLibrary(
    { mediaType: 'photo', quality: 0.5 },
    (response) => {
      if (response.didCancel || response.errorCode) {
        return;
      }
      const asset = response.assets[0];
      return asset;
    }
  );
  return res.assets[0];
};

export const uploadImage = async (image) => {

    if (!image) return null;

    // Prepare form data
    const formData = new FormData();
    formData.append('file', {
        uri: image.uri,
        type: image.mimeType || 'image/jpeg',
        name: 'profile.jpg',
    });
    formData.append('upload_preset', UPLOAD_PRESET);

    // Upload to Cloudinary
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error?.message || 'Upload failed');
    }

    return data.secure_url; // profile image URL
};