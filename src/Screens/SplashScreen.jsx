import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-4">Locate</Text>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text className="text-gray-600 mt-2">Loading...</Text>
    </View>
  );
}
