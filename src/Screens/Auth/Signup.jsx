import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/Button.jsx';
import Input from 'components/Input.jsx';
import { Text, TouchableOpacity, View, Alert, ScrollView, SafeAreaView } from 'react-native';
import { clearError, signUpUserAsync } from 'redux/authSlice.js';


// Validation Schema
const signupValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  last_name: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^5[0-9]{8}$/, 'Phone number must be 9 digits starting with 5 (e.g., 512345678)')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function SignupScreen() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated } = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSignup = values => {
    dispatch(
      signUpUserAsync({
        user_type: 2,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: `+966${values.phone}`, // Add country code to phone number
        password: values.password,
        password_confirmation: values.password_confirmation,
      }),
    );
  };

  return (
    <SafeAreaView className='justify-center flex-1 m-5 '>
      <View className=' justify-center '>
        <ScrollView className="">
          <Text className="text-3xl font-bold">Sign Up</Text>
          <Formik
            initialValues={{
              user_type: 2,
              first_name: '',
              last_name: '',
              email: '',
              phone: '',
              password: '',
              password_confirmation: '',
            }}
            validationSchema={signupValidationSchema}
            onSubmit={handleSignup}
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
            }) => (
              <View>
                <Input
                  placeholder="First Name"
                  value={values.first_name}
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                />
                {errors.first_name && touched.first_name && (
                  <Text className="text-red-500 text-sm ml-3 mb-2">
                    {errors.first_name}
                  </Text>
                )}

                <Input
                  placeholder="Last Name"
                  value={values.last_name}
                  onChangeText={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                />
                {errors.last_name && touched.last_name && (
                  <Text className="text-red-500 text-sm ml-3 mb-2">
                    {errors.last_name}
                  </Text>
                )}

                <Input
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email && (
                  <Text className="text-red-500 text-sm ml-3 mb-2">
                    {errors.email}
                  </Text>
                )}

                <View className="flex-row items-center border bg-gray-200 border-gray-300 rounded-lg px-3 ">
                  <Text className="text-gray-700 font-medium mr-2">+966</Text>
                  <Input
                    placeholder="5XXXXXXXX"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    keyboardType="phone-pad"
                    className="flex-1 border-0 p-0 m-0"
                  />
                </View>
                {errors.phone && touched.phone && (
                  <Text className="text-red-500 text-sm ml-3 mb-2">
                    {errors.phone}
                  </Text>
                )}

                <Input
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                />
                {errors.password && touched.password && (
                  <Text className="text-red-500 text-sm ml-3 mb-2">
                    {errors.password}
                  </Text>
                )}

                <Input
                  placeholder="Confirm Password"
                  value={values.password_confirmation}
                  onChangeText={handleChange('password_confirmation')}
                  onBlur={handleBlur('password_confirmation')}
                  secureTextEntry={true}
                />
                {errors.password_confirmation && touched.password_confirmation && (
                  <Text className="text-red-500 text-sm ml-3 mb-2">
                    {errors.password_confirmation}
                  </Text>
                )}

                <Text className="text-sm text-gray-600 my-3">
                  By signing up, You agree to our Terms of Service and Privacy
                  Policy.
                </Text>

                <Button
                  title={isLoading ? 'Creating Account...' : 'Sign Up'}
                  onPress={handleSubmit}
                  disabled={!isValid || !dirty || isLoading}
                />
              </View>
            )}
          </Formik>

          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-lg">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigate.navigate('SigninScreen')}>
              <Text className="text-mainColor text-lg">Sign in</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
