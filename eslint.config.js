// @ts-check
const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const angular = require('angular-eslint')

module.exports = tseslint.config(
  {
    ignores: ['dist/**', 'umd/**', 'coverage/**', 'node_modules/**', '.cache/**', 'tmp/**', 'backups/**', '**/*.mjs'],
  },
  {
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }],
    },
  },
  {
    // The publishable library uses its own selector prefixes.
    files: ['projects/nge/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: ['nge', 'ui'], style: 'camelCase' }],
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: ['nge', 'ui'], style: 'kebab-case' }],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  }
)
