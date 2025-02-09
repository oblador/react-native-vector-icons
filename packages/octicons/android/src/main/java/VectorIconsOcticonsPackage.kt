package com.reactnativevectoricons.octicons

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class VectorIconsPackage : TurboReactPackage() {
    override fun getModule(
        name: String,
        reactContext: ReactApplicationContext,
    ): NativeModule? =
        if (name == VectorIconsModule.NAME) {
            VectorIconsModule(reactContext)
        } else {
            null
        }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider =
        ReactModuleInfoProvider {
            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
            // val isTurboModule: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            moduleInfos[VectorIconsModule.NAME] =
                ReactModuleInfo(
                    VectorIconsModule.NAME, // name
                    VectorIconsModule.NAME, // className
                    false, // canOverrideExistingModule
                    false, // needsEagerInit
                    false, // hasConstants NOTE: This is deprecated but we need it to keep compatability with RN <= 0.72
                    false, // isCxxModule
                    false, // isTurboModule,
                )
            moduleInfos
        }
}
