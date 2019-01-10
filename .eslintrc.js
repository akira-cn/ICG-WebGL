module.exports = {
  globals: {
    spritejs: true,
    WebGLUtils: true,
    glMatrix: true,
  },
  extends:  "eslint-config-sprite",
  plugins: ['html'],
  rules: {
    "complexity": ["warn", 25],
    'import/prefer-default-export': 'off',
  },
}
