import React, { useState, useEffect } from 'react';
import SearchCard from 'components/searchCard.jsx';
import { useLayoutEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  RefreshControl,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import searchIcon from '../assets/searchIcon.png';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from 'features/stores/getProducts';
import LoadingSpinner from 'components/LoadingSpinner.jsx';
import { openExternalMaps } from 'utils/helpers.js';
import BackButton from 'components/BackButton.jsx';
import notificationIcon from '../assets/notificationIcon.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
export default function SearchResult() {
  const route = useRoute()
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState(route.params?.searchValue ? route.params?.searchValue : '');
  const [currentSearchTerm, setCurrentSearchTerm] = useState(route.params?.searchValue ? route.params?.searchValue : "");
  const insets = useSafeAreaInsets();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['products', currentSearchTerm],
    queryFn: () => getProducts(currentSearchTerm),
  });


  const handleSearchSubmit = () => {
    setCurrentSearchTerm(searchValue.trim());
    Keyboard.dismiss();
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setCurrentSearchTerm('');
  };

  const handleProductPress = product => {
    navigation.navigate('ProductDetails', { productDetails: product });
  };

  const handleNavigateToLocation = (product, type) => {
    if (type === 'external') {
      openExternalMaps(
        product.lat,
        product.long,
        product.store_name,
        product.address,
      );
    } else if (type === 'internal') {
      navigation.navigate('MapLocationScreen', { product });
    }
  };



  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center">
      <View className="items-center">
        <Text className="text-6xl mb-4 p-2">🔍</Text>
        <Text className="text-gray-500 text-lg mb-2 font-medium">
          {currentSearchTerm ? 'No products found' : 'Start your search'}
        </Text>
        <Text className="text-gray-400 text-center px-4 leading-6">
          {currentSearchTerm
            ? `No results for "${currentSearchTerm}". Try different keywords.`
            : 'Enter a product name or keyword to find items near you'}
        </Text>
        {currentSearchTerm && (
          <TouchableOpacity
            onPress={handleClearSearch}
            className="mt-4 bg-blue-100 px-4 py-2 rounded-lg"
          >
            <Text className="text-blue-600 font-medium">Clear Search</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => handleNavigateToLocation(product, 'external')}
          className="mt-4 bg-green-100 px-4 py-2 rounded-lg"
        >
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchResults = () => (
    <View className="mb-4 px-5 flex-row items-center gap-2 mt-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-xl font-bold text-gray-900">
            {data?.length || 0} {data?.length === 1 ? 'Result' : 'Results'}
          </Text>
          {currentSearchTerm && (
            <Text className="text-gray-500 text-sm mt-1">
              for "{currentSearchTerm}"
            </Text>
          )}
        </View>

        {currentSearchTerm && (
          <TouchableOpacity
            onPress={handleClearSearch}
            className="bg-gray-100 px-3 py-2 rounded-md"
          >
            <Text className="text-gray-600 text-sm font-medium">Clear</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AllProductsMap', {
              products: data,
            });
          }}
        >
          <Text className="text-mainColor font-medium">View Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <View
            className="px-4 bg-mainColor pb-4"
          >
            <View className=" gap-2">
              <View className="flex-row items-center px-4 py-3 bg-white rounded-lg">
                <Image
                  source={searchIcon}
                  className="w-5 h-5 mr-3 opacity-60"
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
                  onSubmitEditing={handleSearchSubmit}
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
                  onPress={handleSearchSubmit}
                  className="bg-blue-600 px-5 py-2.5 rounded-lg shadow-sm"
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
            </View>
          </View>

          {/* Results Section */}
          {renderSearchResults()}

          {/* Products List */}
          <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
          >
            {data?.length > 0 ? (
              <View className="pb-6">
                {data.map(product => (
                  <SearchCard
                    key={product.product_id}
                    product={product}
                    onPress={handleProductPress}
                    onNavigateToLocation={handleNavigateToLocation}
                  />
                ))}
              </View>
            ) : (
              renderEmptyState()
            )}
          </ScrollView>
        </>
      )}
    </>
  );
}
