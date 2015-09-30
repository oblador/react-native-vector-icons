package com.oblador.vectoricons;

import android.content.Context;
import android.graphics.Paint;
import android.graphics.Canvas;
import android.graphics.Typeface;
import android.graphics.Rect;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

public class VectorIconsModule extends ReactContextBaseJavaModule {

  private static final Map<String, Typeface> sTypefaceCache = new HashMap<String, Typeface>();

  public static final String REACT_CLASS = "RNVectorIconsModule";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  public VectorIconsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  public void getImageForFont(String fontFile, String glyph, Integer fontSize, Integer color, Callback callback) {
    Context context = getReactApplicationContext();
    File cacheFolder = context.getCacheDir();
    String cacheFolderPath = cacheFolder.getAbsolutePath() + "/";

    float scale = context.getResources().getDisplayMetrics().density;
    int size = Math.round(fontSize*scale);
    String cacheKey = fontFile + ":" + glyph + ":" + color;
    String hash = Integer.toString(cacheKey.hashCode(), 32);
    String cacheFilePath = cacheFolderPath + hash + "_" + Integer.toString(size) + ".png";
    String cacheFileUrl = "file://" + cacheFilePath;
    File cacheFile = new File(cacheFilePath);

    if(cacheFile.exists()) {
      callback.invoke(null, cacheFileUrl);
    } else {
      FileOutputStream fos = null;
      Typeface typeface = this.getOrCreateTypeface(fontFile, context);
      Paint paint = new Paint();
      paint.setTypeface(typeface);
      paint.setColor(color);
      paint.setTextSize(size);
      paint.setAntiAlias(true);
      Rect textBounds = new Rect();
      paint.getTextBounds(glyph, 0, glyph.length(), textBounds);

      Bitmap bitmap = Bitmap.createBitmap(textBounds.width(), textBounds.height(), Bitmap.Config.ARGB_8888);
      Canvas canvas = new Canvas(bitmap);
      canvas.drawText(glyph, -textBounds.left, -textBounds.top, paint);

      try {
        fos = new FileOutputStream(cacheFile);
        bitmap.compress(CompressFormat.PNG, 100, fos);
        fos.flush();
        fos.close();
        fos = null;

        callback.invoke(null, cacheFileUrl);
      } catch (FileNotFoundException e) {
        callback.invoke(e.getMessage());
      } catch (IOException e) {
        callback.invoke(e.getMessage());
      }
      finally {
        if (fos != null) {
          try {
            fos.close();
            fos = null;
          }
          catch (IOException e) {
            e.printStackTrace();
          }
        }
      }
    }
  }

  public static Typeface getOrCreateTypeface(String fontFile, Context context) {
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
