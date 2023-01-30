package com.oblador.vectoricons;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class VectorIconsModule extends ReactContextBaseJavaModule {
    @interface Errors {
        String E_UNKNOWN_ERROR = "E_UNKNOWN_ERROR";
        String E_NOT_IMPLEMENTED = "E_NOT_IMPLEMENTED";
    }

    VectorIconsModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return VectorIconsModuleImpl.NAME;
    }

    @ReactMethod
    public void getImageForFont(String fontFamily, String glyph, Integer fontSize, Integer color, final Promise promise) {
        try {
            String imagePath = VectorIconsModuleImpl.getImageForFont(fontFamily, glyph, fontSize, color, getReactApplicationContext());
            promise.resolve(imagePath);
        } catch (Throwable fail) {
            promise.reject(Errors.E_UNKNOWN_ERROR, fail);
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getImageForFontSync(String fontFamily, String glyph, Integer fontSize, Integer color) {
        try {
            return VectorIconsModuleImpl.getImageForFont(fontFamily, glyph, fontSize, color, getReactApplicationContext());
        } catch (Throwable fail) {
            return null;
        }
    }

    @ReactMethod
    public void loadFontWithFileName(String fontFileName, String extension, Promise promise) {
        promise.reject(Errors.E_NOT_IMPLEMENTED);
    }
}
