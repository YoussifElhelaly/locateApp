import React from 'react';
import { Text, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { getAllStores } from 'features/stores/getAllStores';
import LoadingSpinner from 'components/LoadingSpinner.jsx';
import ScrollableAds from 'components/ScrollableAds.jsx';
import { useNavigation } from '@react-navigation/native';
import CategoryComponent from 'components/CategoryComponent.jsx';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { data: stores, isLoading } = useQuery({
    queryKey: ['device-type'],
    queryFn: () => getAllStores(),
  });

  return (
    <View className="m-5 flex-1">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-semibold">Main Stores</Text>
          </View>

          <View className="mt-5 flex-row gap-2 flex-wrap mx-auto w-full">
            {stores?.map(store => (
              <CategoryComponent
                key={store.store_type_id}
                img={store.img}
                text={store.name}
                width={'110px'}
                onPress={() =>
                  navigation.navigate('CategoriesStore', {
                    storeId: store.store_type_id,
                    storeName: store.name,
                  })
                }
              />
            ))}
          </View>
          <ScrollableAds />
        </>
      )}
    </View>
  );
}
