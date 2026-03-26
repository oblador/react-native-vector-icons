package com.reactnativevectoricons.get_image

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap

import com.facebook.react.util.RNLog

import android.graphics.*
import com.facebook.react.common.assets.ReactFontManager

import java.io.File
import java.io.FileOutputStream
import java.io.IOException

import kotlin.math.ceil

class VectorIconsModule internal constructor(context: ReactApplicationContext) :
  NativeVectorIconsSpec(context) {

  @ReactMethod
  override fun getImageForFont(glyph: String, options: ReadableMap, promise: Promise) {
    try {
      val result = renderGlyphImage(glyph, options)
      promise.resolve(result)
    } catch (e: Throwable) {
      promise.reject("Failed to get image for font family \"${options.getString("fontFamily")}\":${e.message}", e)
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun getImageForFontSync(glyph: String, options: ReadableMap): WritableMap {
    return renderGlyphImage(glyph, options)
  }

  private fun renderGlyphImage(glyph: String, options: ReadableMap): WritableMap {
    val fontFamilyName = options.getString("fontFamily")!!
    val fontSize = options.getDouble("size")
    val color = options.getDouble("color")
    val lineHeight = options.getDouble("lineHeight")

    val context = reactApplicationContext
    val cacheFolder = context.cacheDir
    val cacheFolderPath = "${cacheFolder.absolutePath}/"

    val scalingFactor = context.resources.displayMetrics.density
    val scaledSize = (fontSize * scalingFactor).toFloat()
    val scaleSuffix = "@${if (scalingFactor % 1 == 0f) scalingFactor.toInt() else scalingFactor}x"
    val cacheKey = "$fontFamilyName:$glyph:$color:$lineHeight"
    val hash = cacheKey.hashCode().toString(32)
    val cacheFilePath = "${cacheFolderPath}${hash}_${fontSize}${scaleSuffix}.png"
    val cacheFileUrl = "file://$cacheFilePath"
    val cacheFile = File(cacheFilePath)

    if (cacheFile.exists()) {
      val opts = BitmapFactory.Options().apply { inJustDecodeBounds = true }
      BitmapFactory.decodeFile(cacheFilePath, opts)
      return Arguments.createMap().apply {
        putString("uri", cacheFileUrl)
        putDouble("width", (opts.outWidth / scalingFactor).toDouble())
        putDouble("height", (opts.outHeight / scalingFactor).toDouble())
        putDouble("scale", scalingFactor.toDouble())
      }
    }

    val typeface = ReactFontManager.getInstance().getTypeface(fontFamilyName, Typeface.NORMAL, context.assets)
    if (typeface == Typeface.DEFAULT) {
      RNLog.w(context, "getImageForFont: the lookup for $fontFamilyName returned the default typeface, this likely means that the font is not available on the device.")
    }

    val paint = Paint().apply {
      this.typeface = typeface
      this.color = color.toInt()
      textSize = scaledSize
      isAntiAlias = true
    }

    val fontMetrics = paint.fontMetrics
    val width = ceil(paint.measureText(glyph)).toInt()
    val scaledLineHeight = if (lineHeight > 0) (lineHeight * scalingFactor).toFloat() else null

    val height = scaledLineHeight?.toInt() ?: ceil(fontMetrics.descent - fontMetrics.ascent).toInt()

    val yBaseline = scaledLineHeight?.let {
      (it - (fontMetrics.descent - fontMetrics.ascent)) / 2f - fontMetrics.ascent
    } ?: -fontMetrics.ascent

    val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
    val canvas = Canvas(bitmap)
    canvas.drawText(glyph, 0f, yBaseline, paint)

    try {
      FileOutputStream(cacheFile).use { fos ->
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos)
      }
    } catch (e: IOException) {
      throw RuntimeException(e)
    }

    return Arguments.createMap().apply {
      putString("uri", cacheFileUrl)
      putDouble("width", (bitmap.width / scalingFactor).toDouble())
      putDouble("height", (bitmap.height / scalingFactor).toDouble())
      putDouble("scale", scalingFactor.toDouble())
    }
  }

  companion object {
    const val NAME = NativeVectorIconsSpec.NAME
  }
}
