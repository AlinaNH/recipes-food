module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'google'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist/*'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'operator-linebreak': ['error', 'before'],
    'linebreak-style': 'off',
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 2,
        'VariableDeclarator': 'first',
        'FunctionDeclaration': {
          'parameters': 'first'
        },
        'FunctionExpression': {
          'parameters': 'first'
        },
        'CallExpression': {
          'arguments': 'first'
        },
        'flatTernaryExpressions': false
      }
    ],
    'object-curly-spacing': ['error', 'always'],
    'no-unused-vars': 'off',
    'require-jsdoc': 'off',
    'new-cap': 'off',
    'max-len': 'off',
    'comma-dangle': 'off'
  },
};
