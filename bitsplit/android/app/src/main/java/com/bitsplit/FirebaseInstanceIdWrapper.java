package com.bitsplit;

import com.google.firebase.iid.FirebaseInstanceId;


public class FirebaseInstanceIdWrapper {
    FirebaseInstanceId instace = null;
    public void setInstance(FirebaseInstanceId instance) {
        this.instace = instance;
    }
}