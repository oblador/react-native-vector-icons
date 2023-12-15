package com.reactnativevectoricons.common;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;

import java.io.IOException;
import java.io.FileNotFoundException;

abstract class VectorIconsSpec extends ReactContextBaseJavaModule {
  VectorIconsSpec(ReactApplicationContext context) {
    super(context);
  }

  public abstract void getImageForFont(String fontFamily, String glyph, double fontSize, double color, final Promise promise);
  public abstract String getImageForFontSync(String fontFamily, String glyph, double fontSize, double color) throws IOException, FileNotFoundException;
  public abstract void loadFontWithFileName(String fontFileName, String extension, Promise promise);
}
