import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import BackButton from 'components/BackButton.jsx';
import Button from 'components/Button.jsx';
import Input from 'components/Input.jsx';
import { getPersonalDetails } from 'features/account/getPersonalDetails';
import { updatePersonalDetails } from 'features/account/updatePersonalDetails';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Text, View, Alert, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';

// Validation Schema
const personalDetailsValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  last_name: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  phone: Yup.string()
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const PersonalDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  // Fetch personal details
  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ['personalDetails'],
    queryFn: () => getPersonalDetails(),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: updatePersonalDetails,
    onSuccess: () => {
      Alert.alert('Success', 'Personal details updated successfully');
      queryClient.invalidateQueries({ queryKey: ['personalDetails'] });
      setIsEditing(false);
    },
    onError: error => {
      Alert.alert(
        'Error',
        error.response?.data?.msg || 'Failed to update personal details',
      );
    },
  });

  const handleSave = async values => {
    updateMutation.mutate(values);
  };

  const handleCancel = resetForm => {
    resetForm();
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (fetchError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error loading personal details</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center gap-2">
          <BackButton />
          <Text className="text-lg font-semibold">Personal Details</Text>
        </View>
      </View>

      {/* Form */}
      <View className="p-5">
        <Formik
          initialValues={{
            first_name: data?.first_name || '',
            last_name: data?.last_name || '',
            phone: data?.phone_number || '',
            email: data?.email || '',
          }}
          validationSchema={personalDetailsValidationSchema}
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
            dirty,
            resetForm,
          }) => (
            <View>
              {/* First Name */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-1">
                  First Name
                </Text>
                <Input
                  placeholder="First name"
                  value={values.first_name}
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  editiable={isEditing}
                />
                {errors.first_name && touched.first_name && (
                  <Text className="text-red-500 text-sm ml-3 mt-1">
                    {errors.first_name}
                  </Text>
                )}
              </View>

              {/* Last Name */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-1">
                  Last Name
                </Text>
                <Input
                  placeholder="Last name"
                  value={values.last_name}
                  onChangeText={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  editable={isEditing}
                />
                {errors.last_name && touched.last_name && (
                  <Text className="text-red-500 text-sm ml-3 mt-1">
                    {errors.last_name}
                  </Text>
                )}
              </View>

              {/* Phone Number */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-1">
                  Phone Number
                </Text>
                <Input
                  placeholder="Phone number"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  keyboardType="phone-pad"
                  editable={isEditing}
                />
                {errors.phone && touched.phone && (
                  <Text className="text-red-500 text-sm ml-3 mt-1">
                    {errors.phone}
                  </Text>
                )}
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-700 mb-1">
                  Email
                </Text>
                <Input
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={isEditing}
                />
                {errors.email && touched.email && (
                  <Text className="text-red-500 text-sm ml-3 mt-1">
                    {errors.email}
                  </Text>
                )}
              </View>

              {!isEditing && (
                <View className="mt-4">
                  <Button
                    title="Edit"
                    onPress={() => setIsEditing(true)}
                    disabled={updateMutation.isPending}
                    style={{ backgroundColor: '#gray' }}
                  />
                </View>
              )}
              {/* Action Buttons - Only show when editing */}
              {isEditing && (
                <View className="flex-row gap-3 mt-4">
                  <View className="flex-1">
                    <Button
                      title="Cancel"
                      onPress={() => handleCancel(resetForm)}
                      disabled={updateMutation.isPending}
                      style={{ backgroundColor: '#gray' }}
                    />
                  </View>
                  <View className="flex-1">
                    <Button
                      title={
                        updateMutation.isPending ? 'Saving...' : 'Save Changes'
                      }
                      onPress={handleSubmit}
                      disabled={!isValid || !dirty || updateMutation.isPending}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default PersonalDetails;
