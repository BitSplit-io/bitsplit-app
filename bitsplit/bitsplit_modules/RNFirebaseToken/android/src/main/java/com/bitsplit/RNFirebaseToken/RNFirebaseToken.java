package com.bitsplit.RNFirebaseToken;


import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class RNFirebaseToken extends ReactContextBaseJavaModule {

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
        tokenCallback.invoke("WOW THIS IS SO COOL");
    }
}
