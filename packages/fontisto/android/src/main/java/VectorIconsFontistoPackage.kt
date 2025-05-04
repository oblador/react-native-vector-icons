package com.reactnativevectoricons.fontisto

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider

class VectorIconsFontistoPackage : TurboReactPackage() {
    override fun getModule(
        name: String,
        reactContext: ReactApplicationContext,
    ): NativeModule? = null

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider =
        ReactModuleInfoProvider {
            mapOf()
        }
}
