package com.reactnativevectoricons.common;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.views.text.ReactFontManager;

import android.content.Context;
import android.graphics.Paint;
import android.graphics.Canvas;
import android.graphics.Typeface;
import android.graphics.Rect;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

public class VectorIconsModule extends VectorIconsSpec {
  public static final String NAME = "VectorIcons";

  @interface Errors {
    String E_UNKNOWN_ERROR = "E_UNKNOWN_ERROR";
    String E_NOT_IMPLEMENTED = "E_NOT_IMPLEMENTED";
  }

  private static final Map<String, Typeface> sTypefaceCache = new HashMap<String, Typeface>();

  VectorIconsModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void loadFontWithFileName(String fontFileName, String extension, Promise promise) {
    promise.reject(Errors.E_NOT_IMPLEMENTED);
  }

  @ReactMethod
  public void getImageForFont(String fontFamily, String glyph, double fontSize, double color, final Promise promise) {
    try {
      String imagePath = getImageForFontSync(fontFamily, glyph, fontSize, color);
      promise.resolve(imagePath);
    } catch (Throwable fail) {
       promise.reject(Errors.E_UNKNOWN_ERROR, fail);
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String getImageForFontSync(String fontFamily, String glyph, double fontSizeD, double colorD) throws IOException, FileNotFoundException {
    Context context = getReactApplicationContext();
    File cacheFolder = context.getCacheDir();
    String cacheFolderPath = cacheFolder.getAbsolutePath() + "/";

    int fontSize = (int)fontSizeD;
    int color = (int)colorD;

    float scale = context.getResources().getDisplayMetrics().density;
    String scaleSuffix = "@" + (scale == (int) scale ? Integer.toString((int) scale) : Float.toString(scale)) + "x";
    int size = Math.round(fontSize*scale);
    String cacheKey = fontFamily + ":" + glyph + ":" + color;
    String hash = Integer.toString(cacheKey.hashCode(), 32);
    String cacheFilePath = cacheFolderPath + hash + "_" + Integer.toString(fontSize) + scaleSuffix + ".png";
    String cacheFileUrl = "file://" + cacheFilePath;
    File cacheFile = new File(cacheFilePath);

    if(cacheFile.exists()) {
      return cacheFileUrl;
    }

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

      return cacheFileUrl;
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
