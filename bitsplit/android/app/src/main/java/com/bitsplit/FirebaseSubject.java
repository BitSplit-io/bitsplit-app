package com.bitsplit;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Mt. West on 2018-04-30.
 */

public interface FirebaseSubject {
    List<FirebaseListener> listeners = new ArrayList<>();
    void RegisterListener(FirebaseListener fbListener);
}
