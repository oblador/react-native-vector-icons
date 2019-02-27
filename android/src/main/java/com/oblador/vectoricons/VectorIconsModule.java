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
import com.facebook.react.views.text.ReactFontManager;

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
  public void getImageForFont(String fontFamily, String glyph, Integer fontSize, Integer color, Callback callback) {
    Context context = getReactApplicationContext();
    File cacheFolder = context.getCacheDir();
    String cacheFolderPath = cacheFolder.getAbsolutePath() + "/";

    float scale = context.getResources().getDisplayMetrics().density;
    String scaleSuffix = "@" + (scale == (int) scale ? Integer.toString((int) scale) : Float.toString(scale)) + "x";
    int size = Math.round(fontSize*scale);
    String cacheKey = fontFamily + ":" + glyph + ":" + color;
    String hash = Integer.toString(cacheKey.hashCode(), 32);
    String cacheFilePath = cacheFolderPath + hash + "_" + Integer.toString(fontSize) + scaleSuffix + ".png";
    String cacheFileUrl = "file://" + cacheFilePath;
    File cacheFile = new File(cacheFilePath);

    if(cacheFile.exists()) {
      callback.invoke(null, cacheFileUrl);
    } else {
      FileOutputStream fos = null;
      Typeface typeface = ReactFontManager.getInstance().getTypeface(fontFamily, 0, context.getAssets());
      Paint paint = new Paint();
      paint.setTypeface(typeface);
      paint.setColor(color);
      paint.setTextSize(size);
      paint.setAntiAlias(true);
      Rect textBounds = new Rect();
      paint.getTextBounds(glyph, 0, glyph.length(), textBounds);

      int offsetX = 0;
      int offsetY = size - (int) paint.getFontMetrics().bottom;

      Bitmap bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
      Canvas canvas = new Canvas(bitmap);
      canvas.drawText(glyph, offsetX, offsetY, paint);

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

}
