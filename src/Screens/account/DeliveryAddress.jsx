import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import BackButton from 'components/BackButton.jsx';
import Button from 'components/Button.jsx';
import Svg, { Path } from 'react-native-svg';
import { getDeliveryAddresses } from 'features/account/getDeliveryAddresses';
import { deleteDeliveryAddress } from 'features/account/deleteDeliveryAddress';

export const LocationIcon = ({
  width = 24,
  height = 24,
  color = '#D4A051',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill={color}
      />
    </Svg>
  );
};

export const EditIcon = ({ width = 20, height = 20, color = '#6B7280' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        fill={color}
      />
    </Svg>
  );
};

export const LocationOffIcon = ({
  width = 64,
  height = 64,
  color = '#D1D5DB',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6.5c1.38 0 2.5 1.12 2.5 2.5 0 .74-.33 1.39-.83 1.85l3.63 3.63c.98-1.86 1.7-3.8 1.7-5.48 0-3.87-3.13-7-7-7-1.98 0-3.76.83-5.04 2.15l3.19 3.19c.46-.52 1.11-.84 1.85-.84zm4.37 9.6l-4.63-4.63-.11-.11L3.27 3 2 4.27l3.18 3.18C5.07 7.95 5 8.47 5 9c0 5.25 7 13 7 13s1.67-1.85 3.38-4.35L18.73 21 20 19.73l-3.63-3.63z"
        fill={color}
      />
    </Svg>
  );
};

export const DeleteIcon = ({ width = 20, height = 20, color = '#EF4444' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
        fill={color}
      />
    </Svg>
  );
};

const DeliveryAddress = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  // Fetch delivery addresses
  const {
    data: addresses = [],
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ['deliveryAddresses'],
    queryFn: () => getDeliveryAddresses(),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteDeliveryAddress,
    onSuccess: () => {
      Alert.alert('Success', 'Address deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['deliveryAddresses'] });
    },
    onError: error => {
      Alert.alert(
        'Error',
        error.response?.data?.msg || 'Failed to delete address',
      );
    },
  });

  const handleDelete = addressId => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(addressId),
        },
      ],
    );
  };

  const handleEdit = address => {
    navigation.navigate('AddEditAddress', {
      address,
      mode: 'edit',
    });
  };

  const handleAddNew = () => {
    navigation.navigate('AddEditAddress', {
      mode: 'add',
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#D4A051" />
        <Text className="mt-2 text-gray-600">Loading addresses...</Text>
      </View>
    );
  }

  if (fetchError) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">Error loading addresses</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center gap-2">
          <BackButton />
          <Text className="text-lg font-semibold text-gray-800">
            Delivery Addresses
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-5">
        {/* Address List */}
        {addresses.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <LocationOffIcon width={64} height={64} color="#D1D5DB" />
            <Text className="text-gray-500 mt-4 text-center">
              No saved addresses yet
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-1">
              Add your first delivery address
            </Text>
          </View>
        ) : (
          addresses.map((address, index) => (
            <View
              key={address.id || index}
              className="mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              {/* Address Header */}
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-row items-center flex-1">
                  <LocationIcon width={24} height={24} color="#D4A051" />
                  <Text className="ml-2 text-base font-semibold text-gray-800 flex-1">
                    {address.label || 'Unnamed Location'}
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => handleEdit(address)}
                    className="p-1"
                  >
                    <EditIcon width={20} height={20} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(address.id)}
                    className="p-1"
                    disabled={deleteMutation.isPending}
                  >
                    <DeleteIcon width={20} height={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Address Details */}
              <Text className="text-sm text-gray-600 ml-8">
                {`${address.street}, ${address.area}, ${address.city}, ${address.country}`}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Location Button */}
      <View className="p-5 border-t border-gray-200">
        <Button title="Add Location" onPress={handleAddNew} />
      </View>
    </View>
  );
};

export default DeliveryAddress;
