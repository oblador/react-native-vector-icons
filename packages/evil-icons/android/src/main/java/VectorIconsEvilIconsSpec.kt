package com.reactnativevectoricons.evil-icons

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class VectorIconsSpec internal constructor(
    context: ReactApplicationContext,
) : ReactContextBaseJavaModule(context) {
    companion object {
        const val NAME = "VectorIconsEvilIcons"
    }

    override fun getName(): String = NAME
}
