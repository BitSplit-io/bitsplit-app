package com.bitsplit;

import android.os.Bundle;
import android.util.Log;

import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

import java.io.IOException;


public class FirebaseIdTokens extends FirebaseInstanceIdService implements FirebaseSubject {
    final String TAG = "FireBaseNotifications";
    static String firebaseIDToken = null;

    public static String getFirebaseIDToken() {
        return firebaseIDToken;
    }


    public void onCreate() {
        super.onCreate();
        //MainApplication.fbInstanceIdTokenRefreshed(FirebaseInstanceId.getInstance().getToken());
        Log.d(TAG, "FBSERVICEINSTANCESTARTED");
    }

    @Override
    public void onTokenRefresh() {
        FirebaseAnalytics fbaInstance = FirebaseAnalytics.getInstance(getApplicationContext());
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();

        firebaseIDToken = refreshedToken;
        MainApplication.fbInstanceIdTokenRefreshed(refreshedToken);

        Bundle analytics = new Bundle();
        Log.d(TAG, "Refreshed token: " + refreshedToken);
        Log.d(TAG, "Creating SendMessage");
        analytics.putString("token", refreshedToken);

        Log.d(TAG, "SENDING MESSAGE");
        fbaInstance.logEvent("token_refreshed", analytics);
        Log.d(TAG, "SEND MESSAGE DONE");
        // Get updated InstanceID token.


        // If you want to send messages to this application instance or
        // manage this apps subscriptions on the server side, send the
        // Instance ID token to your app server.
        //sendRegistrationToServer(refreshedToken);
        for (FirebaseListener fbl : listeners) {
            fbl.onTokenChanged(refreshedToken);
        }
        /*
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        FirebaseInstanceId.getInstance().deleteInstanceId();
                        Log.d(TAG,"DELETED INSTANCEID");
                    } catch (IOException e) {
                        Log.d(TAG,"DELETED INSTANCEID FAILED");
                        e.printStackTrace();
                    }
                }
            }).start();
    */
    }


    @Override
    public void RegisterListener(FirebaseListener fbListener) {
        listeners.add(fbListener);
    }

}