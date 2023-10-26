require 'json'
package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name           = "RNVectorIcons"
  s.version        = package["version"]
  s.summary        = package["description"]
  s.description    = package["description"]
  s.homepage       = package["homepage"]
  s.license        = package["license"]
  s.author         = { package["author"]["name"] => package["author"]["email"] }
  s.platforms      = { :ios => "12.0", :tvos => "9.0" }
  s.source         = { :git => package["repository"]["url"], :tag => "v#{s.version}" }

  s.source_files   = 'RNVectorIconsManager/**/*.{h,m,mm,swift}'
  s.resources      = "Fonts/*.ttf"
  s.preserve_paths = "**/*.js"
  # React Native Core dependency
  if defined? install_modules_dependencies
    install_modules_dependencies(s)
  end
end
