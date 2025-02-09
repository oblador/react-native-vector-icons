package com.reactnativevectoricons.fontawesome5

import com.facebook.react.bridge.ReactApplicationContext

class VectorIconsModule internal constructor(
    context: ReactApplicationContext,
) : VectorIconsSpec(context) {
    override fun getName(): String = NAME

    companion object {
        const val NAME = "VectorIconsFontAwesome5"
    }
}
