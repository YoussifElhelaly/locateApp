import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getCurrentLocation } from 'utils/getLocation';

// Get device screen dimensions
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
// Define initial map area (e.g., San Francisco)
const INITIAL_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922 * ASPECT_RATIO,
};

// Define the marker location
const MARKER_COORDINATE = {
    latitude: 37.785834,
    longitude: -122.406417,
};

const MapComponent = () => {
    async function getUserLocation(){
        const location =  await getCurrentLocation()
        INITIAL_REGION.latitude = location.latitude
        INITIAL_REGION.longitude = location.longitude
    }
    useLayoutEffect(() => {
        getUserLocation()
    }, [])
    return (
        <View style={styles.container}>
            <MapView
                // Use the default map type (standard/normal)
                mapType="standard"
                style={styles.map}
                initialRegion={INITIAL_REGION}
                showsUserLocation={true} // Display blue dot for user's current location
                showsMyLocationButton={true} // Display button to center on user's location
            >
                <Marker
                    coordinate={MARKER_COORDINATE}
                    title={"My Location"}
                    description={"A point of interest"}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:width , 
        height:100 ,             // Map takes up full screen height
        flex:1,   // Map takes up full screen width
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapComponent;