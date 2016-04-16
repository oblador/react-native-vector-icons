//
//  RNVectorIconsManager.h
//  RNVectorIconsManager
//
//  Created by Joel Arvidsson on 2015-05-29.
//  Copyright (c) 2015 Joel Arvidsson. All rights reserved.
//

#import "RCTBridgeModule.h"
#import "RCTLog.h"

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
