# NOTE:This file was generated from packages/generator-react-native-vector-icons/src/app/templates
# If you're contributing to react-native-vector-icons, make the change there, otherwise it'll be lost

require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'react-native-vector-icons-material-design-icons'
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.authors      = package['author']

  s.platforms    = { ios: min_ios_version_supported, tvos: '9.0', visionos: '1.0' }
  s.source       = { git: package['repository']['url'], tag: "v#{s.version}" }

  s.resources = 'fonts/*.ttf'
end
