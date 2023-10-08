//
//  RNVectorIconsManager.h
//  RNVectorIconsManager
//
//  Created by Joel Arvidsson on 2015-05-29.
//  Copyright (c) 2015 Joel Arvidsson. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

FOUNDATION_EXPORT NSString *const RNVIErrorDomain;

enum {
  RNVIGenericError = 1000,
};

@interface RNVectorIconsManager : NSObject <RCTBridgeModule>

- (NSString *)hexStringFromColor:(UIColor *)color;
- (NSString *)generateFilePath:(NSString *)glyph withFontName:(NSString *)fontName
                                                 withFontSize:(CGFloat)fontSize
                                                 withColor:(UIColor *)color
                                                 withExtraIdentifier:(NSString *)identifier;
- (BOOL)createAndSaveGlyphImage:(NSString *)glyph withFont:(UIFont *)font
                                                  withFilePath:(NSString *)filePath
                                                  withColor:(UIColor *)color;

@end
