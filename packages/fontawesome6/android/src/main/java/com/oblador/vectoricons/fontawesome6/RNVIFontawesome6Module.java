package com.reactnativevectoricons.fontawesome6;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIFontawesome6Module extends RNVIFontawesome6Spec {
  public static final String NAME = "RNVIFontawesome6";

  RNVIFontawesome6Module(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
