//
//  RNVectorIconsManager.m
//  RNVectorIconsManager
//
//  Created by Joel Arvidsson on 2015-05-29.
//  Copyright (c) 2015 Joel Arvidsson. All rights reserved.
//

#import "RNVectorIconsManager.h"
#import <CoreText/CoreText.h>
#import <React/RCTConvert.h>
#import <React/RCTBridge.h>
#import <React/RCTUtils.h>
#import <React/RCTFont.h>
// Thanks to this guard, we won't import this header when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNVectorIconsSpec.h"
#endif


NSString *const RNVIErrorDomain = @"org.oblador.react-native-vector-icons";

@implementation RNVectorIconsManager

@synthesize bridge = _bridge;
RCT_EXPORT_MODULE(RNVectorIcons);

- (NSString *)hexStringFromColor:(UIColor *)color
{
  const CGFloat *components = CGColorGetComponents(color.CGColor);

  CGFloat r = components[0];
  CGFloat g = components[1];
  CGFloat b = components[2];

  return [NSString stringWithFormat:@"#%02lX%02lX%02lX",
          lroundf(r * 255),
          lroundf(g * 255),
          lroundf(b * 255)];
}

- (NSString *)generateFilePath:(NSString *)glyph withFontName:(NSString *)fontName
                                                 withFontSize:(CGFloat)fontSize
                                                 withColor:(UIColor *)color
                                                 withExtraIdentifier:(NSString *)identifier
{
  CGFloat screenScale = RCTScreenScale();
  NSString *hexColor = [self hexStringFromColor:color];
  NSString *fileName = [NSString stringWithFormat:@"%@RNVectorIcons_%@_%@_%@_%.f%@@%.fx.png",
                                                  NSTemporaryDirectory(),
                                                  identifier, fontName, glyph,
                                                  fontSize, hexColor, screenScale];

  return fileName;
}

- (BOOL)createAndSaveGlyphImage:(NSString *)glyph withFont:(UIFont *)font
                                                  withFilePath:(NSString *)filePath
                                                  withColor:(UIColor *)color
{
  if(![[NSFileManager defaultManager] fileExistsAtPath:filePath]) {
    // No cached icon exists, we need to create it and persist to disk

    NSAttributedString *attributedString = [[NSAttributedString alloc] initWithString:glyph attributes:@{NSFontAttributeName: font, NSForegroundColorAttributeName: color}];

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
                                withError:(NSError **)error
{
  UIColor *parsedColor = [RCTConvert UIColor:@(color)];
  UIFont *font = [UIFont fontWithName:fontName size:fontSize];
  NSString *filePath = [self generateFilePath:glyph withFontName:fontName
                                                    withFontSize:fontSize
                                                    withColor:parsedColor
                                                    withExtraIdentifier:@""];

  BOOL success = [self createAndSaveGlyphImage:glyph withFont:font
                                                     withFilePath:filePath
                                                     withColor:parsedColor];

  if (!success) {
    *error = [NSError errorWithDomain:RNVIErrorDomain code:RNVIGenericError userInfo:@{NSLocalizedDescriptionKey: @"Failed to write rendered icon image"}];
    return nil;
  }
  return filePath;
}

RCT_EXPORT_METHOD(
  getImageForFont:(NSString *)fontName
  glyph:(NSString *)glyph
  fontSize:(CGFloat)fontSize
  color:(double)color
  resolve:(RCTPromiseResolveBlock)resolve
  reject:(RCTPromiseRejectBlock)reject
) {
  NSError *error = nil;
  NSString *filePath = [self createGlyphImagePathForFont:fontName
                                               withGlyph:glyph
                                               withFontSize:fontSize
                                               withColor:color
                                               withError:&error];
  if (error != nil) {
    reject([NSString stringWithFormat:@"%ld", (long)error.code], error.localizedDescription, error);
  } else {
    resolve(filePath);
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(
  getImageForFontSync:(NSString *)fontName
  glyph:(NSString *)glyph
  fontSize:(CGFloat)fontSize
  color:(double)color
) {
  NSError *error = nil;
  return [self createGlyphImagePathForFont:fontName
                                 withGlyph:glyph
                                 withFontSize:fontSize
                                 withColor:color
                                 withError:&error];
}

RCT_EXPORT_METHOD(
  loadFontWithFileName:(NSString *)fontFileName
  extension:(NSString *)extension
  resolve:(RCTPromiseResolveBlock)resolve
  reject:(RCTPromiseRejectBlock)reject
) {
  NSBundle *bundle = [NSBundle bundleForClass:[self class]];
  NSURL *fontURL = [bundle URLForResource:fontFileName withExtension:extension];
  NSData *fontData = [NSData dataWithContentsOfURL:fontURL];

  CGDataProviderRef provider = CGDataProviderCreateWithCFData((CFDataRef)fontData);
  CGFontRef font = CGFontCreateWithDataProvider(provider);

  if (font) {
    CFErrorRef errorRef = NULL;
    if (CTFontManagerRegisterGraphicsFont(font, &errorRef) == NO) {
      NSError *error = (__bridge NSError *)errorRef;
      if (error.code == kCTFontManagerErrorAlreadyRegistered || error.code == kCTFontManagerErrorDuplicatedName) {
        resolve(nil);
      } else {
        NSString *errorMessage = [NSString stringWithFormat:@"Font '%@' failed to load", fontFileName];
        reject(@"font_load_failed", errorMessage, error);
      }
    } else {
      resolve(nil);
    }

    if (errorRef) {
        CFRelease(errorRef);
    }
    CFRelease(font);
  }
  if (provider) {
    CFRelease(provider);
  }
}

// Thanks to this guard, we won't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNVectorIconsSpecJSI>(params);
}
#endif

@end
