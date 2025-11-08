import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "components/LoadingSpinner.jsx";
import { getTopProducts } from "features/products/getTopProducts.js";

import { FlatList, ScrollView, Text, View } from "react-native";
import { ProductCard } from "./AllStoreProducts.jsx";

export default function AllTopProductsScreen() {
  const { data: topProducts, isLoadingProduct } = useQuery({
    queryKey: ["topProducts"],
    queryFn: () => getTopProducts(),
  });

  console.log(topProducts)
  if (isLoadingProduct) {
    return (
      <View className="flex-1 items-center justify-center">
        <LoadingSpinner />
      </View>
    );
  }
  return (
    <ScrollView className="mx-2">
      <View className="my-4">
        <Text className="text-2xl font-semibold">Top Products</Text>
        <FlatList
          horizontal
          data={topProducts}
          keyExtractor={(item, index) => item.store_id?.toString() || index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginTop: 12 }}
          renderItem={({ item }) => (
            <ProductCard product={item} />
          )}
          ListEmptyComponent={
            <Text className="text-gray-500 px-2">No stores found</Text>
          }
        />
      </View>
    </ScrollView>
  )
}