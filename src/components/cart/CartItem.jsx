// components/CartItem.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function CartItem({
  item,
  itemNumber,
  onQuantityChange,
  onRemove,
  isUpdating,
}) {
  const defaultImage =
    'https://stores.altarekit.com/design/admin/assets/media/no_image.jpg';

  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row">
        {/* Item Number Badge */}
        <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center mr-4 mt-1">
          <Text className="text-white text-xs font-bold">{itemNumber}</Text>
        </View>

        {/* Item Image */}
        <View className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 mr-4">
          <Image
            source={{ uri: item.image || defaultImage }}
            className="w-full h-full"
            resizeMode="cover"
            defaultSource={{ uri: defaultImage }}
          />
        </View>

        {/* Item Details */}
        <View className="flex-1">
          <Text
            className="text-gray-900 text-lg font-semibold mb-1"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text className="text-gray-600 text-sm mb-1">{item.subtitle}</Text>
          <Text className="text-gray-500 text-xs mb-2">{item.description}</Text>

          {/* Price */}
          <Text className="text-gray-900 text-lg font-bold">
            EGP {(item.unit_price * item.quantity).toFixed(2)}
          </Text>
        </View>

        {/* Quantity Controls */}
        <View className="items-center justify-center ml-2">
          {/* Increase Button */}
          <TouchableOpacity
            onPress={() => onQuantityChange(item.id, item.quantity + 1)}
            className="w-8 h-8 border-2 border-gray-300 rounded-full items-center justify-center mb-2 bg-white"
            activeOpacity={0.7}
            disabled={isUpdating}
          >
            <Text className="text-gray-700 text-lg font-bold">+</Text>
          </TouchableOpacity>

          {/* Current Quantity */}
          {isUpdating ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <Text className="text-gray-900 text-base font-semibold mx-2">
              {item.quantity}
            </Text>
          )}

          {/* Decrease Button */}
          <TouchableOpacity
            onPress={() => onQuantityChange(item.id, item.quantity - 1)}
            className="w-8 h-8 border-2 border-gray-300 rounded-full items-center justify-center mt-2 bg-white"
            activeOpacity={0.7}
            disabled={isUpdating}
          >
            <Text className="text-gray-700 text-lg font-bold">-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
