package com.oblador.vectoricons.entypo;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVIEntypoModule extends RNVIEntypoSpec {
  public static final String NAME = "RNVIEntypo";

  RNVIEntypoModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
