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

  s.platforms    = { :ios => min_ios_version_supported, :tvos => "9.0", :visionos => "1.0" }
  s.source       = { :git => package["repository"]["url"], :tag => "v#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,cpp}"

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

  s.script_phase = {
    :name => 'Copy Fonts',
    :script => "
      set -e

      # This script borrows from the standard resource copy script https://gist.github.com/vonovak/d8f1a37804438f05bae22be1e8cd53c1
      # We need two key bits of information
      # Project Root - Where the package.json for the RN app lives
      # Xcode Build Dir to copy the fonts into - We look for the directory that ends in .app

      echo \"(RNVI) START_COPY_FONTS\"

      echo \"(RNVI) PWD: $(pwd)\"

      #############
      # Find the fonts we need to copy
      #############

      # Assume the project root is always two directories above the POD_ROOT
      echo \"(RNVI) PODS_ROOT: $PODS_ROOT\"
      PROJECT_ROOT=\"${PODS_ROOT}/../..\"
      echo \"(RNVI) PROJECT_ROOT: $PROJECT_ROOT\"

      # Items we need to copy for rsync
      RESOURCES_TO_COPY=${PODS_ROOT}/resources-to-copy-${TARGETNAME}.txt

      node \"${PODS_TARGET_SRCROOT}/lib/commonjs/scripts/getFonts.js\" \"$PROJECT_ROOT\"/package.json > \"$RESOURCES_TO_COPY\"

      #############
      # Find the destination we copy to
      #############

      echo \"(RNVI) PODS_CONFIGURATION_BUILD_DIR: $PODS_CONFIGURATION_BUILD_DIR\"
      XCODE_DIR=$(ls -d \"$PODS_CONFIGURATION_BUILD_DIR\"/*.app)
      echo \"(RNVI) XCODE_DIR: $XCODE_DIR\"
      DEST_DIR=\"${XCODE_DIR}\"
      echo \"(RNVI) DEST_DIR: $DEST_DIR\"
      echo I $INSTALL_DIR
      mkdir -p \"$DEST_DIR\"

      #############
      # Copy the fonts
      #############
      echo \"(RNVI) Copying the following files to $DEST_DIR\"
      cat \"$RESOURCES_TO_COPY\" | sed 's/^/(RNVI) /'

      # NOTE: Should we add --delete and remove old fonts automagically? NOt doing it yet as it feels risky
      rsync -avr --copy-links --no-relative --exclude '*/.svn/*' --files-from=\"$RESOURCES_TO_COPY\" / \"$DEST_DIR\"
      # TODO: How do we test this is right?
      if [[ \"${ACTION}\" == \"install\" ]] && [[ \"${SKIP_INSTALL}\" == \"NO\" ]]; then
        mkdir -p \"${INSTALL_DIR}/react-native-vector-icons\"
        rsync -avr --copy-links --no-relative --exclude '*/.svn/*' --files-from=\"$RESOURCES_TO_COPY\" / \"${INSTALL_DIR}/react-native-vector-icons\"
      fi

      rm -f \"$RESOURCES_TO_COPY\"

      echo \"(RNVI) END:RNVI_COPY_FONTS\"
    ",
  }
end
