const { pathsToModuleNameMapper } = require('ts-jest')
const { createCjsPreset } = require('jest-preset-angular/presets')
const { compilerOptions } = require('../../tsconfig')

module.exports = {
  ...createCjsPreset(),
  displayName: 'nge',
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  testMatch: ['**/+(*.)+(spec).+(ts|js)'],
  coverageDirectory: '<rootDir>/coverage/nge',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>../../',
  }),
}
