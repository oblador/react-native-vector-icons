package com.oblador.vectoricons.zocial;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIZocialModule extends RNVIZocialSpec {
  public static final String NAME = "RNVIZocial";

  RNVIZocialModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
