import { DeviceEventEmitter, AsyncStorage } from 'react-native';
import  currentDeviceToken    from 'RNFirebaseToken';
import  RNFirebaseNotification from 'RNFirebaseNotification';

var notificationCallbacks = [];

const notificationReceived = DeviceEventEmitter.addListener(
    'remoteNotificationReceived',
    (message) => {
        notificationCallbacks.forEach((callback) => callback(message));
    }
);

const deviceTokenChanged = DeviceEventEmitter.addListener(
    'firebaseIdTokenChanged', 
    (token) => {
        AsyncStorage.setItem('@DeviceStore:firebaseIdToken', event.firebaseIdToken);
    }
)

export function onNotificationReceived(callback) {
    notificationCallbacks.push(callback);
}

