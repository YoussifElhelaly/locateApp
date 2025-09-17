import BackButton from 'components/BackButton.jsx';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Keep all your existing SVG icons...
const PrescriptionIcon = ({ size = 24, color = '#4A90E2' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke={color}
      strokeWidth="2"
    />
    <Path d="M8 12h8" stroke={color} strokeWidth="1.5" />
    <Path d="M8 16h6" stroke={color} strokeWidth="1.5" />
    <Path d="M8 8h8" stroke={color} strokeWidth="1.5" />
    <Circle cx="17" cy="7" r="2" fill={color} />
  </Svg>
);

const UploadIcon = ({ size = 20, color = '#4A90E2' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      stroke={color}
      strokeWidth="2"
    />
    <Path d="M7 10l5-5 5 5" stroke={color} strokeWidth="2" />
    <Path d="M12 15V5" stroke={color} strokeWidth="2" />
  </Svg>
);

const PhotoLibraryIcon = ({ size = 24, color = '#4A90E2' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path d="M12 8v8" stroke={color} strokeWidth="2" />
    <Path d="M8 12h8" stroke={color} strokeWidth="2" />
  </Svg>
);

const CameraIcon = ({ size = 24, color = '#4A90E2' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
      stroke={color}
      strokeWidth="2"
    />
    <Circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2" />
  </Svg>
);

// Updated Image Picker Modal Component
const ImagePickerModal = ({ visible, onClose, onImageSelected }) => {
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickFromLibrary = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel || response.errorMessage) {
        console.log('User cancelled or error:', response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0]) {
        onImageSelected(response.assets[0]);
        onClose();
      }
    });
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission required',
        'Camera permission is required to take photos',
      );
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel || response.errorMessage) {
        console.log('User cancelled or error:', response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0]) {
        onImageSelected(response.assets[0]);
        onClose();
      }
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 mx-8 w-80">
          <Text className="text-2xl font-bold text-center mb-2">Add photo</Text>

          <Text className="text-gray-600 text-center mb-8">
            We respect your privacy, any personal data are safe with us.
          </Text>

          <TouchableOpacity
            onPress={pickFromLibrary}
            className="flex-row items-center py-4 px-2"
          >
            <PhotoLibraryIcon size={24} />
            <Text className="text-blue-500 text-lg font-medium ml-3">
              Import From Photo Library
            </Text>
          </TouchableOpacity>

          <View className="h-px bg-gray-200 my-2" />

          <TouchableOpacity
            onPress={takePhoto}
            className="flex-row items-center py-4 px-2"
          >
            <CameraIcon size={24} />
            <Text className="text-blue-500 text-lg font-medium ml-3">
              Take A Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} className="mt-4 py-3">
            <Text className="text-gray-500 text-center font-medium">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Keep the rest of your component exactly the same...
const CategoryButton = ({ title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-blue-500 rounded-2xl mx-2 mb-4"
    style={{
      width: (width - 60) / 3,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text className="text-white font-semibold text-center text-sm px-2">
      {title}
    </Text>
  </TouchableOpacity>
);

const PrescriptionCard = ({ onUploadPress }) => (
  <View className="bg-gray-100 rounded-2xl p-6 mx-4 mb-6">
    <View className="flex-row items-start mb-4">
      <View className="mr-4 mt-1">
        <PrescriptionIcon size={32} />
      </View>
      <View className="flex-1">
        <Text className="text-xl font-bold text-gray-800 mb-2">
          Upload the prescription & let the pharmacy pick the product for you!
        </Text>
      </View>
    </View>

    <TouchableOpacity
      onPress={onUploadPress}
      className="bg-blue-500 rounded-full py-3 px-6 self-end"
    >
      <View className="flex-row items-center">
        <UploadIcon size={16} color="white" />
        <Text className="text-white font-semibold ml-2">
          Upload prescription
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default function AllStoreProducts() {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    'Offers',
    'Made in Egypt',
    'Bundles & Sets',
    'Vitamins',
    'Common symptoms',
    'Pain relief',
  ];

  const handleUploadPress = () => {
    setShowImagePicker(true);
  };

  const handleImageSelected = image => {
    setSelectedImage(image);
    console.log('Selected image:', image);
    Alert.alert('Success', 'Prescription uploaded successfully!');
  };

  const handleCategoryPress = category => {
    console.log('Category pressed:', category);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="pt-6">
        <View className="flex-row items-center gap-2 mb-6">
          <BackButton />
          <Text className="text-3xl font-bold text-gray-900">
            Prescriptions
          </Text>
        </View>

        <PrescriptionCard onUploadPress={handleUploadPress} />

        <View className="flex-row flex-wrap justify-center px-4">
          {categories.map((category, index) => (
            <CategoryButton
              key={index}
              title={category}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </View>
      </View>

      <ImagePickerModal
        visible={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onImageSelected={handleImageSelected}
      />
    </ScrollView>
  );
}
