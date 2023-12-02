package com.oblador.vectoricons.<%= namespace %>;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class RNVI<%= className %>Module extends RNVI<%= className %>Spec {
  public static final String NAME = "RNVI<%= className %>";

  RNVI<%= className %>Module(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
