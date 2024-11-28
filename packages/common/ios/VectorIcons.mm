#import "VectorIcons.h"

#import <CoreText/CoreText.h>
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTFont.h>
#import <React/RCTUtils.h>

NSString *const RNVIErrorDomain = @"com.reactnativevectoricons.common";
enum {
  RNVIGenericError = 1000,
};

@implementation VectorIcons
RCT_EXPORT_MODULE()

- (NSString *)hexStringFromColor:(UIColor *)color {
  const CGFloat *components = CGColorGetComponents(color.CGColor);

  CGFloat r = components[0];
  CGFloat g = components[1];
  CGFloat b = components[2];

  return [NSString stringWithFormat:@"#%02lX%02lX%02lX", lroundf(r * 255),
                                    lroundf(g * 255), lroundf(b * 255)];
}

- (NSString *)generateFilePath:(NSString *)glyph
                  withFontName:(NSString *)fontName
                  withFontSize:(CGFloat)fontSize
                     withColor:(UIColor *)color
           withExtraIdentifier:(NSString *)identifier {
  CGFloat screenScale = RCTScreenScale();
  NSString *hexColor = [self hexStringFromColor:color];
  NSString *fileName =
      [NSString stringWithFormat:@"%@RNVectorIcons_%@_%@_%@_%.f%@@%.fx.png",
                                 NSTemporaryDirectory(), identifier, fontName,
                                 glyph, fontSize, hexColor, screenScale];

  return fileName;
}

- (BOOL)createAndSaveGlyphImage:(NSString *)glyph
                       withFont:(UIFont *)font
                   withFilePath:(NSString *)filePath
                      withColor:(UIColor *)color {
  if (![[NSFileManager defaultManager] fileExistsAtPath:filePath]) {
    // No cached icon exists, we need to create it and persist to disk

    NSAttributedString *attributedString =
        [[NSAttributedString alloc] initWithString:glyph
                                        attributes:@{
                                          NSFontAttributeName : font,
                                          NSForegroundColorAttributeName : color
                                        }];

    CGSize iconSize = [attributedString size];
    UIGraphicsBeginImageContextWithOptions(iconSize, NO, 0.0);
    [attributedString drawAtPoint:CGPointMake(0, 0)];

    UIImage *iconImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();

    NSData *imageData = UIImagePNGRepresentation(iconImage);
    return [imageData writeToFile:filePath atomically:YES];
  }

  return YES;
}

- (NSString *)createGlyphImagePathForFont:(NSString *)fontName
                                withGlyph:(NSString *)glyph
                             withFontSize:(CGFloat)fontSize
                                withColor:(double)color
                                withError:(NSError **)error {
  UIColor *parsedColor = [RCTConvert UIColor:@(color)];
  UIFont *font = [UIFont fontWithName:fontName size:fontSize];
  if (!font) {
    *error = [NSError errorWithDomain:RNVIErrorDomain
                                 code:RNVIGenericError
                             userInfo:@{
      NSLocalizedDescriptionKey: [NSString stringWithFormat:@"No font found for font name \"%@\". Make sure the font is included in info.plist.", fontName]
    }];
    return nil;
  }
  NSString *filePath = [self generateFilePath:glyph
                                 withFontName:fontName
                                 withFontSize:fontSize
                                    withColor:parsedColor
                          withExtraIdentifier:@""];

  BOOL success = [self createAndSaveGlyphImage:glyph
                                      withFont:font
                                  withFilePath:filePath
                                     withColor:parsedColor];

  if (!success) {
    *error = [NSError errorWithDomain:RNVIErrorDomain
                                 code:RNVIGenericError
                             userInfo:@{
                               NSLocalizedDescriptionKey :
                                   @"Failed to write rendered icon image"
                             }];
    return nil;
  }
  return filePath;
}

RCT_EXPORT_METHOD(getImageForFont
                  : (NSString *)fontName glyph
                  : (NSString *)glyph fontSize
                  : (CGFloat)fontSize color
                  : (double)color resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  NSError *error = nil;
  NSString *filePath = [self createGlyphImagePathForFont:fontName
                                               withGlyph:glyph
                                            withFontSize:fontSize
                                               withColor:color
                                               withError:&error];
  if (error != nil) {
    reject([NSString stringWithFormat:@"%ld", (long)error.code],
           error.localizedDescription, error);
  } else {
    resolve(filePath);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getImageForFontSync
                                       : (NSString *)fontName glyph
                                       : (NSString *)glyph fontSize
                                       : (CGFloat)fontSize color
                                       : (double)color) {
  NSError *error = nil;
  NSString* glyphImage = [self createGlyphImagePathForFont:fontName
                                 withGlyph:glyph
                              withFontSize:fontSize
                                 withColor:color
                                 withError:&error];
  if (error == nil && glyphImage != nil) {
    return glyphImage;
  } else {
    NSString *reason = error ? error.localizedDescription : @"Failed to create glyph image";

    @throw [NSException exceptionWithName:@"RNVectorIconsException"
                                   reason:reason
                                 userInfo:nil];
  }
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeVectorIconsSpecJSI>(params);
}
#endif

@end
