# NOTE:This file was generated from packages/generator-react-native-vector-icons/src/app/templates
# If you're contributing to react-native-vector-icons, make the change there, otherwise it'll be lost

require 'json'
require 'pathname'
require 'fileutils'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

head = '(RNVI-fontawesome-pro-duotone-regular)'

# Find the app's project root: walk up from the Podfile dir to the nearest package.json.
# Works for both regular apps (app/ios/Podfile) and monorepos (monorepo/packages/app/ios/Podfile).
project_root = Pathname.new((Pod::Config.instance.installation_root rescue __dir__).to_s).expand_path
project_root = project_root.parent until project_root.join('package.json').exist? || project_root.root?
raise "#{head} Could not find package.json in any parent of #{Pod::Config.instance.installation_root}" if project_root.root?

# Read fontDir config from the app's package.json (default: "rnvi-fonts")
app_pkg = JSON.parse(project_root.join('package.json').read)
font_dir_name = app_pkg.dig('reactNativeVectorIcons', 'fontDir') || 'rnvi-fonts'

# Copy custom fonts into the pod's fonts/ dir so s.resources can pick them up.
# s.resources with paths outside the pod tree don't work reliably through symlinks.
custom_fonts_src = project_root / font_dir_name / 'fontawesome-pro-duotone-regular'
raise "#{head} Custom fonts directory not found: #{custom_fonts_src}" unless custom_fonts_src.exist?

fonts = Dir.glob(custom_fonts_src.join('*.ttf'))
raise "#{head} No .ttf files found in #{custom_fonts_src}" if fonts.empty?

fonts_dest = Pathname.new(__dir__) / 'fonts'
# Clean first to remove stale fonts from previous installs
FileUtils.rm_rf(fonts_dest)
FileUtils.mkdir_p(fonts_dest)
fonts.each { |f| FileUtils.cp(f, fonts_dest) }

Pod::Spec.new do |s|
  s.name         = 'react-native-vector-icons-fontawesome-pro-duotone-regular'
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.authors      = package['author']

  s.platforms    = { ios: min_ios_version_supported, tvos: '9.0', visionos: '1.0' }
  s.source       = { git: package['repository']['url'], tag: "v#{s.version}" }

  s.resources = 'fonts/*.ttf'
end
