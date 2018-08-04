//
//  RCTFont+FA5.m
//  RNVectorIcons
//
//  Created by Hampus Tågerud on 2018-08-04.
//  Copyright © 2018 Joel Arvidsson. All rights reserved.
//

#import "RCTFont+FA5.h"
#import <objc/runtime.h>

@implementation RCTFont (FA5)

+ (void)load
{
  static dispatch_once_t onceToken;
  
  dispatch_once(&onceToken, ^{
    Class class = object_getClass((id)self);
    
    SEL originalSelector = @selector(updateFont:withFamily:size:weight:style:variant:scaleMultiplier:);
    SEL swizzledSelector = @selector(FA5_updateFont:withFamily:size:weight:style:variant:scaleMultiplier:);
    
    Method originalMethod = class_getClassMethod(class, originalSelector);
    Method swizzledMethod = class_getClassMethod(class, swizzledSelector);
    
    BOOL didAddMethod = class_addMethod(class,
                                        originalSelector,
                                        method_getImplementation(swizzledMethod),
                                        method_getTypeEncoding(swizzledMethod));

        if (didAddMethod) {
            class_replaceMethod(class,
                                swizzledSelector,
                                method_getImplementation(originalMethod),
                                method_getTypeEncoding(originalMethod));
        } else {
            method_exchangeImplementations(originalMethod, swizzledMethod);
        }
  });
}

+ (UIFont *)FA5_updateFont:(UIFont *)font
            withFamily:(NSString *)family
                  size:(NSNumber *)size
                weight:(NSString *)weight
                 style:(NSString *)style
               variant:(NSArray<NSString *> *)variant
       scaleMultiplier:(CGFloat)scaleMultiplier
{
  if ([family hasPrefix:@"Font Awesome 5"] &&
      ([family hasSuffix:@"Pro"] || [family hasSuffix:@"Free"])) {
  
    NSString *type = @"Regular";
    if ([weight isEqualToString:@"100"])
      type = @"Light";
    else if ([weight isEqualToString:@"700"])
      type = @"Solid";
    
    CGFloat fontSize = 14;
    fontSize = [RCTConvert CGFloat:size] ?: fontSize;
  
    for (NSString *fontName in [UIFont fontNamesForFamilyName:family]) {
      if ([fontName hasSuffix:type]) {
        return [UIFont fontWithName:fontName size:fontSize];
      }
    }
  }
  
  return [self FA5_updateFont:font withFamily:family
                                   size:size weight:weight
                                   style:style variant:variant
                                   scaleMultiplier:scaleMultiplier];
}

@end
