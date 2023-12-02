package com.reactnativevectoricons.feather;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIFeatherModule extends RNVIFeatherSpec {
  public static final String NAME = "RNVIFeather";

  RNVIFeatherModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
