import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
  StyleSheet,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';

const MapLocationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  const [region, setRegion] = useState({
    latitude: parseFloat(product.lat) || 37.78825,
    longitude: parseFloat(product.long) || -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    navigation.setOptions({
      title: product.store_name,
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#333',
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation, product.store_name]);

  const openInExternalMaps = () => {
    const latitude = parseFloat(product.lat);
    const longitude = parseFloat(product.long);
    const label = encodeURIComponent(product.store_name);

    let url = '';
    if (Platform.OS === 'ios') {
      url = `maps://maps.apple.com/?q=${label}&ll=${latitude},${longitude}`;
    } else {
      url = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`;
    }

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          const webUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          return Linking.openURL(webUrl);
        }
      })
      .catch(err => {
        console.error('Error opening maps:', err);
        Alert.alert('Error', 'Could not open maps application');
      });
  };

  const openDirections = () => {
    const latitude = parseFloat(product.lat);
    const longitude = parseFloat(product.long);

    let url = '';
    if (Platform.OS === 'ios') {
      url = `maps://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`;
    } else {
      url = `google.navigation:q=${latitude},${longitude}`;
    }

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
          return Linking.openURL(webUrl);
        }
      })
      .catch(err => {
        console.error('Error opening directions:', err);
        Alert.alert('Error', 'Could not open navigation application');
      });
  };

  return (
    <View style={styles.container}>
      {/* Google Maps with proper configuration */}
      <MapView
        style={styles.map}
        // provider={PROVIDER_GOOGLE} // This will now work with proper setup
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        mapType="standard" // Options: 'standard', 'satellite', 'hybrid', 'terrain'
        loadingEnabled={true}
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
      >
        <Marker
          coordinate={{
            latitude: parseFloat(product.lat),
            longitude: parseFloat(product.long),
          }}
          title={product.store_name}
          description={product.address}
          pinColor="red"
        />
      </MapView>

      {/* Store Information Card */}
      <View style={styles.infoCard}>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{product.store_name}</Text>
          <Text style={styles.address}>{product.address}</Text>
          <Text style={styles.productInfo}>
            Product: {product.product_name}
          </Text>
          <Text style={styles.price}>
            {product.product_item_price_after_discount ||
              product.product_item_price}{' '}
            EGP
          </Text>
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.directionsButton}
            onPress={openDirections}
          >
            <Text style={styles.buttonText}>🧭 Get Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mapsButton}
            onPress={openInExternalMaps}
          >
            <Text style={styles.buttonText}>📱 Open in Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.additionalButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.callButtonText}>← Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>📞 Call Store</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  storeInfo: {
    marginBottom: 16,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  address: {
    color: '#6B7280',
    marginBottom: 8,
  },
  productInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginTop: 4,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  directionsButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  mapsButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  additionalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  callButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  backButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  callButtonText: {
    color: '#374151',
    textAlign: 'center',
  },
});

export default MapLocationScreen;
