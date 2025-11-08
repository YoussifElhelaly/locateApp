import { initializeApp } from '@react-native-firebase/app';
import messaging, { firebase, getToken } from '@react-native-firebase/messaging';
export default async function getFcmToken() {

    try {
        initializeApp()
        // Request user permission (required for iOS)
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            // Get the FCM token

            const fcmToken = await messaging().getToken();
            console.log('FCM Token:', fcmToken);
            return fcmToken;
        }
    } catch (error) {
        console.error('Error getting FCM token:', error);
        return null;
    }
}
