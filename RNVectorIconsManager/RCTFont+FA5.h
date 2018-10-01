//
//  RCTFont+FA5.h
//  RNVectorIcons
//
//  Created by Hampus Tågerud on 2018-08-04.
//  Copyright © 2018 Joel Arvidsson. All rights reserved.
//

#if __has_include(<React/RCTFont.h>)
#import <React/RCTFont.h>
#else // Compatibility for RN version < 0.40
#import "RCTFont.h"
#endif

@interface RCTFont (FA5)

+ (UIFont *)FA5_updateFont:(UIFont *)font
            withFamily:(NSString *)family
                  size:(NSNumber *)size
                weight:(NSString *)weight
                 style:(NSString *)style
               variant:(NSArray<NSString *> *)variant
       scaleMultiplier:(CGFloat)scaleMultiplier;

@end
