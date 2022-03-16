module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  ignorePatterns: ['dist/*'], // Do not run eslint on dist files.
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 'off', // Support export const x = 1; instead of export default x = 1;
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }], // So we don't need extensions on ts imports.
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow console.warn and console.error but no console.log.
    'max-len': ['error', { code: 120 }], // Max line length = 120.

    // Disable the base 'no-unused-vars' rule as it can report incorrect errors for Typescript files.
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  settings: {
    'import/resolver': { node: { extensions: ['.ts'] } }, // So we don't need extensions on ts imports.
  },
};
