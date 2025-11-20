import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import BackButton from 'components/BackButton.jsx';
import CategoryComponent from 'components/CategoryComponent.jsx';
import LoadingSpinner from 'components/LoadingSpinner.jsx';
import { getCategoriesStore } from 'features/stores/getCategoriesStore';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const CategoriesStore = () => {
  const route = useRoute();
  const { storeId, storeName } = route.params;
  const navigate = useNavigation();

  const { data: storeCategories, isLoading } = useQuery({
    queryKey: ['categories-store', storeId],
    queryFn: () => getCategoriesStore(storeId),
  });
  console.log(storeCategories)
  return (
    <>
      {/*  */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <View>
          
          <ScrollView>
            <View className="mt-5 flex-row justify-center gap-2 flex-wrap">
              {storeCategories?.map(category => (
                <CategoryComponent
                  key={category.cat_id}
                  img={category.img}
                  width={115}
                  text={category.name}
                  onPress={() =>
                    navigate.navigate('CategoryStores', {
                      categoryId: category.cat_id,
                      categoryName: category.name,
                    })
                  }
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default CategoriesStore;
