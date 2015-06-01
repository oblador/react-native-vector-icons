//
//  RNVectorIconsManager.m
//  RNVectorIconsManager
//
//  Created by Joel Arvidsson on 2015-05-29.
//  Copyright (c) 2015 Joel Arvidsson. All rights reserved.
//

#import "RNVectorIconsManager.h"
#import "RCTConvert.h"
#import "RCTBridge.h"
#import "RCTUtils.h"

@implementation RNVectorIconsManager

@synthesize bridge = _bridge;
RCT_EXPORT_MODULE();

- (NSString *)hexStringFromColor:(UIColor *)color {
  const CGFloat *components = CGColorGetComponents(color.CGColor);

  CGFloat r = components[0];
  CGFloat g = components[1];
  CGFloat b = components[2];

  return [NSString stringWithFormat:@"#%02lX%02lX%02lX",
          lroundf(r * 255),
          lroundf(g * 255),
          lroundf(b * 255)];
}


RCT_EXPORT_METHOD(getImageForFont:(NSString*)fontName withGlyph:(NSString*)glyph withFontSize:(CGFloat)fontSize withColor:(UIColor *)color callback:(RCTResponseSenderBlock)callback){
  CGFloat screenScale = RCTScreenScale();

  NSString *hexColor = [self hexStringFromColor:color];

  NSString *fileName = [NSString stringWithFormat:@"Documents/RNVectorIcons_%@_%hu_%.f%@@%.fx.png", fontName, [glyph characterAtIndex:0], fontSize, hexColor, screenScale];
  NSString *filePath = [NSHomeDirectory() stringByAppendingPathComponent:fileName];

  if(![[NSFileManager defaultManager] fileExistsAtPath:filePath]) {
    // No cached icon exists, we need to create it and persist to disk

    UIFont *font = [UIFont fontWithName:fontName size:fontSize];
    NSAttributedString *attributedString = [[NSAttributedString alloc] initWithString:glyph attributes:@{NSFontAttributeName: font, NSForegroundColorAttributeName: color}];

    CGSize iconSize = [attributedString size];

    CGSize imageSize = CGSizeMake(fontSize, fontSize);
    UIGraphicsBeginImageContextWithOptions(imageSize, NO, 0.0);
  
    //Center in case height doesn't equal fontSize
    CGRect centeredRect = CGRectMake((imageSize.width - iconSize.width) / 2.0, (imageSize.height - iconSize.height) / 2.0, iconSize.width, iconSize.height);
    [attributedString drawInRect:centeredRect];
  
    UIImage *iconImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
  
    NSData *imageData = UIImagePNGRepresentation(iconImage);
    BOOL success = [imageData writeToFile:filePath atomically:YES];
    if(!success) {
      return callback(@[@"Failed to write rendered icon image"]);
    }
  }
  callback(@[[NSNull null], filePath]);

}
@end
