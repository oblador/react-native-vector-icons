/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

 #import <AppKit/AppKit.h>
 #import <XCTest/XCTest.h>

 #import "RCTLog.h"
 #import "RCTRootView.h"


 @interface IconExplorerTests : XCTestCase

 @end


 @implementation IconExplorerTests

 - (void)setUp {
   [super setUp];
   // Put setup code here. This method is called before the invocation of each test method in the class.
 }

 - (void)tearDown {
   // Put teardown code here. This method is called after the invocation of each test method in the class.
   [super tearDown];
 }

 - (void)testExample {
   NSOperatingSystemVersion version = [NSProcessInfo processInfo].operatingSystemVersion;
   RCTAssert((version.majorVersion == 10 && version.minorVersion >= 10), @"Tests should be run on OSX 10.10+, found %zd.%zd.%zd", version.majorVersion, version.minorVersion, version.patchVersion);
 }

 - (void)testPerformanceExample {
   // This is an example of a performance test case.
   [self measureBlock:^{
     // Put the code you want to measure the time of here.
   }];
 }

 @end
