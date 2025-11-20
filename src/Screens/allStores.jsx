import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import CategoryComponent from "components/CategoryComponent.jsx";
import LoadingSpinner from "components/LoadingSpinner.jsx";
import { getAllStoresByType } from "features/stores/getAllStores";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
export default function AllStores({ route,navigation }) {
    const navigate = useNavigation();

    const { categoryId, categoryName, isType } = route.params;
    console.log(categoryId)
    const { data: stores, isLoading } = useQuery({
        queryKey: ['stores-by-type', categoryId],
        queryFn: () => getAllStoresByType(categoryId),
    });
    console.log(stores)
    return (
        <View className="mb-4 flex-1">
            {
                isLoading ? (
                    <LoadingSpinner />
                ) :
                    <>
                        <View className="flex-row items-center justify-between m-4">
                            <Text className="text-xl font-bold text-gray-800">
                                All Stores
                            </Text>
                            <TouchableOpacity onPress={()=>{
                                navigate.navigate("AllStoresMap" , {stores})
                            }}>
                                <Text className="text-sm font-bold text-mainColor ">
                                    View Map
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            className="flex-1"
                            numColumns={4}
                            data={stores}
                            keyExtractor={(item, index) => item.store_id?.toString() || index.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 4, marginTop: 12 }}
                            renderItem={({ item }) => (
                                <CategoryComponent
                                    img={item.img}
                                    text={item.store_name}
                                    width={'80px'}
                                    onPress={() =>
                                        navigation.navigate('AllStoreProducts', {
                                            storeId: item.store_type_id,
                                            CategoryId: item.store_id,
                                            subCategoryId: item.sub_category_id,
                                          
                                        })
                                    }
                                />
                            )}
                            ListEmptyComponent={
                                <Text className="text-gray-500 px-2">No stores found</Text>
                            }
                        />
                    </>
            }
        </View>
    )
}