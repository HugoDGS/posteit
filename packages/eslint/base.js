import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import prettier from 'eslint-config-prettier/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

/**
 * Socle commun à tout le monorepo : TypeScript typé strict, qualité et tri.
 * Prettier s'occupe de la mise en forme : eslint-config-prettier coupe les
 * règles qui la contredisent, et @stylistic ne garde que ce que Prettier ne
 * traite pas (lignes vides, commentaires).
 */
export default defineConfig(
  globalIgnores(['**/dist/', '**/coverage/', '**/generated/', '**/*.d.ts']),
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      unicorn.configs.recommended,
      sonarjs.configs.recommended,
      perfectionist.configs['recommended-natural'],
      prettier,
    ],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error',
    },
    name: 'posteit/base',
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let'] },
        { blankLine: 'any', next: ['const', 'let'], prev: ['const', 'let'] },
      ],
      '@stylistic/spaced-comment': ['error', 'always', { markers: ['/'] }],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: { args: true, env: true, params: true, Props: true, props: true },
        },
      ],
    },
  },
);
