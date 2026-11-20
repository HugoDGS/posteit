import { defineConfig } from 'eslint/config';
import globals from 'globals';

import base from './base.js';

/** Services NestJS, gateway et job-runner. */
export default defineConfig(base, {
  files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
  languageOptions: {
    globals: globals.node,
  },
  name: 'posteit/nest',
  rules: {
    // L'injection de dépendances lit les types des constructeurs à l'exécution
    // (emitDecoratorMetadata) : un `import type` casserait l'injection.
    '@typescript-eslint/consistent-type-imports': 'off',
    // Modules et contrôleurs Nest sont des classes portées par leurs décorateurs.
    '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
    // Un service compilé en CommonJS ne peut pas utiliser le top-level await.
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          args: true,
          Dto: true,
          dto: true,
          env: true,
          params: true,
          req: true,
          res: true,
        },
      },
    ],
  },
});
