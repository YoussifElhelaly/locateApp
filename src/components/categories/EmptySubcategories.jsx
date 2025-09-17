// components/EmptySubcategories.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function EmptySubcategories({ categoryName, onRefresh }) {
  return (
    <View className="items-center py-8 px-4">
      {/* Empty State Icon - Using styled element instead */}
      <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4 border-2 border-gray-200">
        <Text className="text-2xl text-gray-400">📦</Text>
      </View>

      {/* Empty State Content */}
      <View className="items-center mb-6">
        <Text className="text-lg font-semibold text-gray-900 mb-2 text-center">
          No Subcategories
        </Text>
        <Text className="text-sm text-gray-600 text-center leading-5">
          "{categoryName}" doesn't have any subcategories yet.
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={onRefresh}
        className="bg-gray-600 px-6 py-2 rounded-lg flex-row items-center"
        activeOpacity={0.8}
      >
        <Text className="text-sm mr-2 text-white">🔄</Text>
        <Text className="text-white font-medium text-sm">Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}
