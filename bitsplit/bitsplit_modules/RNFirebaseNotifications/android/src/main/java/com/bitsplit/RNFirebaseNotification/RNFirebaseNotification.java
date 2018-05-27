package com.bitsplit.RNFirebaseNotification;



import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class RNFirebaseNotification extends ReactContextBaseJavaModule {

    boolean initialized = false;
    private final String TAG = "RNFirebaseNotification";
    

    
    @Override
    public void initialize() {
        super.initialize();
        this.initialized = true;
    }

    private ReactContext rnContext;

    @Override
    public String getName() { return "RNFirebaseNotification"; }


    public RNFirebaseNotification(ReactApplicationContext rnContext) {
        super(rnContext);
        this.rnContext = rnContext;
    }
}
