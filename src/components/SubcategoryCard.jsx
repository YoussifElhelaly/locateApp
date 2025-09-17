// components/SubcategoryCard.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function SubcategoryCard({ subcategory, onPress }) {
  const defaultImage =
    'https://stores.altarekit.com/design/admin/assets/media/no_image.jpg';

  return (
    <TouchableOpacity
      onPress={() => onPress?.(subcategory)}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
      style={{ width: 100 }}
      activeOpacity={0.8}
    >
      {/* Subcategory Image */}
      <View className="w-full h-20 bg-gray-50">
        <Image
          source={{ uri: subcategory.img || defaultImage }}
          className="w-full h-full"
          resizeMode="cover"
          defaultSource={{ uri: defaultImage }}
        />
      </View>

      {/* Subcategory Info */}
      <View className="p-3">
        <Text
          className="text-sm font-medium text-gray-900 text-center"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {subcategory.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
