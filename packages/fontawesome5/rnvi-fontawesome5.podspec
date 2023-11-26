require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "rnvi-fontawesome5"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.0", :tvos => "9.0" }
  s.source       = { :git => "https://github.com/oblador/react-native-vector-icons.git", :tag => "#{s.version}" }

  s.resources = ['fonts/*.ttf']

  # FIXME: Should we do this in the future? We would have to change how loadfont works though, to give the subdir
  # s.resource_bundles = {
  #   'RNVI_FontAwesome5' => ['fonts/*.ttf'],
  # }

  # NOTE: This is pretty brittle. Hopefully it works for everyone
  s.script_phase = {
    :name => 'Copy Font Awesome Pro Fonts',
    :script => '
      if [ -d ${SRCROOT}/../../assets/fonts ]; then
        APP_NAME="$(echo $PODS_ROOT | sed \'s/\/ios\/Pods//;s/.*\///\').app"
        cp ${SRCROOT}/../../assets/fonts/* ${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/../${APP_NAME}
      fi
    ',
  }
end

