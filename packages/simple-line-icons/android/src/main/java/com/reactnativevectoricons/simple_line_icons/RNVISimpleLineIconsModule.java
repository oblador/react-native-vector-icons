package com.reactnativevectoricons.simple_line_icons;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVISimpleLineIconsModule extends RNVISimpleLineIconsSpec {
  public static final String NAME = "RNVISimpleLineIcons";

  RNVISimpleLineIconsModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
