/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.js'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter', ['jest-junit', {outputDirectory: 'e2e/output', outputName: 'report.xml'}]],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};
