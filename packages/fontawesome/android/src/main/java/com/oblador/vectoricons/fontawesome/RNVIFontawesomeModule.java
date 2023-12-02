package com.oblador.vectoricons.fontawesome;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIFontawesomeModule extends RNVIFontawesomeSpec {
  public static final String NAME = "RNVIFontawesome";

  RNVIFontawesomeModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
