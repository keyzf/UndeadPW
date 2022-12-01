module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    es6: true,
    mocha: true
  },
  extends: [
    "google",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended"
  ],
  plugins: [
    "@typescript-eslint"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  rules: {
    semi: "off",
    "max-len": ["error", 120],
    quotes: ["off", "single", {allowTemplateLiterals: true}],
    "spaced-comment": "off",
    "linebreak-style": ["off", "unix"],
    "comma-dangle": "off",
    "space-before-function-paren": ["off"],
    "arrow-parens": "off",
    "space-infix-ops": "off",
    "keyword-spacing": "off",
    "no-invalid-this": "off",
    "require-jsdoc": "off",
    "new-cap": "off",
    "valid-jsdoc": "off",
    "object-curly-spacing": ["warn", "never"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-namespace": "off",
    "cypress/no-unnecessary-waiting": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-tabs": "off",
    "no-tabs": "off",
    "guard-for-in": "off",
    indent: ["warn", 2, {SwitchCase: 1}]
  }
}
