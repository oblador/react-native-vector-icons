package com.reactnativevectoricons.fontawesome6

import com.facebook.react.bridge.ReactApplicationContext

class VectorIconsModule internal constructor(
    context: ReactApplicationContext,
) : VectorIconsSpec(context) {
    override fun getName(): String = NAME

    companion object {
        const val NAME = "VectorIconsFontAwesome6"
    }
}
