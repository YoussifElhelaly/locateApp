// components/EmptyCart.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function EmptyCart({ onContinueShopping }) {
  return (
    <View
      className="flex-1 justify-center items-center px-8"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* Empty Cart Icon */}
      <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-6">
        <Text className="text-4xl">🛒</Text>
      </View>

      {/* Empty Cart Content */}
      <View className="items-center mb-8">
        <Text className="text-gray-900 text-xl font-semibold mb-2 text-center">
          Your Cart is Empty
        </Text>
        <Text className="text-gray-600 text-base text-center leading-6">
          Looks like you haven't added any items to your cart yet. Start
          shopping to fill it up!
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={onContinueShopping}
        className="bg-blue-500 px-8 py-3 rounded-lg"
        activeOpacity={0.8}
      >
        <Text className="text-white font-semibold text-lg">
          Continue Shopping
        </Text>
      </TouchableOpacity>

      {/* Additional Help Text */}
      <Text className="text-gray-500 text-sm mt-6 text-center">
        Browse our categories to discover great products
      </Text>
    </View>
  );
}
