package com.bitsplit;

import android.app.Application;
import android.app.Service;
import android.util.Log;

import com.bitsplit.RNFirebaseToken.RNFirebaseTokenPackage;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.iid.FirebaseInstanceId;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication{

  static final String TAG = "MAINAPPLICATION";

  static RNFirebaseTokenPackage rnfbPackage = new RNFirebaseTokenPackage();

  static void fbInstanceIdTokenRefreshed(String fbToken) {
        Log.d(TAG, "FirebaseIdTokens ID token set!");
            rnfbPackage.setToken(fbToken);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            rnfbPackage
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
