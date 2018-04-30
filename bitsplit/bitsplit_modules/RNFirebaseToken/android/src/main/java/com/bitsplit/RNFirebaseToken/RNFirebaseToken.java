package com.bitsplit.RNFirebaseToken;


import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class RNFirebaseToken extends ReactContextBaseJavaModule {

    boolean initialized = false;
    private final String TAG = "RNFirebaseToken";
    private String fbInstanceIdToken = null;


    public void setToken(String token) {
        this.fbInstanceIdToken = token;

        if (fbInstanceIdToken != null && initialized) {
            Log.d(TAG, "SENDING TOKEN TO JS: " + token);
            Bundle arguments = new Bundle();
            WritableMap map = Arguments.createMap();
            map.putString("firebaseIdToken", fbInstanceIdToken);
            System.out.println("SENDINF TOKEN TO JS: " + fbInstanceIdToken);
            sendEvent(rnContext, "firebaseIdTokenChanged", map);
        }


    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public void initialize() {
        super.initialize();
        this.initialized = true;
    }

    private ReactContext rnContext;

    @Override
    public String getName() { return "RNFirebaseToken"; }


    public RNFirebaseToken(ReactApplicationContext rnContext) {
        super(rnContext);
        this.rnContext = rnContext;
    }

    @ReactMethod
    public void currentDeviceToken(Callback tokenCallback) {
        Log.d("!!!!!!!!!!!!!!!!!", "=======================================================================================");
        tokenCallback.invoke((fbInstanceIdToken == null ? "WAS NULL": fbInstanceIdToken));
    }

    public void instanceIdTokenChanged(String refreshedToken) {
    }

}
