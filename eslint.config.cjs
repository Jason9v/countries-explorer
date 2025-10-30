module.exports = [
  { ignores: ['node_modules', 'dist', 'build', '.vite', '.env', 'public'] },

  require('eslint-config-prettier'),

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: { ecmaVersion: 2020, sourceType: 'module', ecmaFeatures: { jsx: true } },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
]
