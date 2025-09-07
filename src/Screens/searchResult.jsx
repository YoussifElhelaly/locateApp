import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
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
} from 'react-native';
import searchIcon from '../assets/searchIcon.png';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from 'features/stores/getProducts';
import LoadingSpinner from 'components/LoadingSpinner.jsx';
import { openExternalMaps } from 'utils/helpers.js';
import BackButton from 'components/BackButton.jsx';

export default function SearchResult() {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['products', currentSearchTerm],
    queryFn: () => getProducts(currentSearchTerm),
  });

  // Initial load with empty search
  useEffect(() => {
    setCurrentSearchTerm('');
  }, []);

  const handleSearchSubmit = () => {
    setCurrentSearchTerm(searchValue.trim());
    Keyboard.dismiss();
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setCurrentSearchTerm('');
  };

  const handleProductPress = product => {
    console.log('Product pressed:', product.product_name);
    // navigation.navigate('ProductDetail', { productId: product.product_id });
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center py-20">
      <View className="items-center">
        <Text className="text-6xl mb-4">🔍</Text>
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
      </View>
    </View>
  );

  const renderSearchResults = () => (
    <View className="mb-4 px-5 flex-row items-center gap-2">
      <View className="flex-row items-center justify-between">
        <View>
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
      </View>

      {data?.length > 0 && (
        <Text className="text-gray-500 text-sm mt-2">
          Showing available products
        </Text>
      )}
    </View>
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SafeAreaView className="flex-1 bg-gray-50">
          <View className="flex-row items-center gap-2">
            <BackButton />
            <Text className="font-bold">Back</Text>
          </View>
          <View className="px-5 pt-5 pb-2">
            {/* Professional Search Input */}
            <View className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
              <View className="flex-row items-center px-4 py-3">
                <Image
                  source={searchIcon}
                  className="w-5 h-5 mr-3 opacity-60"
                />
                <TextInput
                  className="flex-1 text-base text-gray-700"
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
                    backgroundColor: searchValue.trim() ? '#2563eb' : '#94a3b8',
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
        </SafeAreaView>
      )}
    </>
  );
}
