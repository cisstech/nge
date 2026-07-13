/** Plain Node TypeScript package: ts-jest in a node environment, CommonJS for the test run. */
module.exports = {
  displayName: 'nge-doc-mcp',
  testEnvironment: 'node',
  testMatch: ['**/+(*.)+(spec).ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      { tsconfig: { module: 'commonjs', esModuleInterop: true, skipLibCheck: true, types: ['jest', 'node'] } },
    ],
  },
  coverageDirectory: '<rootDir>/coverage/nge-doc-mcp',
}
