require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'react-native-vector-icons-simple-line-icons'
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.authors      = package['author']

  s.platforms    = { ios: min_ios_version_supported, tvos: '9.0', visionos: '1.0' }
  s.source       = { git: package['repository']['url'], tag: "v#{s.version}" }

  # s.source_files = "ios/**/*.{h,m,mm,cpp}"

  # Use install_modules_dependencies helper to install the dependencies if React Native version >=0.71.0.
  # See https://github.com/facebook/react-native/blob/febf6b7f33fdb4904669f99d795eba4c0f95d7bf/scripts/cocoapods/new_architecture.rb#L79.
  # if respond_to?(:install_modules_dependencies, true)
  #   install_modules_dependencies(s)
  # else
  #   s.dependency "React-Core"
  #
  #   # Don't install the dependencies when we run `pod install` in the old architecture.
  #   if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
  #     s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
  #     s.pod_target_xcconfig = {
  #         "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
  #         "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
  #         "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  #     }
  #     s.dependency "React-Codegen"
  #     s.dependency "RCT-Folly"
  #     s.dependency "RCTRequired"
  #     s.dependency "RCTTypeSafety"
  #     s.dependency "ReactCommon/turbomodule/core"
  #   end
  # end

  # WITH_ENVIRONMENT="$REACT_NATIVE_PATH/scripts/xcode/with-environment.sh"
  #
  # /bin/sh -c "\"$WITH_ENVIRONMENT\" \"${PODS_TARGET_SRCROOT}/scripts/copy-fonts.sh\""
  s.script_phase = {
    name: 'Copy Fonts',
    script: <<~SCRIPT
      set -e

      # This script borrows from the standard resource copy script https://gist.github.com/vonovak/d8f1a37804438f05bae22be1e8cd53c1
      # We need one key piece of information
      # Xcode Build Dir to copy the fonts into - We look for the directory that ends in .app

      HEADER="(RNVI:simple-line-icons)"

      echo "$HEADER START:RNVI_COPY_FONTS"

      DEST_DIR=$(ls -d "$PODS_CONFIGURATION_BUILD_DIR"/*.app)

      echo "(RNVI: simple-line-icons) Copying the following fonts to $DEST_DIR"
      ls fonts/* | sed "s/^/$HEADER /"

      rsync -avr --copy-links --no-relative fonts/* "$DEST_DIR"

      # TODO: How do we test this is right?
      # TODO: Is this needed?
      if [[ "${ACTION}" == "install" ]] && [[ "${SKIP_INSTALL}" == "NO" ]]; then
        mkdir -p "${INSTALL_DIR}/react-native-vector-icons"
        rsync -avr --copy-links --no-relative fonts/* "${INSTALL_DIR}/react-native-vector-icons"
      fi

      echo "$HEADER END:RNVI_COPY_FONTS"
    SCRIPT
  }
end
