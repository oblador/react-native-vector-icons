/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  testTimeout: 30 * 1000,
  reporters: ['default', ['jest-junit', { outputDirectory: '.owl/report', outputName: 'report.xml' }]],
  verbose: true,
};
