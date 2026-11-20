import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import base from './base.js';

// Les types d'eslint-plugin-react déclarent ces configs optionnelles.
const reactRecommended = react.configs.flat['recommended'];
const reactJsxRuntime = react.configs.flat['jsx-runtime'];

if (!reactRecommended || !reactJsxRuntime) {
  throw new Error('eslint-plugin-react ne fournit pas ses configs flat.');
}

/** Front React avec Vite. */
export default defineConfig(base, {
  extends: [reactRecommended, reactJsxRuntime, reactHooks.configs.flat['recommended-latest']],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    globals: globals.browser,
  },
  name: 'posteit/react',
  rules: {
    // Les composants sont en PascalCase, le reste en kebab-case.
    'unicorn/filename-case': ['error', { cases: { kebabCase: true, pascalCase: true } }],
  },
  settings: {
    react: { version: 'detect' },
  },
});
