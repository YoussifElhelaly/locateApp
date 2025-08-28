// components/CategoryCard.jsx
import React from 'react';
import { Image, Text, View } from 'react-native';

export default function CategoryCard({ category, isExpanded }) {
  return (
    <View
      className={`flex-row items-center p-4 bg-white rounded-lg shadow-sm border ${isExpanded ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}
    >
      <Image className="w-[60] h-[60] rounded-md mr-4" source={category.icon} />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800">
          {category.name}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          {category.subcategories.length} subcategories
        </Text>
      </View>
      {/* Dropdown Arrow */}
      <View className={`transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
        <Text className="text-2xl text-gray-400">▼</Text>
      </View>
    </View>
  );
}
