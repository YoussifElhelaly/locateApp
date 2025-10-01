import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import BackButton from 'components/BackButton.jsx';
import LoadingSpinner from 'components/LoadingSpinner.jsx';
import StoreCard from 'components/StoreCard.jsx';
import { getCategoryStores } from 'features/stores/getCategoryStores';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const CategoryStores = () => {
  const route = useRoute();
  const { categoryId, categoryName } = route.params;
  const navigate = useNavigation();

  const { data: categoryStores, isLoading } = useQuery({
    queryKey: ['categoryStores', categoryId],
    queryFn: () => getCategoryStores(categoryId),
  });

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <View className="flex-row gap-2 items-center mt-5 pb-5">
            <BackButton />
            <Text className="text-lg font-semibold">{categoryName}</Text>
          </View>
          <ScrollView>
            <View className="mt-5 flex gap-2 flex-wrap">
              {categoryStores?.map(store => (
                <StoreCard
                  key={store.store_id}
                  data={store}
                  onPress={() =>
                    navigate.navigate('AllStoreProducts', {
                      storeId: store.store_id,
                      storeName: store.name,
                    })
                  }
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default CategoryStores;
