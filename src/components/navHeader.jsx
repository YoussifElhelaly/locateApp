import {
  Image,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import notificationIcon from '../assets/notificationIcon.png';
import searchIcon from '../assets/searchIcon.png';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BackButton from './BackButton';

export default function NavHeader({ route }) {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const user = useSelector(state => state.auth.user);

  return (
    <View style={{ paddingTop: insets.top }} className="px-4 bg-mainColor pb-4">
      <View className=" gap-2">
        <View className="flex items-center justify-between flex-row mb-3">
          {route.name !== 'Home' ? (
            <View className="flex-row items-center gap-2 flex-1 justify-between">
              <BackButton />
              <Text className="text-xl font-medium text-white mx-auto">{route.name}</Text>
            </View>
          ) : (
            <Text className="text-xl font-medium text-white">
              Hey, {user?.full_name || 'Guest'}
            </Text>
          )}
          <View className="flex-row gap-4 items-center">
            <TouchableWithoutFeedback onPress={() => navigate.navigate('SearchResult')}>
              <Image source={searchIcon} className="w-6 h-6 text-white" />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Image source={notificationIcon} className="w-6 h-6 text-white" />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
}
