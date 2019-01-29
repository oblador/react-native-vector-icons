//
//  RNVectorIconsManager.m
//  RNVectorIconsManager
//
//  Created by Joel Arvidsson on 2015-05-29.
//  Copyright (c) 2015 Joel Arvidsson. All rights reserved.
//

#import "RNVectorIconsManager.h"
#import <CoreText/CoreText.h>
#if __has_include(<React/RCTConvert.h>)
#import <React/RCTConvert.h>
#else // Compatibility for RN version < 0.40
#import "RCTConvert.h"
#endif
#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#else // Compatibility for RN version < 0.40
#import "RCTBridge.h"
#endif
#if __has_include(<React/RCTUtils.h>)
#import <React/RCTUtils.h>
#else // Compatibility for RN version < 0.40
#import "RCTUtils.h"
#endif
#if __has_include(<React/RCTFont.h>)
#import <React/RCTFont.h>
#else // Compatibility for RN version < 0.40
#import "RCTFont.h"
#endif

@implementation RNVectorIconsManager

@synthesize bridge = _bridge;
RCT_EXPORT_MODULE();

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
  NSString *fileName = [NSString stringWithFormat:@"tmp/RNVectorIcons_%@_%@_%hu_%.f%@@%.fx.png",
                                                  identifier, fontName,
                                                  [glyph characterAtIndex:0],
                                                  fontSize, hexColor, screenScale];
  
  return [NSHomeDirectory() stringByAppendingPathComponent:fileName];
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

RCT_EXPORT_METHOD(getImageForFont:(NSString *)fontName
                  withGlyph:(NSString *)glyph
                  withFontSize:(CGFloat)fontSize
                  withColor:(UIColor *)color
                  callback:(RCTResponseSenderBlock)callback)
{
  UIFont *font = [UIFont fontWithName:fontName size:fontSize];
  NSString *filePath = [self generateFilePath:glyph withFontName:fontName
                                                    withFontSize:fontSize
                                                    withColor:color
                                                    withExtraIdentifier:@""];

  BOOL success = [self createAndSaveGlyphImage:glyph withFont:font
                                                     withFilePath:filePath
                                                     withColor:color];
  
  if(!success) {
    return callback(@[@"Failed to write rendered icon image"]);
  }
  
  callback(@[[NSNull null], filePath]);
}

RCT_EXPORT_METHOD(loadFontWithFileName:(NSString *)fontFileName
                  extension:(NSString *)extension
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSBundle *bundle = [NSBundle bundleForClass:[self class]];
  NSURL *fontURL = [bundle URLForResource:fontFileName withExtension:extension];
  NSData *fontData = [NSData dataWithContentsOfURL:fontURL];

  CGDataProviderRef provider = CGDataProviderCreateWithCFData((CFDataRef)fontData);
  CGFontRef font = CGFontCreateWithDataProvider(provider);

  if (font) {
    CFErrorRef errorRef = NULL;
    if (CTFontManagerRegisterGraphicsFont(font, &errorRef) == NO) {
      NSError *error = (__bridge NSError *)errorRef;
      if (error.code == kCTFontManagerErrorAlreadyRegistered) {
        resolve(nil);
      } else {
        reject(@"font_load_failed", @"Font failed to load", error);
      }
    } else {
      resolve(nil);
    }

    CFRelease(font);
  }
  if (provider) {
    CFRelease(provider);
  }
}

@end
