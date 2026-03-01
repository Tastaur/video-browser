import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';


export default defineConfig([
  globalIgnores([
    'dist',
    'build',
    'coverage',
    'azure',
    '*.svg',
    '/*.js',
    'vite.config.ts',
    'vitest.config.ts',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',

      // Formatting
      'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
      'max-len': ['error', {
        code: 120,
        ignorePattern: "import \\{?\\s?.*\\s?\\}? from '.*';",
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      }],
      'curly': ['error', 'all'],

      // Restricted imports
      'no-restricted-imports': ['error', {
        paths: [
          {
            name: 'react-redux',
            importNames: ['useSelector'],
            message: "Please import 'useSelector' from 'store/hooks'",
          },
          {
            name: '@mui/styles',
            message: "Please use '@mui/material' imports",
          },
          {
            name: '@mui/system',
            message: "Please use '@mui/material' imports",
          },
        ],
      }],

      // TypeScript
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      }],
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-use-before-define': 'off',

      // Formatting
      'indent': ['error', 2, { SwitchCase: 1 }],
      'semi': ['error'],

      // Other
      'no-negated-condition': 'error',
      'prefer-template': 'error',
      'yoda': ['error', 'always', { onlyEquality: true }],
    },
  },
]);
