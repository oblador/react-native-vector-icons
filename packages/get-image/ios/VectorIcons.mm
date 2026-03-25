#import "VectorIcons.h"

#import <CoreText/CoreText.h>
#import <ImageIO/ImageIO.h>
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTFont.h>
#import <React/RCTUtils.h>

NSString *const RNVIErrorDomain = @"com.reactnativevectoricons.get_image";
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
                withLineHeight:(CGFloat)lineHeight {
  CGFloat screenScale = RCTScreenScale();
  NSString *hexColor = [self hexStringFromColor:color];
  NSString *fileName =
      [NSString stringWithFormat:@"%@RNVectorIcons_%@_%@_%.f%@_lh%.f@%.fx.png",
                                 NSTemporaryDirectory(), fontName,
                                 glyph, fontSize, hexColor, lineHeight, screenScale];

  return fileName;
}

- (NSDictionary *)createGlyphImageForGlyph:(NSString *)glyph
                               withOptions:(NSDictionary *)options
                                 withError:(NSError **)error {
  NSString *fontName = options[@"fontFamily"];
  CGFloat fontSize = [options[@"size"] doubleValue];
  double color = [options[@"color"] doubleValue];
  NSNumber *lineHeightNum = options[@"lineHeight"];
  double lineHeight = lineHeightNum ? [lineHeightNum doubleValue] : -1.0;

  UIColor *parsedColor = [RCTConvert UIColor:@(color)];

  NSString *filePath = [self generateFilePath:glyph
                                 withFontName:fontName
                                 withFontSize:fontSize
                                    withColor:parsedColor
                               withLineHeight:lineHeight];

  CGFloat screenScale = RCTScreenScale();

  if ([[NSFileManager defaultManager] fileExistsAtPath:filePath]) {
    CGImageSourceRef source = CGImageSourceCreateWithURL(
        (__bridge CFURLRef)[NSURL fileURLWithPath:filePath], NULL);
    if (source) {
      NSDictionary *properties = (__bridge_transfer NSDictionary *)
          CGImageSourceCopyPropertiesAtIndex(source, 0, NULL);
      CFRelease(source);
      CGFloat pixelWidth = [properties[(__bridge NSString *)kCGImagePropertyPixelWidth] doubleValue];
      CGFloat pixelHeight = [properties[(__bridge NSString *)kCGImagePropertyPixelHeight] doubleValue];
      return @{
        @"uri" : filePath,
        @"width" : @(pixelWidth / screenScale),
        @"height" : @(pixelHeight / screenScale),
        @"scale" : @(screenScale)
      };
    }
  }

  UIFont *font = [UIFont fontWithName:fontName size:fontSize];
  if (!font) {
    *error = [NSError
        errorWithDomain:RNVIErrorDomain
                   code:RNVIGenericError
               userInfo:@{
                 NSLocalizedDescriptionKey :
                     [NSString stringWithFormat:
                                   @"No font found for font name \"%@\". Make "
                                   @"sure the font is included in info.plist.",
                                   fontName]
               }];
    return nil;
  }

  NSMutableDictionary *attributes = [NSMutableDictionary dictionaryWithDictionary:@{
    NSFontAttributeName : font,
    NSForegroundColorAttributeName : parsedColor
  }];

  if (lineHeight > 0) {
    NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc] init];
    paragraphStyle.minimumLineHeight = lineHeight;
    paragraphStyle.maximumLineHeight = lineHeight;
    attributes[NSParagraphStyleAttributeName] = paragraphStyle;
    CGFloat baselineOffset = (lineHeight - font.lineHeight) / 2.0;
    attributes[NSBaselineOffsetAttributeName] = @(baselineOffset);
  }

  NSAttributedString *attributedString =
      [[NSAttributedString alloc] initWithString:glyph
                                      attributes:attributes];

  CGSize iconSize = [attributedString size];

  UIGraphicsImageRenderer *renderer =
      [[UIGraphicsImageRenderer alloc] initWithSize:iconSize];
  UIImage *image =
      [renderer imageWithActions:^(UIGraphicsImageRendererContext *ctx) {
        [attributedString drawAtPoint:CGPointZero];
      }];

  NSData *imageData = UIImagePNGRepresentation(image);
  BOOL success = [imageData writeToFile:filePath atomically:YES];

  if (!success) {
    *error = [NSError errorWithDomain:RNVIErrorDomain
                                 code:RNVIGenericError
                             userInfo:@{
                               NSLocalizedDescriptionKey :
                                   @"Failed to write rendered icon image"
                             }];
    return nil;
  }

  return @{
    @"uri" : filePath,
    @"width" : @(iconSize.width),
    @"height" : @(iconSize.height),
    @"scale" : @(screenScale)
  };
}

RCT_EXPORT_METHOD(getImageForFont : (NSString *)glyph
                          options : (NSDictionary *)options
                          resolve : (RCTPromiseResolveBlock)resolve
                           reject : (RCTPromiseRejectBlock)reject) {
  NSError *error = nil;
  NSDictionary *result = [self createGlyphImageForGlyph:glyph
                                            withOptions:options
                                              withError:&error];
  if (error != nil) {
    reject([NSString stringWithFormat:@"%ld", (long)error.code],
           error.localizedDescription, error);
  } else {
    resolve(result);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(
    getImageForFontSync : (NSString *)glyph
                options : (NSDictionary *)options) {
  NSError *error = nil;
  NSDictionary *result = [self createGlyphImageForGlyph:glyph
                                            withOptions:options
                                              withError:&error];
  if (error == nil && result != nil) {
    return result;
  } else {
    NSString *reason =
        error ? error.localizedDescription : @"Failed to create glyph image";

    @throw [NSException exceptionWithName:@"RNVectorIconsException"
                                   reason:reason
                                 userInfo:nil];
  }
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeVectorIconsSpecJSI>(params);
}
#endif

@end
