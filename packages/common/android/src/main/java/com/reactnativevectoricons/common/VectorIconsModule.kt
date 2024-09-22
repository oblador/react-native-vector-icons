package com.reactnativevectoricons.common

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import com.facebook.react.util.RNLog
import com.facebook.react.views.text.ReactFontManager

import android.graphics.*

import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class VectorIconsModule internal constructor(context: ReactApplicationContext) :
  VectorIconsSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun getImageForFont(fontFamilyName: String, glyph: String, fontSize: Double, color: Double, promise: Promise) {
    try {
      val imagePath = getImageForFontSync(fontFamilyName, glyph, fontSize, color)
      promise.resolve(imagePath)
    } catch (e: Throwable) {
      promise.reject("Failed to get image for font family \"$fontFamilyName\":${e.message}", e)
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun getImageForFontSync(fontFamilyName: String, glyph: String, fontSize: Double, color: Double): String {
    val context = reactApplicationContext
    val cacheFolder = context.cacheDir
    val cacheFolderPath = "${cacheFolder.absolutePath}/"

    val scale = context.resources.displayMetrics.density
    val scaleSuffix = "@${if (scale == scale.toInt().toFloat()) scale.toInt() else scale}x"
    val size = Math.round(fontSize * scale).toInt()
    val cacheKey = "$fontFamilyName:$glyph:$color"
    val hash = cacheKey.hashCode().toString(32)
    val cacheFilePath = "${cacheFolderPath}${hash}_${fontSize}${scaleSuffix}.png"
    val cacheFileUrl = "file://$cacheFilePath"
    val cacheFile = File(cacheFilePath)

    if (cacheFile.exists()) {
      return cacheFileUrl
    }

    val typeface = ReactFontManager.getInstance().getTypeface(fontFamilyName, Typeface.NORMAL, context.assets)
    if (typeface == Typeface.DEFAULT) {
      RNLog.w(context, "getImageForFontSync: the lookup for $fontFamilyName returned the default typeface, this likely means that the font is not available on the device.")
    }
    val paint =
            Paint().apply {
              this.typeface = typeface
              this.color = color.toInt()
              textSize = size.toFloat()
              isAntiAlias = true
            }
    val textBounds = Rect()
    paint.getTextBounds(glyph, 0, glyph.length, textBounds)

    val offsetX = 0
    val offsetY = size - paint.fontMetrics.bottom.toInt()

    val bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888)
    val canvas = Canvas(bitmap)
    canvas.drawText(glyph, offsetX.toFloat(), offsetY.toFloat(), paint)

    try {
      FileOutputStream(cacheFile).use { fos ->
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos)
        fos.flush()
        return cacheFileUrl
      }
    } catch (e: IOException) {
      // we're rethrowing this as a runtime exception because we can't change the method signature
      // to `throws IOException`
      // that would be at odds with the codegen-generated spec
      throw RuntimeException(e)
    }
  }

  companion object {
    const val NAME = "VectorIcons"
  }
}
