#import "AppDelegate.h"

#import "RCTBridge.h"
#import "RCTJavaScriptLoader.h"
#import "RCTRootView.h"
#import <Cocoa/Cocoa.h>
#import "RCTEventDispatcher.h"

@interface AppDelegate() <RCTBridgeDelegate, NSSearchFieldDelegate>

@end

@implementation AppDelegate

-(id)init
{
    if(self = [super init]) {
        NSRect contentSize = NSMakeRect(200, 500, 1000, 500); // initial size of main NSWindow

        self.window = [[NSWindow alloc] initWithContentRect:contentSize
                                                  styleMask:NSTitledWindowMask | NSResizableWindowMask | NSFullSizeContentViewWindowMask | NSMiniaturizableWindowMask | NSClosableWindowMask
                                                    backing:NSBackingStoreBuffered
                                                      defer:NO];
        NSWindowController *windowController = [[NSWindowController alloc] initWithWindow:self.window];

        [[self window] setTitleVisibility:NSWindowTitleHidden];
        [[self window] setAppearance:[NSAppearance appearanceNamed:NSAppearanceNameVibrantLight ]];
      
        [windowController setShouldCascadeWindows:NO];
        [windowController setWindowFrameAutosaveName:@"IconExplorer"];

        [windowController showWindow:self.window];

      
        // -- Init Toolbar
        NSToolbar *toolbar = [[NSToolbar alloc] initWithIdentifier:@"mainToolbar"];
        [toolbar setDelegate:self];
        [toolbar setSizeMode:NSToolbarSizeModeRegular];
      
        [self.window setToolbar:toolbar];

        [self setUpApplicationMenu];
    }
    return self;
}

- (void)applicationDidFinishLaunching:(__unused NSNotification *)aNotification
{

    _bridge = [[RCTBridge alloc] initWithDelegate:self
                                              launchOptions:nil];

    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:_bridge
                                                     moduleName:@"IconExplorer"
                                              initialProperties:nil];



    [self.window setContentView:rootView];
}


- (NSURL *)sourceURLForBridge:(__unused RCTBridge *)bridge
{
    NSURL *sourceURL;

#if DEBUG
    sourceURL = [NSURL URLWithString:@"http://localhost:8081/index.osx.bundle?platform=osx&dev=true"];
#else
    sourceURL = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif

    return sourceURL;
}

- (void)loadSourceForBridge:(RCTBridge *)bridge
                  withBlock:(RCTSourceLoadBlock)loadCallback
{
    [RCTJavaScriptLoader loadBundleAtURL:[self sourceURLForBridge:bridge]
                              onComplete:loadCallback];
}

- (NSArray *)toolbarAllowedItemIdentifiers:(__unused NSToolbar *)toolbar
{
    return @[NSToolbarFlexibleSpaceItemIdentifier, @"searchBar", NSToolbarFlexibleSpaceItemIdentifier];
}

- (NSArray *)toolbarDefaultItemIdentifiers:(__unused NSToolbar *)toolbar
{
    return @[NSToolbarFlexibleSpaceItemIdentifier, @"searchBar", NSToolbarFlexibleSpaceItemIdentifier];
}

- (NSToolbarItem *)toolbar:(NSToolbar * __unused)toolbar itemForItemIdentifier:(NSString *)itemIdentifier willBeInsertedIntoToolbar:(BOOL __unused)flag {
  
    if ([itemIdentifier isEqualToString:@"searchBar"]) {
        NSSearchField *searchField = [[NSSearchField alloc] init];
        [searchField setFrameSize:NSMakeSize(400, searchField.intrinsicContentSize.height)];
        [searchField setDelegate:self];
        [searchField setRecentsAutosaveName:@"mainSearchField"];
        [searchField setPlaceholderString:@"Search Icons"];
        [searchField setAction:@selector(searchQuery:)];
        NSToolbarItem *item = [[NSToolbarItem alloc] initWithItemIdentifier:itemIdentifier];
        [item setView:searchField];
        return item;
    }
    return nil;
}

- (IBAction)searchQuery:(id)sender {
    [_bridge.eventDispatcher sendDeviceEventWithName:@"onSearchIcons"
                                                body:@{@"query": [sender stringValue]}
     ];
}

- (void)setUpApplicationMenu
{
    NSMenuItem *containerItem = [[NSMenuItem alloc] init];
    NSMenu *rootMenu = [[NSMenu alloc] initWithTitle:@"" ];
    [containerItem setSubmenu:rootMenu];
    [rootMenu addItemWithTitle:@"Quit IconExplorer" action:@selector(terminate:) keyEquivalent:@"q"];
    [[NSApp mainMenu] addItem:containerItem];

    NSMenuItem *editItemContainer = [[NSMenuItem alloc] init];
    NSMenu *editMenu = [[NSMenu alloc] initWithTitle:@"Edit"];
    [editItemContainer setSubmenu:editMenu];
    [editMenu setAutoenablesItems:NO];
    [editMenu addItem:[self addEditMenuItem:@"Undo" action:@selector(undo) key:@"z" ]];
    [editMenu addItem:[self addEditMenuItem:@"Redo" action:@selector(redo) key:@"Z" ]];
    [editMenu addItem:[self addEditMenuItem:@"Cut" action:@selector(cut:) key:@"x" ]];
    [editMenu addItem:[self addEditMenuItem:@"Copy" action:@selector(copy:) key:@"c" ]];
    [editMenu addItem:[self addEditMenuItem:@"Paste" action:@selector(paste:) key:@"v" ]];
    [editMenu addItem:[self addEditMenuItem:@"SelectAll" action:@selector(selectAll:) key:@"a" ]];
    [[NSApp mainMenu] addItem:editItemContainer];
}

- (NSMenuItem *)addEditMenuItem:(NSString *)title
                         action:(SEL _Nullable)action
                            key:(NSString *)key
{
    NSMenuItem * menuItem = [[NSMenuItem alloc] init];
    [menuItem setTitle:title];
    [menuItem setEnabled:YES];
    [menuItem setAction:action];
    [menuItem setKeyEquivalent:key];
    return menuItem;
}

- (void)undo
{
    [[[self window] undoManager] undo];
}

- (void)redo
{
    [[[self window] undoManager] redo];
}

- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication * __unused)theApplication {
    return YES;
}

- (id)firstResponder
{
    return [self.window firstResponder];
}

@end
