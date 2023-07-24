require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|

  s.name           = "RNVectorIcons"
  s.version        = package['version']
  s.summary        = package['description']
  s.homepage       = "https://github.com/oblador/react-native-vector-icons"
  s.license        = "MIT"
  s.author         = { "Joel Arvidsson" => "joel@oblador.se" }
  s.platforms      = { :ios => "9.0", :tvos => "9.0" }
  s.source         = { :git => "https://github.com/oblador/react-native-vector-icons.git", :tag => "v#{s.version}" }
  s.source_files   = 'RNVectorIconsManager/**/*.{h,m}'
  s.resources      = "Fonts/*.ttf"
  s.preserve_paths = "**/*.js"

  # this works for RN 0.72+ on old and new arch
  install_modules_dependencies(s)

end
