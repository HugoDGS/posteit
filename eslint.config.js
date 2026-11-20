import base from '@posteit/eslint/base';
import nest from '@posteit/eslint/nest';
import react from '@posteit/eslint/react';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    extends: [base],
    files: ['*.{js,ts}', 'packages/**'],
  },
  {
    extends: [react],
    files: ['apps/front/**'],
  },
  {
    extends: [nest],
    files: ['apps/**'],
    ignores: ['apps/front/**'],
  },
  {
    languageOptions: {
      parserOptions: { tsconfigRootDir: import.meta.dirname },
    },
  },
);
