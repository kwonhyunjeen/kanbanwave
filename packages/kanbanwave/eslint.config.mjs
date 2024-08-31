import globals from 'globals';
import jseslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    extends: [
      jseslint.configs.recommended,
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
      react.configs.flat.recommended
    ],
    plugins: {
      'react-hooks': reactHooks,
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
            }
          ]
        }
      ],

      'react/react-in-jsx-scope': 'off'
    }
  }
);
