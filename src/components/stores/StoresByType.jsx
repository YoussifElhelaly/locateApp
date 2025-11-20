import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import CategoryComponent from "components/CategoryComponent.jsx";
import LoadingSpinner from "components/LoadingSpinner.jsx";
import { getAllStoresByType } from "features/stores/getAllStores";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function StoresByType({ id, name }) {
    const navigation = useNavigation();

    const { data: stores, isLoading } = useQuery({
        queryKey: ['stores-by-type', id],
        queryFn: () => getAllStoresByType({ id }),
    });

    if (isLoading) {
        return (
            <View className="my-4">
                <Text className="text-xl font-semibold mb-2">{name}</Text>
                <LoadingSpinner />
            </View>
        );
    }

    return (
        <View className="mb-4">
            <View className="flex-row justify-between items-center mb-23">
                <Text className="text-xl font-semibold">{name}</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AllStores', {
                        categoryId: id,
                        typeName: name,
                    })
                }}>
                    <Text className="text-sm font-semibold mb-2 text-mainColor">View All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={stores}
                keyExtractor={(item, index) => item.store_id?.toString() || index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, marginTop: 12 , height:130 }}
                renderItem={({ item }) => (
                    <CategoryComponent
                        img={item.img}
                        text={item.store_name}
                        width={'80px'}
                        onPress={() =>
                            navigation.navigate('AllStoreProducts', {
                                storeId: item.store_id,
                                CategoryId: item.store_id,
                                subCategoryId: item.sub_category_id,
                                typeName: name,
                            })
                        }
                    />
                )}
                ListEmptyComponent={
                    <Text className="text-gray-500 px-2">No stores found</Text>
                }
            />
        </View>
    );
}
