package com.oblador.vectoricons;

import android.content.Context;
import android.graphics.Typeface;
import android.util.Log;

import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.views.text.ReactTextView;
import com.facebook.react.views.text.ReactTextViewManager;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

public class CustomTypefaceTextViewManager extends ReactTextViewManager {

  private static final Map<String, Typeface> sTypefaceCache = new HashMap<String, Typeface>();

  public static final String REACT_CLASS = "RNTypefaceTextView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  public CustomTypefaceTextViewManager() {}

  @ReactProp(name = "fontFile")
  public void setFontFile(ReactTextView view, @Nullable String fontFile) {
    if (fontFile != null) {
      Typeface typeface = this.getOrCreateTypeface(fontFile, view.getContext());
      if (typeface != null) {
        view.setTypeface(typeface);
      }
    }
  }

  private static Typeface getOrCreateTypeface(String fontFile, Context context) {
    if (sTypefaceCache.get(fontFile) != null) {
      return sTypefaceCache.get(fontFile);
    }

    try {
      Typeface typeface = Typeface.createFromAsset(context.getAssets(), fontFile);
      sTypefaceCache.put(fontFile, typeface);
      return typeface;
    } catch (Exception ex) {
      Log.e(REACT_CLASS, "Error: " + ex.toString());
    }
    return null;
  }
}
