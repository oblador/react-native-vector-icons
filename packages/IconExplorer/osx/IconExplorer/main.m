/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

 #import <Cocoa/Cocoa.h>
 #import "AppDelegate.h"

 int main(int argc, char * argv[]) {
     @autoreleasepool {
         NSApplication * application = [NSApplication sharedApplication];
         NSMenu *mainMenu = [[NSMenu alloc] initWithTitle:@"IconExplorer"];
         [NSApp setMainMenu:mainMenu];
         AppDelegate * appDelegate = [[AppDelegate alloc] init];
         [application setDelegate:appDelegate];
         [application run];
         return EXIT_SUCCESS;
     }
 }
