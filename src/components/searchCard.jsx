import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const SearchCard = ({ product, onPress, onNavigateToLocation }) => {
  const hasDiscount =
    product.product_item_price_after_discount &&
    parseFloat(product.product_item_price_after_discount) <
      parseFloat(product.product_item_price);

  const formatPrice = price => {
    return parseFloat(price).toFixed(2);
  };

  return (
    <TouchableOpacity
      onPress={() => onPress?.(product)}
      className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 p-4"
      activeOpacity={0.7}
    >
      <View className="flex-row">
        {/* Product Image */}
        <View className="w-20 h-20 mr-4">
          <Image
            source={{ uri: product.pro_img_obj }}
            className="w-full h-full rounded-md"
            resizeMode="cover"
          />
        </View>

        {/* Product Details */}
        <View className="flex-1">
          {/* Product Name */}
          <Text
            className="text-gray-900 font-medium text-base leading-5 mb-1"
            numberOfLines={2}
          >
            {product.product_name}
          </Text>

          {/* Product Description */}
          {product.product_desc && (
            <Text className="text-gray-600 text-sm mb-2" numberOfLines={1}>
              {product.product_desc}
            </Text>
          )}

          {/* Category */}
          <Text className="text-blue-600 text-xs font-medium mb-2">
            {product.cat_name}
          </Text>

          {/* Price Section */}
          <View className="flex-row items-center mb-3">
            {hasDiscount ? (
              <View className="flex-row items-center">
                <Text className="text-green-600 font-bold text-lg mr-2">
                  {formatPrice(product.product_item_price_after_discount)} EGP
                </Text>
                <Text className="text-gray-400 line-through text-sm">
                  {formatPrice(product.product_item_price)} EGP
                </Text>
                <View className="ml-2 bg-red-100 px-2 py-1 rounded">
                  <Text className="text-red-600 text-xs font-medium">SALE</Text>
                </View>
              </View>
            ) : (
              <Text className="text-gray-900 font-bold text-lg">
                {formatPrice(product.product_item_price)} EGP
              </Text>
            )}
          </View>

          {/* Store Information and Navigation */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-4 h-4 mr-2">
                <Image
                  source={{ uri: product.store_img }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-gray-500 text-sm flex-1" numberOfLines={1}>
                {product.store_name}
              </Text>
            </View>

            {/* Navigation Buttons */}
            <View className="flex-row ml-2">
              <TouchableOpacity
                onPress={() => onNavigateToLocation?.(product, 'internal')}
                className="bg-green-100 px-3 py-2 rounded-md"
                activeOpacity={0.7}
              >
                <Text className="text-green-600 text-xs font-medium">
                  🗺️ View Map
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Address */}
          {product.address && (
            <Text className="text-gray-400 text-xs mt-1" numberOfLines={1}>
              📍 {product.address}
            </Text>
          )}

          {/* Top Product Badge */}
          {product.is_top === 1 && (
            <View className="absolute top-0 right-0 bg-yellow-100 px-2 py-1 rounded">
              <Text className="text-yellow-700 text-xs font-medium">
                ⭐ TOP
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;
