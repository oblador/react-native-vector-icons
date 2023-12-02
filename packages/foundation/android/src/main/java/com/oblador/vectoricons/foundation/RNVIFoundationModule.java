package com.reactnativevectoricons.foundation;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIFoundationModule extends RNVIFoundationSpec {
  public static final String NAME = "RNVIFoundation";

  RNVIFoundationModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
