// components/SubcategoryCard.jsx
import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';

export default function SubcategoryCard({ subcategory }) {
  return (
    <TouchableOpacity>
      <View className="items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100 w-[100]">
        <Image
          className="w-[60] h-[60] rounded-md mb-2"
          source={subcategory.icon}
        />
        <Text className="text-center font-medium text-sm text-gray-700 leading-tight">
          {subcategory.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
