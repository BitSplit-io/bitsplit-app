package com.bitsplit;

import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class MainActivity extends ReactActivity {
     /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
     //Initial props used for pass environment
     @Override
     protected ReactActivityDelegate createReactActivityDelegate() {
         return new ReactActivityDelegate(this, getMainComponentName()) {
             @Nullable
             @Override
             protected Bundle getLaunchOptions() {
                 Bundle initialProps = new Bundle(), environment = new Bundle();
                 environment.putBoolean("isEmulator", isEmulator());
                 initialProps.putBundle("environment", environment);
                 return initialProps;
             }
         };
     }

     @Override
    protected String getMainComponentName() {
        return "bitsplit";
    }

    public boolean isEmulator() {
        return Build.FINGERPRINT.startsWith("generic")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86")
                || Build.MANUFACTURER.contains("Genymotion")
                || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
                || "google_sdk".equals(Build.PRODUCT);
    }

}