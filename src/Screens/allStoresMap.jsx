import React from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native";

export default function AllStoresMap({ route, navigation }) {
    const { stores } = route.params || {};
    console.log(stores)
    if (!stores || stores.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No store locations available</Text>
            </View>
        );
    }

    // Default to the first store’s coordinates
    const initialRegion = {
        latitude: stores[0]?.lat || 0,
        longitude: stores[0]?.long || 0,

    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={initialRegion} mapType="standard">
                {stores.map((store, index) => {
                        console.log(store)
                    return(
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: store.location.lat,
                            longitude: store.location.long,
                        }}
                        title={store.store_name}
                    >
                        <Callout
                            onPress={() =>
                                navigation.navigate("AllStoreProducts", {
                                    storeId: store.store_type_id,
                                    CategoryId: store.store_id,
                                    subCategoryId: store.sub_category_id,
                                })
                            }
                        >
                            <View className="p-2 items-center">
                                    <Image source={{ uri: store.img }} className="size-20 rounded-full " />

                                <Text style={{ fontWeight: "bold" }}>{store.store_name}</Text>
                                <Text>{store.address || "Tap to view products"}</Text>
                            </View>
                        </Callout>
                    </Marker>
                )})}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
