const { pathsToModuleNameMapper } = require('ts-jest')
const { createCjsPreset } = require('jest-preset-angular/presets')
const { compilerOptions } = require('../../tsconfig')

module.exports = {
  ...createCjsPreset(),
  displayName: 'demo',
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testMatch: ['**/+(*.)+(spec).+(ts|js)'],
  coverageDirectory: '<rootDir>/coverage/demo',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>../../',
  }),
}
