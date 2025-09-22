import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button.jsx';
import Input from 'components/Input.jsx';
import { Formik } from 'formik';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { clearError, loginUserAsync } from 'redux/authSlice.js';

// Validation Schema
const signinValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function SigninScreen() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSignin = async values => {
    dispatch(
      loginUserAsync({
        phone: values.phone,
        password: values.password,
      }),
    );
  };

  return (
    <View className="m-5 flex-1 justify-center">
      <Text className="text-3xl font-bold">Sign in to Locate</Text>
      <Text>Welcome back! Please enter your details</Text>

      <Formik
        initialValues={{
          phone: '',
          password: '',
        }}
        validationSchema={signinValidationSchema}
        onSubmit={handleSignin}
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
              placeholder="Phone number"
              value={values.phone}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
            />
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

            <Text>Forget Password ?</Text>

            <Button
              title={isLoading ? 'Logging In...' : 'Sign In'}
              onPress={handleSubmit}
              disabled={!isValid || !dirty || isLoading}
            />
          </View>
        )}
      </Formik>

      <View className="flex-row justify-center items-center">
        <Text className="text-lg">Don't have an account ? </Text>
        <TouchableOpacity onPress={() => navigate.navigate('SignupScreen')}>
          <Text className="text-mainColor text-lg">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
