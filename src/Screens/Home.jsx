import React from "react";
import { FlatList, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllStoresTypes } from "features/stores/getAllStores";
import LoadingSpinner from "components/LoadingSpinner.jsx";
import ScrollableAds from "components/ScrollableAds.jsx";
import StoresByType from "components/stores/StoresByType.jsx";
import CategoryComponent from "components/CategoryComponent.jsx";
import { ProductCard } from "./AllStoreProducts";
import { getTopProducts } from 'features/products/getTopProducts.js'
import { useNavigation } from "@react-navigation/native";
import MapComponent from "components/mapComponent.jsx";
export default function HomeScreen() {
  const navigation = useNavigation();

  const { data: storeTypes, isLoading } = useQuery({
    queryKey: ["storesTypes"],
    queryFn: () => getAllStoresTypes(),
  });
  const { data: topProducts, isLoadingProduct } = useQuery({
    queryKey: ["topProducts"],
    queryFn: () => getTopProducts(),
  });

  console.log(topProducts)

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <ScrollView className="mx-2">
      <View className="border-2 border-mainColor rounded-lg mt-4 overflow-hidden">
        <MapComponent />
      </View>
      <View className="mb-4">
        <Text className="text-2xl font-semibold">Featured Ads</Text>
        <ScrollableAds />
      </View>
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-23">
          <Text className="text-xl font-semibold">{"Top Products"}</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('AllTopProductsScreen', {

            })
          }}>
            <Text className="text-sm font-semibold mb-2 text-mainColor">View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={topProducts}
          keyExtractor={(item, index) => item.store_id?.toString() || index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginTop: 12 }}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={ ()=>{
              navigation.navigate('ProductDetails', { productDetails: item });
            }} />
          )}
          ListEmptyComponent={
            <Text className="text-gray-500 px-2">No stores found</Text>
          }
        />
      </View>
      <FlatList

        data={storeTypes}
        keyExtractor={(item, index) =>
          item.store_type_id?.toString() || index.toString()
        }
        renderItem={({ item }) => (
          <StoresByType id={item.store_type_id} name={item.name} />
        )}
        contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 4 }}
        showsVerticalScrollIndicator={false}
      />

    </ScrollView>
  );
}
