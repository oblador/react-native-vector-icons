# NOTE:This file was generated from packages/generator-react-native-vector-icons/src/app/templates
# If you're contributing to react-native-vector-icons, make the change there, otherwise it'll be lost

require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'react-native-vector-icons-fontawesome-pro-sharp-duotone-regular'
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.authors      = package['author']

  s.platforms    = { ios: min_ios_version_supported, tvos: '9.0', visionos: '1.0' }
  s.source       = { git: package['repository']['url'], tag: "v#{s.version}" }

  s.resources = 'fonts/*.ttf'

  s.script_phase = {
    name: 'Copy Custom Fonts',
    execution_position: :after_compile,
    script: <<~SCRIPT
      set -e

      HEAD="(RNVI-fontawesome-pro-sharp-duotone-regular)"

      echo "${HEAD} START_COPY_FONTS"

      echo "${HEAD} PWD: $(pwd)"

      #
      # Find the custom font Directory
      #

      # Assume the project root is always two directories above the POD_ROOT
      echo "${HEAD} PODS_ROOT: $PODS_ROOT"

      PROJECT_ROOT="${PODS_ROOT}/../.."
      echo "${HEAD} PROJECT_ROOT: $PROJECT_ROOT"

      cd $PROJECT_ROOT
      FONTS_DIR=$(npm pkg get reactNativeVectorIcons.fontDir | grep ':' | grep -v '{}' | sed 's/.*: //;s/"//g')
      if [ -z "$FONTS_DIR" ]; then
        FONTS_DIR="rnvi-fonts"
      fi
      echo "${HEAD} FONTS_DIR: $FONTS_DIR"

      FONTS_DIR="${PROJECT_ROOT}/${FONTS_DIR}/fontawesome-pro-sharp-duotone-regular"
      if [ ! -d "$FONTS_DIR" ]; then
        echo "${HEAD} $FONTS_DIR not found"
        exit 0
      fi

      #
      # Find the destination we copy to
      #

      echo "${HEAD} PODS_CONFIGURATION_BUILD_DIR: $PODS_CONFIGURATION_BUILD_DIR"
      XCODE_DIR=$(ls -d "$PODS_CONFIGURATION_BUILD_DIR"/*.app)
      echo "${HEAD} XCODE_DIR: $XCODE_DIR"
      if [ -z "$XCODE_DIR" ]; then
        echo "Could not find XCODE_DIR to copy fonts to"
        exit 1
      fi

      DEST_DIR="${XCODE_DIR}"
      mkdir -p "$DEST_DIR"

      #
      # Copy the fonts
      #

      echo "${HEAD} Copying the following files to $DEST_DIR"
      ls "$FONTS_DIR" | sed "s/^/${HEAD} /"

      rsync -avr --copy-links --no-relative $FONTS_DIR/ "$DEST_DIR"

      echo "${HEAD} END:RNVI_COPY_FONTS"
    SCRIPT
  }
end
