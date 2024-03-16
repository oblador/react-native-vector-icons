require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "react-native-vector-icons"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.0", :tvos => "9.0" }
  s.source       = { :git => "https://github.com/react-native-vector-icons/react-native-vector-icons.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm}"

  s.script_phase = {
    :name => 'Copy Fonts',
    :script => "
      set -e

      # NOTE: This whole script is a bit of a hack
      # We need two key bits of information
      # Project Root - Always above the pods dir
      # Xcode Build Dir to copy the fonts into - We look for the directory that ends in .app

      echo START:RNVI_COPY_FONTS

      echo PWD: $(pwd)
      echo PODS_ROOT: \"$PODS_ROOT\"
      echo PODS_CONFIGURATION_BUILD_DIR: \"$PODS_CONFIGURATION_BUILD_DIR\"

      PROJECT_ROOT=\"${PODS_ROOT}/../..\"
      echo \"PROJECT_ROOT: $PROJECT_ROOT\"

      XCODE_DIR=$(ls -d \"$PODS_CONFIGURATION_BUILD_DIR\"/*.app)
      DEST_DIR=\"${XCODE_DIR}/react-native-vector-icons\"
      echo XCODE_DIR: \"$XCODE_DIR\"
      echo DEST_DIR: \"$DEST_DIR\"
      mkdir -p \"$DEST_DIR\"

      FONT_LIST=$(node \"#{__dir__}/lib/commonjs/scripts/getFonts.js\" \"$PROJECT_ROOT\")
      for font in $FONT_LIST; do
        echo Copying font $font
        cp $font \"$DEST_DIR\"
      done

      echo END:RNVI_COPY_FONTS
    ",
  }

  # Use install_modules_dependencies helper to install the dependencies if React Native version >=0.71.0.
  # See https://github.com/facebook/react-native/blob/febf6b7f33fdb4904669f99d795eba4c0f95d7bf/scripts/cocoapods/new_architecture.rb#L79.
  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
  s.dependency "React-Core"

  # Don't install the dependencies when we run `pod install` in the old architecture.
  if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
    s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
    s.pod_target_xcconfig    = {
        "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
        "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
        "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
    }
    s.dependency "React-Codegen"
    s.dependency "RCT-Folly"
    s.dependency "RCTRequired"
    s.dependency "RCTTypeSafety"
    s.dependency "ReactCommon/turbomodule/core"
   end
  end
end
