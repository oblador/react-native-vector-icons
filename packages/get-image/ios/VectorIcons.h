
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNVectorIconsSpec.h"

@interface VectorIcons : NSObject <NativeVectorIconsSpec>
#else
#import <React/RCTBridgeModule.h>

@interface VectorIcons : NSObject <RCTBridgeModule>
#endif

// - (NSString *)hexStringFromColor:(UIColor *)color;
// - (NSString *)generateFilePath:(NSString *)glyph withFontName:(NSString
// *)fontName
//                                                  withFontSize:(CGFloat)fontSize
//                                                  withColor:(UIColor *)color
//                                                  withExtraIdentifier:(NSString
//                                                  *)identifier;
// - (BOOL)createAndSaveGlyphImage:(NSString *)glyph withFont:(UIFont *)font
//                                                   withFilePath:(NSString
//                                                   *)filePath
//                                                   withColor:(UIColor *)color;
//
@end
