package com.oblador.vectoricons;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class VectorIconsModule extends NativeRNVectorIconsSpec {
    @interface Errors {
        String E_UNKNOWN_ERROR = "E_UNKNOWN_ERROR";
        String E_NOT_IMPLEMENTED = "E_NOT_IMPLEMENTED";
    }

    VectorIconsModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    @NonNull
    public String getName() {
        return VectorIconsModuleImpl.NAME;
    }

    @Override
    public void getImageForFont(String fontFamily, String glyph, double fontSize, double color, final Promise promise) {
        try {
            String imagePath = VectorIconsModuleImpl.getImageForFont(fontFamily, glyph, (int)fontSize, (int)color, getReactApplicationContext());
            promise.resolve(imagePath);
        } catch (Throwable fail) {
            promise.reject(Errors.E_UNKNOWN_ERROR, fail);
        }
    }

    @Override
    public String getImageForFontSync(String fontFamily, String glyph, double fontSize, double color) {
        try {
            return VectorIconsModuleImpl.getImageForFont(fontFamily, glyph, (int)fontSize, (int)color, getReactApplicationContext());
        } catch (Throwable fail) {
            return null;
        }
    }

    @Override
    public void loadFontWithFileName(String fontFileName, String extension, Promise promise) {
        promise.reject(Errors.E_NOT_IMPLEMENTED);
    }
}
