/**
 * @type {import('@react-native-community/cli-types').UserDependencyConfig}
 */
module.exports = {
  dependency: {
    platforms: {
      android: {
        // NOTE: This is what create-react-native-library has but it doesn't seem to work
        // cmakeListsPath: 'generated/jni/CMakeLists.txt',
        cmakeListsPath: 'build/generated/source/codegen/jni/CMakeLists.txt',
      },
    },
  },
};
