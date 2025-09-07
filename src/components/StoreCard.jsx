import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

const StoreCard = ({ data, onPress }) => {
  const {
    store_name,
    store_owner,
    store_type_name,
    address,
    phone,
    is_active,
    created_at,
    img,
    lat,
    long,
  } = data;

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCall = async () => {
    try {
      const phoneUrl = `tel:${phone}`;
      const canOpen = await Linking.canOpenURL(phoneUrl);

      if (canOpen) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', 'Unable to make phone call');
      }
    } catch (error) {
      console.error('Error making phone call:', error);
      Alert.alert('Error', 'Unable to make phone call');
    }
  };

  const handleLocation = async () => {
    try {
      // For iOS and Android
      const mapUrl = `https://maps.google.com/?q=${lat},${long}`;
      const canOpen = await Linking.canOpenURL(mapUrl);

      if (canOpen) {
        await Linking.openURL(mapUrl);
      } else {
        Alert.alert('Error', 'Unable to open maps');
      }
    } catch (error) {
      console.error('Error opening maps:', error);
      Alert.alert('Error', 'Unable to open maps');
    }
  };

  return (
    <View className="bg-white rounded-xl mx-0 my-2 shadow-lg overflow-hidden w-full">
      {/* Store Image */}
      <View className="relative h-48">
        <Image
          source={{ uri: img }}
          className="w-full h-full"
          style={{ resizeMode: 'cover' }}
        />
        <View
          className={`absolute top-3 right-3 px-2 py-1 rounded-full ${
            is_active ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          <Text className="text-white text-xs font-bold">
            {is_active ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      {/* Store Info */}
      <View className="p-4">
        <View className="mb-2">
          <Text className="text-2xl font-bold text-gray-800 mb-1">
            {store_name}
          </Text>
          <Text className="text-base text-gray-600 bg-gray-100 px-2 py-1 rounded self-start">
            {store_type_name}
          </Text>
        </View>

        <Text className="text-base text-gray-700 mb-3 italic">
          Owner: {store_owner}
        </Text>

        <View className="mb-4">
          <View className="flex-row items-center mb-1.5">
            <Text className="text-base mr-2 w-5">📍</Text>
            <Text className="text-sm text-gray-600 flex-1">{address}</Text>
          </View>

          <View className="flex-row items-center mb-1.5">
            <Text className="text-base mr-2 w-5">📞</Text>
            <TouchableOpacity onPress={handleCall}>
              <Text className="text-sm text-blue-600 underline">{phone}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-1.5">
            <Text className="text-base mr-2 w-5">📅</Text>
            <Text className="text-sm text-gray-600">
              Created: {formatDate(created_at)}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-around pt-3 border-t border-gray-200">
          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-lg min-w-20 items-center active:bg-blue-600"
            onPress={onPress}
            activeOpacity={0.8}
          >
            <Text className="text-white text-base font-bold">
              View Products
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-lg min-w-20 items-center active:bg-blue-600"
            onPress={handleLocation}
            activeOpacity={0.8}
          >
            <Text className="text-white text-base font-bold">Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StoreCard;
