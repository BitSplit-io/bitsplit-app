package com.bitsplit.RNFirebaseNotification;


import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class RNFirebaseNotification extends ReactContextBaseJavaModule {
    private final String TAG = "RNFirebaseNotification";

    public RNFirebaseNotification(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() { return "RNFirebaseNotification"; }

    public void receivedRemoteNotification(Bundle message) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("remoteNotificationReceived", Arguments.fromBundle(message));
    }
}
