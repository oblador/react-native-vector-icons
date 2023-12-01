package com.oblador.vectoricons.<%= shortName %>;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;

import java.util.HashMap;

public class <%= className %>VectorIconsPackage extends TurboReactPackage {
  @Nullable
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
      return null;
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return () -> new HashMap<>();
  }
}
