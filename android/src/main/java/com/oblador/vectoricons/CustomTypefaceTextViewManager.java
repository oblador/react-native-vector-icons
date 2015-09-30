package com.oblador.vectoricons;

import android.graphics.Typeface;

import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.views.text.ReactTextView;
import com.facebook.react.views.text.ReactTextViewManager;

import java.util.Map;

import javax.annotation.Nullable;

public class CustomTypefaceTextViewManager extends ReactTextViewManager {

  public static final String REACT_CLASS = "RNTypefaceTextView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  public CustomTypefaceTextViewManager() {}

  @ReactProp(name = "fontFile")
  public void setFontFile(ReactTextView view, @Nullable String fontFile) {
    if (fontFile != null) {
      Typeface typeface = VectorIconsModule.getOrCreateTypeface(fontFile, view.getContext());
      if (typeface != null) {
        view.setTypeface(typeface);
      }
    }
  }
}
