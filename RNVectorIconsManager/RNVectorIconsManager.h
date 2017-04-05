//
//  RNVectorIconsManager.h
//  RNVectorIconsManager
//
//  Created by Joel Arvidsson on 2015-05-29.
//  Copyright (c) 2015 Joel Arvidsson. All rights reserved.
//

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else // Compatibility for RN version < 0.40
#import "RCTBridgeModule.h"
#endif
#if __has_include(<React/RCTLog.h>)
#import <React/RCTLog.h>
#else // Compatibility for RN version < 0.40
#import "RCTLog.h"
#endif

#import <TargetConditionals.h>

#if TARGET_OS_IPHONE

// iOS

#else

// Mac OS
#import "UIImageUtils.h"

typedef NSImage UIImage;
typedef NSColor UIColor;
typedef NSFont UIFont;

#endif

@interface RNVectorIconsManager : NSObject <RCTBridgeModule>

@end
