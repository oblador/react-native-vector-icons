/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <Cocoa/Cocoa.h>
#import "RCTBridge.h"

@interface AppDelegate : NSObject <NSApplicationDelegate, NSToolbarDelegate, NSWindowDelegate>

@property (strong, nonatomic) NSWindow *window;
@property (nonatomic, readonly) RCTBridge *bridge;

@end
