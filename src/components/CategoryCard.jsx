// components/CategoryCard.jsx
import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';

export default function CategoryCard({ category, isExpanded, isLoading }) {
  const defaultImage =
    'https://locate.shinefy.co/design/admin/assets/media/no_image.jpg';

  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <View className="flex-row items-center p-4">
        {/* Category Image */}
        <View className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 mr-4">
          <Image
            source={{ uri: category.img || defaultImage }}
            className="w-full h-full"
            resizeMode="cover"
            defaultSource={{ uri: defaultImage }}
          />
        </View>

        {/* Category Info */}
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            {category.name}
          </Text>

          {/* Category badges */}
          <View className="flex-row items-center space-x-2">
            {category.is_top === 1 && (
              <View className="bg-blue-100 px-2 py-1 rounded-full">
                <Text className="text-xs font-medium text-blue-600">
                  ⭐ Top
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Expand/Collapse Indicator */}
        <View className="ml-2">
          {isLoading ? (
            <ActivityIndicator size="small" color="#3B82F6" />
          ) : (
            <View className="w-8 h-8 items-center justify-center">
              <Text className="text-xl text-gray-600">
                {isExpanded ? '▲' : '▼'}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Expanded indicator bar */}
      {isExpanded && <View className="h-1 bg-blue-500" />}
    </View>
  );
}
