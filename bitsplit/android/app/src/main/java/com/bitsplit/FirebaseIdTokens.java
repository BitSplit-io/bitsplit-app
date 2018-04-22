package com.bitsplit;

import android.os.Bundle;
import android.util.Log;

import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;



public class FirebaseIdTokens extends FirebaseInstanceIdService {
    final String TAG = "FireBaseNotifications";

    @Override
    public void onTokenRefresh() {
        FirebaseAnalytics fbaInstance = FirebaseAnalytics.getInstance(getApplicationContext());
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG, "Refreshed token: " + refreshedToken);
        Bundle analytics = new Bundle();
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
    }


}