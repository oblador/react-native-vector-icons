package com.reactnativevectoricons.simple-line-icons

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class VectorIconsSpec internal constructor(
    context: ReactApplicationContext,
) : ReactContextBaseJavaModule(context) {
    companion object {
        const val NAME = "VectorIconsSimpleLineIcons"
    }

    override fun getName(): String = NAME
}
