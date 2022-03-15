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
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }], // Dont need to provide extensions to ts imports.
    'no-console': ['error', { allow: ['warn', 'error'] }], // Allow console.warn and console.error but no console.log.
  },
  settings: {
    // Dont need to provide extensions to ts imports.
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
