module.exports = {
  'env': {
      'browser': true,
      'es2021': true,
      node: true,
  },
  'extends': [
      'eslint:recommended',
      "plugin:@typescript-eslint/recommended",
      'plugin:vue/vue3-essential',
  ],
  'parserOptions': {
      'ecmaVersion': 12,
      'sourceType': 'module',
      parser: '@typescript-eslint/parser',
  },
  'plugins': [
      'vue',
      '@typescript-eslint',
  ],
  'rules': {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      'vue/multi-word-component-names': 'off',
      'vue/object-curly-spacing': [2, 'always',],
      'vue/html-closing-bracket-spacing': [2, {
          'selfClosingTag': 'always',
      },],
      'vue/singleline-html-element-content-newline': ['error', {
        'ignoreWhenNoAttributes': false,
        'ignoreWhenEmpty': true,
      }],
      'vue/html-indent': ['error', 2, {
        'attribute': 1,
        'closeBracket': 0,
        'alignAttributesVertically': true,
        'ignores': [],
      }],
      'vue/max-attributes-per-line': [2, {
          'singleline': {
              'max': 1,
          },
          'multiline': {
              'max': 1,
          },
      },],
      'vue/script-indent': ['error', 3, {
        'baseIndent': 1,
        'switchCase': 1,
        'ignores': []
    }],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': [
        'error',
        {
          'before': true,   // Enforce a space before keywords (e.g., if, else, for)
          'after': true,    // Enforce a space after keywords (e.g., if, else, for)
          'overrides': {
            'if': { 'after': true }, // You can override specific keywords
          }
        }
      ],
      'semi': ['error', 'always',],
  }
};