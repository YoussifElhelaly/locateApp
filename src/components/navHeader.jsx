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

export default function NavHeader() {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();

  return (
    <View style={{ paddingTop: insets.top }} className="px-4 bg-mainColor pb-4">
      <View className=" gap-2">
        <View className="flex items-center justify-between flex-row mb-3">
          <Text className="text-xl font-medium text-white">
            Hey, Youssif Elhelaly
          </Text>
          <TouchableWithoutFeedback>
            <Image source={notificationIcon} className="w-6 h-6 text-white" />
          </TouchableWithoutFeedback>
        </View>
        <TouchableHighlight onPress={() => navigate.navigate('SearchResult')}>
          <View className="w-full text-base bg-white text-gray-700 px-3 py-2 rounded-md flex items-center gap-2 flex-row">
            <Image source={searchIcon} className="w-6 h-6 text-white" />
            <Text className="text-gray-400">Search for products</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}
