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

RCT_EXPORT_METHOD(getImageForFont:(NSString*)fontName withGlyph:(NSString*)glyph withFontSize:(CGFloat)fontSize callback:(RCTResponseSenderBlock)callback){

  UIFont *font = [UIFont fontWithName:fontName size:fontSize];
  NSAttributedString *attributedString = [[NSAttributedString alloc] initWithString:glyph attributes:@{NSFontAttributeName: font}];

  CGSize iconSize = [attributedString size];

  CGSize imageSize = CGSizeMake(fontSize, fontSize);
  UIGraphicsBeginImageContextWithOptions(imageSize, NO, 0.0);
  
  //Center in case height doesn't equal fontSize
  CGRect centeredRect = CGRectMake((imageSize.width - iconSize.width) / 2.0, (imageSize.height - iconSize.height) / 2.0, iconSize.width, iconSize.height);
  [attributedString drawInRect:centeredRect];
  
  UIImage *iconImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  
  //Encode as base64 to be able to use it with React
  NSData *imageData = UIImagePNGRepresentation(iconImage);
  NSString *imageDataBase64encodedString = [imageData base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
  callback(@[[NSNull null], [NSString stringWithFormat:@"data:image/png;base64,%@", imageDataBase64encodedString]]);
  
}
@end
