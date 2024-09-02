package com.reactnativevectoricons.common;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.util.RNLog;
import com.facebook.react.views.text.ReactFontManager;

import android.graphics.Paint;
import android.graphics.Canvas;
import android.graphics.Typeface;
import android.graphics.Rect;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class VectorIconsModule extends NativeVectorIconsSpec {

  @interface Errors {
    String E_UNKNOWN_ERROR = "E_UNKNOWN_ERROR";
  }

  VectorIconsModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public void getImageForFont(String fontFamily, String glyph, double fontSize, double color, final Promise promise) {
    try {
      String imagePath = getImageForFontSync(fontFamily, glyph, fontSize, color);
      promise.resolve(imagePath);
    } catch (Throwable fail) {
      promise.reject(Errors.E_UNKNOWN_ERROR, "Failed to get image for font family \"" + fontFamily + "\":" + fail.getMessage(), fail);
    }
  }

  @Override
  public String getImageForFontSync(String fontFamily, String glyph, double fontSizeD, double colorD) {
    ReactApplicationContext context = getReactApplicationContext();
    File cacheFolder = context.getCacheDir();
    String cacheFolderPath = cacheFolder.getAbsolutePath() + "/";

    int fontSize = (int)fontSizeD;
    int color = (int)colorD;

    float scale = context.getResources().getDisplayMetrics().density;
    String scaleSuffix = "@" + (scale == (int) scale ? Integer.toString((int) scale) : Float.toString(scale)) + "x";
    int size = Math.round(fontSize*scale);
    String cacheKey = fontFamily + ":" + glyph + ":" + color;
    String hash = Integer.toString(cacheKey.hashCode(), 32);
    String cacheFilePath = cacheFolderPath + hash + "_" + fontSize + scaleSuffix + ".png";
    String cacheFileUrl = "file://" + cacheFilePath;
    File cacheFile = new File(cacheFilePath);

    if(cacheFile.exists()) {
      return cacheFileUrl;
    }

    Typeface typeface = ReactFontManager.getInstance().getTypeface(fontFamily, Typeface.NORMAL, context.getAssets());
    if (typeface == Typeface.DEFAULT) {
      RNLog.w(context, "getImageForFontSync: the lookup for " + fontFamily + " returned the default typeface, this likely means that the font is not available on the device.");
    }
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

    try (FileOutputStream fos = new FileOutputStream(cacheFile)) {
      bitmap.compress(CompressFormat.PNG, 100, fos);
      fos.flush();
      return cacheFileUrl;
    } catch (IOException e) {
      // we're rethrowing this as a runtime exception because we can't change the method signature to `throws IOException`
      // that would be at odds with the codegen-generated spec
      throw new RuntimeException(e);
    }
  }
}
