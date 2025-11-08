import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import BackButton from 'components/BackButton.jsx';
import LoadingSpinner from 'components/LoadingSpinner.jsx';
import StoreCard from 'components/StoreCard.jsx';
import { getAllStoresByType } from 'features/stores/getAllStores';
import { getCategoryStores } from 'features/stores/getCategoryStores';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const CategoryStores = () => {
  const route = useRoute();
  const { categoryId, categoryName, isType } = route.params;
  const navigate = useNavigation();

  const { data: categoryStores, isLoading } = useQuery({
    queryKey: ['categoryStores', categoryId, categoryName],
    queryFn: () => {
      if (isType) {
        return getAllStoresByType(categoryId)

      } else {

        return getCategoryStores(categoryId)
      }
    },
  });

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>

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
