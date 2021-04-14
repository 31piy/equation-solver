/**
 * The map of individual supported operator and their specificatiions.
 *
 * Specifications:
 *   precedence  - describes the precedence of the opeators. The smaller the
 *                 value, the higher the precendence.
 *   action      - a function, which is called with two operands to execute the
 *                 operator on those operands.
 */
const opSpecs = {
  "^": {
    precedence: 0,
    action: (a, b) => a ** b,
  },
  "*": {
    precedence: 1,
    action: (a, b) => a * b,
  },
  "/": {
    precedence: 1,
    action: (a, b) => a / b,
  },
  "+": {
    precedence: 2,
    action: (a, b) => a + b,
  },
  "-": {
    precedence: 2,
    action: (a, b) => a - b,
  },
};

/**
 * An array of supported operators.
 */
const ops = Object.keys(opSpecs);

module.exports = {
  opSpecs,
  ops,
};
