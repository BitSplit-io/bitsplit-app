package com.bitsplit;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.ComponentName;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.lang.reflect.Field;
import java.util.Map;

public class FirebaseNotifications extends FirebaseMessagingService {
    private final String TAG = "FirebaseNotifications";

    class ActivityGetter {
        public  Activity getActivity() {
            Class activityThreadClass = null;
            try {
                activityThreadClass = Class.forName("android.app.ActivityThread");
                Object activityThread = activityThreadClass.getMethod("currentActivityThread").invoke(null);
                Field activitiesField = activityThreadClass.getDeclaredField("mActivities");
                activitiesField.setAccessible(true);

                Map<Object, Object> activities = (Map<Object, Object>) activitiesField.get(activityThread);
                if (activities == null) {
                    return null;
                }

                for (Object activityRecord : activities.values()) {
                    Class activityRecordClass = activityRecord.getClass();
                    Field pausedField = activityRecordClass.getDeclaredField("paused");
                    pausedField.setAccessible(true);
                    if (!pausedField.getBoolean(activityRecord)) {
                        Field activityField = activityRecordClass.getDeclaredField("activity");
                        activityField.setAccessible(true);
                        Activity activity = (Activity) activityField.get(activityRecord);
                        return activity;
                    }
                }
            }
            catch (Exception e) {
                e.printStackTrace();
            }

            return null;
        }
    }
    @Override
    public void onMessageReceived(final RemoteMessage var1) {
        MainApplication.receivedRemoteNotification(var1);
        Log.d(TAG, var1.getNotification().getBody());
    }
}
