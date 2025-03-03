package com.reactnativevectoricons.fontawesome5-pro

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class VectorIconsSpec internal constructor(
    context: ReactApplicationContext,
) : ReactContextBaseJavaModule(context) {
    companion object {
        const val NAME = "VectorIconsFontAwesome5Pro"
    }

    override fun getName(): String = NAME
}
