package com.reactnativevectoricons.material-icons

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class VectorIconsSpec internal constructor(
    context: ReactApplicationContext,
) : ReactContextBaseJavaModule(context) {
    companion object {
        const val NAME = "VectorIconsMaterialIcons"
    }

    override fun getName(): String = NAME
}
