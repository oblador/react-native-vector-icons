
#ifdef RCT_NEW_ARCH_ENABLED
#import "VectorIconsSpec.h"

@interface VectorIcons : NSObject <NativeVectorIconsSpec>
#else
#import <React/RCTBridgeModule.h>

@interface VectorIcons : NSObject <RCTBridgeModule>
#endif

FOUNDATION_EXPORT NSString *const RNVIErrorDomain;

enum {
  RNVIGenericError = 1000,
};


- (NSString *)hexStringFromColor:(UIColor *)color;
- (NSString *)generateFilePath:(NSString *)glyph withFontName:(NSString *)fontName
                                                 withFontSize:(CGFloat)fontSize
                                                 withColor:(UIColor *)color
                                                 withExtraIdentifier:(NSString *)identifier;
- (BOOL)createAndSaveGlyphImage:(NSString *)glyph withFont:(UIFont *)font
                                                  withFilePath:(NSString *)filePath
                                                  withColor:(UIColor *)color;

@end
