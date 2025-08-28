import { useNavigation } from '@react-navigation/native';
import Button from 'components/Button.jsx';
import Input from 'components/Input.jsx';
import { Text, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
  const navigate = useNavigation();

  return (
    <View className="m-5 flex-1 justify-center">
      <Text className="text-3xl font-bold">Sign Up</Text>
      <View>
        <Input placeholder={'Full Name'} />
        <Input placeholder={'Email'} />
        <Input placeholder={'Phone number'} />
        <Input placeholder={'Password'} secureTextEntry={true} />
        <Input placeholder={'Referral code'} />
        <Text>
          By signing up, You agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
      <Button title={'Sign Up'} onPress={() => navigate.navigate('MainApp')} />
      <View className="flex-row justify-center items-center">
        <Text className="text-lg">Already have an account ? </Text>
        <TouchableOpacity onPress={() => navigate.navigate('SigninScreen')}>
          <Text className="text-mainColor text-lg">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
