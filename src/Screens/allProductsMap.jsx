import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native";

export default function AllProductsMap({ route, navigation }) {
    const { width, height } = Dimensions.get('window');
    const [mapKey, setMapKey] = useState(1); // Add key to force re-render
    const ASPECT_RATIO = width / height;
    const { products } = route.params || {};
    
    console.log('Products received:', products);

    // Safe coordinate parsing
    const parseCoordinate = (coord) => {
        if (!coord) return null;
        const parsed = parseFloat(coord);
        return isNaN(parsed) ? null : parsed;
    };

    // Process products
    const safeProducts = React.useMemo(() => {
        if (!products || !Array.isArray(products)) return [];
        
        return products
            .map(product => {
                const lat = parseCoordinate(product.lat);
                const long = parseCoordinate(product.long);
                
                if (lat && long) {
                    return {
                        ...product,
                        lat,
                        long,
                        id: product.product_id || Math.random().toString()
                    };
                }
                return null;
            })
            .filter(Boolean);
    }, [products]);

    // Force map re-render when component mounts
    useEffect(() => {
        // This helps prevent the "child already has a parent" error
        const timer = setTimeout(() => {
            setMapKey(prev => prev + 1);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    if (!products || products.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No product locations available</Text>
            </View>
        );
    }

    if (safeProducts.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No valid product coordinates found</Text>
            </View>
        );
    }

    const initialRegion = {
        latitude: safeProducts[0]?.lat || 30.0444,
        longitude: safeProducts[0]?.long || 31.2357,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * ASPECT_RATIO,
    };

    return (
        <View style={styles.container}>
            <MapView 
                key={`map-${mapKey}`} // Force re-render with new key
                style={styles.map}   
                mapType="standard"
                initialRegion={initialRegion}
                onMapReady={() => console.log('Map ready')}
                onError={(error) => console.log('Map error:', error)}
            >
                {safeProducts.map((product) => (
                    <Marker
                        key={product.id}
                        coordinate={{
                            latitude: product.lat,
                            longitude: product.long,
                        }}
                        title={product.product_name}
                    >
                        <Callout
                            onPress={() =>
                                navigation.navigate('ProductDetails', { productDetails: product })
                            }
                        >
                            <View style={styles.calloutContainer}>
                                <Image 
                                    source={{ uri: product.pro_img_obj }} 
                                    style={styles.productImage}
                                />
                                <Text style={styles.storeName}>{product.store_name}</Text>
                                <Text>{product.address || "Tap to view products"}</Text>
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
    calloutContainer: {
        padding: 10,
        alignItems: "center",
        minWidth: 150,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 5,
    },
    storeName: {
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 2,
    },
});