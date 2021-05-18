module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webfont: {
      icons: {
        src: './node_modules/feather-icons/dist/icons/*.svg',
        dest: './Feather',
        options: {
          font: 'Feather',
          templateOptions: {
            baseClass: 'feather-icon',
            classPrefix: 'icon-'
          }
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-webfont')
}
