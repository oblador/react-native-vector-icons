package com.reactnativevectoricons.fontisto;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIFontistoModule extends RNVIFontistoSpec {
  public static final String NAME = "RNVIFontisto";

  RNVIFontistoModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
