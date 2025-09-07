// utils/navigationHelper.js
import { Linking, Platform, Alert } from 'react-native';

export const openExternalMaps = (latitude, longitude, label, address) => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const encodedLabel = encodeURIComponent(label || 'Location');

    let url = '';

    if (Platform.OS === 'ios') {
        url = `maps://maps.apple.com/?q=${encodedLabel}&ll=${lat},${lng}`;
    } else {
        url = `geo:${lat},${lng}?q=${lat},${lng}(${encodedLabel})`;
    }

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                // Fallback to web
                const webUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                return Linking.openURL(webUrl);
            }
        })
        .catch((err) => {
            console.error('Error opening maps:', err);
            Alert.alert('Error', 'Could not open maps application');
        });
};

export const openDirections = (latitude, longitude) => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    let url = '';

    if (Platform.OS === 'ios') {
        url = `maps://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
    } else {
        url = `google.navigation:q=${lat},${lng}`;
    }

    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                return Linking.openURL(webUrl);
            }
        })
        .catch((err) => {
            console.error('Error opening directions:', err);
            Alert.alert('Error', 'Could not open navigation application');
        });
};
