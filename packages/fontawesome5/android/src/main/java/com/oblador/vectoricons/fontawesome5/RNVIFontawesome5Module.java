package com.oblador.vectoricons.fontawesome5;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIFontawesome5Module extends RNVIFontawesome5Spec {
  public static final String NAME = "RNVIFontawesome5";

  RNVIFontawesome5Module(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
