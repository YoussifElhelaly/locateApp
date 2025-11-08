import React from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";

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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={initialRegion} mapType="standard">
                {stores.map((store, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: store.lat,
                            longitude: store.long,
                        }}
                        title={store.product_name}
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
                            <View style={{ padding: 6 }}>
                                <Text style={{ fontWeight: "bold" }}>{store.product_name}</Text>
                                <Text>{store.address || "Tap to view products"}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
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
