import globals from 'globals';
import jseslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwind from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2020,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      jseslint.configs.recommended,
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
      react.configs.flat.recommended,
      ...tailwind.configs['flat/recommended']
    ],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      'unused-imports/no-unused-imports': 'error',

      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message: '`React` is already a global variable.'
            },
            { name: 'clsx', message: 'Use `cx` instead of `clsx`.' },
            { name: 'tailwind-merge', message: 'Use `cx` instead of `twMerge`.' }
          ]
        }
      ],

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  }
);
