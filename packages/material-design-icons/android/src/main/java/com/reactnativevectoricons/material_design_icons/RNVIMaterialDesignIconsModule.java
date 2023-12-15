package com.reactnativevectoricons.material_design_icons;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIMaterialDesignIconsModule extends RNVIMaterialDesignIconsSpec {
  public static final String NAME = "RNVIMaterialDesignIcons";

  RNVIMaterialDesignIconsModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
