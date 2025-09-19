module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2020,
  },
  extends: [
    "eslint:recommended",
  ],
  rules: {
    "no-console": "off",
    "quotes": ["error", "single", {"allowTemplateLiterals": true}],
  },
  globals: {},
};
