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
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
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
    'object-curly-spacing': ['error', 'always']
  },
};