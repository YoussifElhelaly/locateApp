import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MapView, { Marker } from 'react-native-maps';
import BackButton from 'components/BackButton.jsx';
import Button from 'components/Button.jsx';
import { addDeliveryAddress } from 'features/account/addDeliveryAddress';
import { updateDeliveryAddress } from 'features/account/updateDeliveryAddress';

// Validation Schema
const addressValidationSchema = Yup.object().shape({
  label: Yup.string()
    .min(2, 'Location name must be at least 2 characters')
    .required('Location name is required'),
});

const AddEditAddress = ({ route, navigation }) => {
  const { address, mode } = route.params || { mode: 'add' };
  const isEditMode = mode === 'edit';

  const queryClient = useQueryClient();
  const mapRef = useRef(null);
  const scrollViewRef = useRef(null);

  // Safe coordinate extraction with fallbacks
  const initialLatitude = address?.latitude ?? address?.lat ?? 30.0444;
  const initialLongitude = address?.longitude ?? address?.lng ?? 31.2357;

  const [markerPosition, setMarkerPosition] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
  });

  const [region, setRegion] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Add/Update mutation
  const saveMutation = useMutation({
    mutationFn: isEditMode ? updateDeliveryAddress : addDeliveryAddress,
    onSuccess: () => {
      Alert.alert(
        'Success',
        `Address ${isEditMode ? 'updated' : 'added'} successfully`,
        [
          {
            text: 'OK',
            onPress: () => {
              queryClient.invalidateQueries({
                queryKey: ['deliveryAddresses'],
              });
              navigation.goBack();
            },
          },
        ],
      );
    },
    onError: error => {
      Alert.alert(
        'Error',
        error.response?.data?.msg ||
          `Failed to ${isEditMode ? 'update' : 'add'} address`,
      );
    },
  });

  const handleMapPress = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
  };

  const handleSave = values => {
    const addressData = {
      label: values.label,
      latitude: markerPosition.latitude,
      longitude: markerPosition.longitude,
    };

    if (isEditMode) {
      addressData.id = address.id;
    }

    saveMutation.mutate(addressData);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center gap-2">
          <BackButton />
          <Text className="text-lg font-semibold text-gray-800">
            {isEditMode ? 'Edit Location' : 'Add Location'}
          </Text>
        </View>
      </View>

      {/* Map Section - Fixed Height, No Scroll */}
      <View className="h-64">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          region={region}
          onPress={handleMapPress}
          showsUserLocation
          showsMyLocationButton
          pointerEvents="auto"
        >
          <Marker
            coordinate={markerPosition}
            draggable
            onDragEnd={handleMapPress}
          >
            <View className="items-center">
              <View className="bg-orange-400 rounded-full p-3 shadow-lg">
                <View className="w-4 h-4 bg-white rounded-full" />
              </View>
            </View>
          </Marker>
        </MapView>
      </View>

      {/* Form Section - Separate ScrollView with KeyboardAvoidingView */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="p-5">
            <Formik
              initialValues={{
                label: address?.label || '',
              }}
              validationSchema={addressValidationSchema}
              onSubmit={handleSave}
              enableReinitialize
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <View>
                  {/* Title */}
                  <Text className="text-xl font-bold text-gray-800 mb-6">
                    Booking Location
                  </Text>

                  {/* Location Name */}
                  <View className="mb-6">
                    <TextInput
                      placeholder="Location Name (e.g., Home, Office)"
                      value={values.label}
                      onChangeText={handleChange('label')}
                      onBlur={handleBlur('label')}
                      style={{
                        borderWidth: 1,
                        borderColor: '#D1D5DB',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 16,
                      }}
                    />
                    {errors.label && touched.label && (
                      <Text className="text-red-500 text-sm ml-3 mt-1">
                        {errors.label}
                      </Text>
                    )}
                  </View>

                  {/* Save Button */}
                  <View className="mt-4 mb-8">
                    <Button
                      title={
                        saveMutation.isPending
                          ? 'Saving...'
                          : isEditMode
                            ? 'Update Location'
                            : 'Confirm Booking'
                      }
                      onPress={handleSubmit}
                      disabled={!isValid || saveMutation.isPending}
                      style={{ backgroundColor: '#D4A051' }}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddEditAddress;
