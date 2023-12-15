package com.reactnativevectoricons.ionicons;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIIoniconsModule extends RNVIIoniconsSpec {
  public static final String NAME = "RNVIIonicons";

  RNVIIoniconsModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
