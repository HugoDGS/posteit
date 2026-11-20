/** @type {import('lint-staged').Configuration} */
export default {
  '*': 'prettier --write --ignore-unknown',
  '*.{js,mjs,cjs,ts,mts,cts,tsx}': 'eslint --fix --max-warnings=0',
};
