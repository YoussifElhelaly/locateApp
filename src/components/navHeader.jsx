import {
  Image,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import notificationIcon from '../assets/notificationIcon.png';
import searchIcon from '../assets/searchIcon.png';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BackButton from './BackButton';
import { useState } from 'react'
export default function NavHeader({ route, options }) {
  const [searchValue, setSearchValue] = useState('');
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
              <Text className="text-xl font-medium text-white mx-auto">{options.tabBarLabel ? options.tabBarLabel : options.title}</Text>
            </View>
          ) : (
            <Text className="text-xl font-medium text-white">
              Hey, {user?.full_name || 'Guest'}
            </Text>
          )}
          <View className="flex-row gap-4 items-center">
            {/* <TouchableWithoutFeedback onPress={() => navigate.navigate('SearchResult')}>
              <Image source={searchIcon} className="w-6 h-6 text-white" />
            </TouchableWithoutFeedback> */}
            <TouchableWithoutFeedback>

              <Image source={notificationIcon} className="w-6 h-6 text-white" />
            </TouchableWithoutFeedback>
          </View>
        </View>
        {route.name == 'Home' &&
          <View className="flex-row items-center px-2 py-2 bg-white rounded-lg">
            <Image
              source={searchIcon}
              className="size-4 mr-3 opacity-60"
            />
            <TextInput
              className="flex-1 py-3 text-gray-700 "
              placeholder="Search for products"
              placeholderTextColor="#9CA3AF"
              keyboardType="web-search"
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
              value={searchValue}
              onChangeText={setSearchValue}

            />

            {/* Clear button */}
            {searchValue.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchValue('')}
                className="mr-3 p-1"
              >
                <Text className="text-gray-400 text-lg">×</Text>
              </TouchableOpacity>
            )}

            {/* Search Button */}
            <TouchableOpacity
              onPress={() => navigate.navigate('SearchResult', { searchValue })}
              className="bg-mainColor px-5 py-2.5 rounded-lg shadow-sm"
              activeOpacity={0.8}
              disabled={!searchValue.trim()}
              style={{
                backgroundColor: searchValue.trim() ? '#327eb6' : '#94a3b8',
              }}
            >
              <Text className="text-white font-semibold text-sm">
                Search
              </Text>
            </TouchableOpacity>
          </View>
        }

      </View>
    </View>
  );
}
