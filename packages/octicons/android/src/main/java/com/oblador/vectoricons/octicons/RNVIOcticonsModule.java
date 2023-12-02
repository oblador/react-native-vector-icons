package com.oblador.vectoricons.octicons;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIOcticonsModule extends RNVIOcticonsSpec {
  public static final String NAME = "RNVIOcticons";

  RNVIOcticonsModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
