package com.bitsplit;

import android.app.Application;
import android.os.Bundle;
import android.util.Log;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.bitsplit.RNFirebaseNotification.RNFirebaseNotificationPackage;
import com.bitsplit.RNFirebaseToken.RNFirebaseTokenPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.google.firebase.messaging.RemoteMessage;
import com.oblador.vectoricons.VectorIconsPackage;

import org.reactnative.camera.RNCameraPackage;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication{

  static final String TAG = "MAINAPPLICATION";

  static RNFirebaseTokenPackage rnfbPackage = new RNFirebaseTokenPackage();
  static RNFirebaseNotificationPackage rnfbnPackage = new RNFirebaseNotificationPackage();

  static void receivedRemoteNotification(RemoteMessage rMessage) {
    Bundle message = new Bundle();
    message.putString("title", rMessage.getNotification().getTitle());
    message.putString("body", rMessage.getNotification().getBody());
    rnfbnPackage.receivedRemoteNotification(message);
  }

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
          new VectorIconsPackage(),
          new RNFetchBlobPackage(),
          new RNCameraPackage(),
          rnfbnPackage,
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
