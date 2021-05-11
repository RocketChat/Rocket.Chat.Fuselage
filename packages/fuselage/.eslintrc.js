module.exports = {
  extends: '@rocket.chat/eslint-config-alt/react',
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/display-name': 'off',
    'react/no-multi-comp': 'off',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useIsomorphicLayoutEffect)',
      },
    ],
  },
  env: {
    jest: true,
  },
  overrides: [
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended'],
      parserOptions: {
        parser: '@babel/eslint-parser',
      },
      rules: {
        'new-cap': 'off',
        'prefer-arrow-callback': 'off',
        'semi': 'off',
      },
    },
  ],
};
