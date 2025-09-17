// components/EmptyMainCategories.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function EmptyMainCategories({ onRefresh }) {
  return (
    <View className="flex-1 justify-center items-center px-8 bg-gray-50">
      {/* Empty State Icon - Using styled element instead */}
      <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-6 border-4 border-gray-200">
        <Text className="text-4xl text-gray-400">📁</Text>
      </View>

      {/* Empty State Content */}
      <View className="items-center mb-8">
        <Text className="text-xl font-semibold text-gray-900 mb-2 text-center">
          No Categories Available
        </Text>
        <Text className="text-base text-gray-600 text-center leading-6">
          We couldn't find any categories at the moment. Please check your
          connection and try again.
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={onRefresh}
        className="bg-blue-600 px-8 py-3 rounded-lg flex-row items-center"
        activeOpacity={0.8}
      >
        <Text className="text-lg mr-2 text-white">🔄</Text>
        <Text className="text-white font-semibold">Refresh Categories</Text>
      </TouchableOpacity>

      {/* Additional Help Text */}
      <Text className="text-sm text-gray-500 mt-6 text-center">
        If the problem persists, please contact support
      </Text>
    </View>
  );
}
