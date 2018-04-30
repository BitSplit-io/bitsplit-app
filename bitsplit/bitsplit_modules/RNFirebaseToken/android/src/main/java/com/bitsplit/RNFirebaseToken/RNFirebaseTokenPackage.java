package com.bitsplit.RNFirebaseToken;

import android.os.Debug;
import android.util.Log;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.bitsplit.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class RNFirebaseTokenPackage implements ReactPackage{

    static final String TAG = "RNFirebaseTokenPackage";
    RNFirebaseToken instance = null;

    String token = "NOT A TOKEN";

    public RNFirebaseToken packageInstance() {
        return instance;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        Log.d(TAG, "createReactModules was called");
        this.instance = new RNFirebaseToken(reactContext);
        List<NativeModule> modules = new ArrayList<>();
        modules.add(instance);
        instance.setToken(this.token);
        return modules;
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    public void instanceIdTokenChanged(String refreshedToken) {
        this.instance.instanceIdTokenChanged(refreshedToken);
    }

    public void setToken(String token) {
        this.token = token;
    }
}