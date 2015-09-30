package com.oblador.vectoricons;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class VectorIconsPackage implements ReactPackage {

  public VectorIconsPackage() {}

  @Override
  public List<NativeModule> createNativeModules(
      ReactApplicationContext reactContext) {
    return new ArrayList<>();
  }

  @Override
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(
        new CustomTypefaceTextViewManager()
    );
  }
}
