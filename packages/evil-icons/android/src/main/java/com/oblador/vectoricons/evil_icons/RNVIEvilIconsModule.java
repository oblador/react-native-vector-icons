package com.oblador.vectoricons.evil_icons;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIEvilIconsModule extends RNVIEvilIconsSpec {
  public static final String NAME = "RNVIEvilIcons";

  RNVIEvilIconsModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
