package com.reactnativevectoricons.ant_design;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIAntDesignModule extends RNVIAntDesignSpec {
  public static final String NAME = "RNVIAntDesign";

  RNVIAntDesignModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
