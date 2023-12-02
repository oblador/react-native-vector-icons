package com.reactnativevectoricons.material_icons;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIMaterialIconsModule extends RNVIMaterialIconsSpec {
  public static final String NAME = "RNVIMaterialIcons";

  RNVIMaterialIconsModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
