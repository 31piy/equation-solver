const { ops, opSpecs } = require("./common");

/**
 * Represents an equation.
 */
class Equation {
  /**
   * The collection of variables inside this equation.
   *
   * @type {string[]}
   */
  vars = [];

  /**
   * The infix expression of this equation.
   *
   * @type {string}
   */
  originalExpr;

  /**
   * The postfix expression of this equation.
   *
   * @type {string}
   */
  postfixExpr;

  /**
   * The unique ID assigned to this equation.
   *
   * @type {number}
   */
  id;

  /**
   * Returns a new instance of an equation.
   *
   * @param {number} id The unique ID of this equation.
   * @param {string} expr The mathematical expression of this equation.
   */
  constructor(id, expr) {
    if (!id) {
      throw new Error("ID is required to create an equation");
    }

    if (!expr) {
      throw new Error("Expression is required to create an equation.");
    }

    this.id = id;
    this.originalExpr = expr;
    this.parse(expr);
  }

  /**
   * Returns the infix expression of this equation.
   */
  get expression() {
    return this.originalExpr;
  }

  /**
   * Updates the infix expression of this equation.
   *
   * @param {string} expr The new expression to update.
   */
  set expression(expr) {
    if (!expr) {
      throw new Error("Expression is required to update this equation.");
    }

    this.originalExpr = expr;
    this.parse(expr);
  }

  /**
   * Returns the answer of this equation by substituting appropriate
   * variable values and solving it.
   *
   * @param {object} varsMap The map of variable values.
   * @returns {number} The result of this equation.
   */
  solve(varsMap) {
    const providedVars = Object.keys(varsMap);

    for (const v of this.vars) {
      if (!providedVars.includes(v)) {
        throw new Error(`Undefined variable ${v} to solve the equation.`);
      }
    }

    const stack = [];
    const chars = this.postfixExpr.split("");

    for (let i = 0; i < chars.length; i++) {
      if (/[a-z]+/i.test(chars[i])) {
        stack.push(varsMap[chars[i]]);
      } else if (ops.includes(chars[i])) {
        const op2 = stack.pop();
        const op1 = stack.pop();

        stack.push(opSpecs[chars[i]].action(op1, op2));
      }
    }

    return stack.pop();
  }

  /**
   * Parses the infix expression and converts it to its postfix equivalent.
   * The core logic is referred from [GeeksForGeeks][1] and converted to
   * JavaScript.
   *
   * @param {string} expr The infix expression.
   *
   * [1]: https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/
   */
  parse(expr) {
    if (!expr.length) {
      return;
    }

    // Extract the characters in the expr, and ignore the whitespaces.
    const chars = expr.split("").filter((c) => !!c.trim());

    // Stores the postfix expression.
    const output = [];

    // Stack for intermediate operations.
    const stack = [];

    // Stores the variables of the epxression.
    const vars = [];

    for (let i = 0; i < chars.length; i++) {
      if (/[a-z0-9]+/i.test(chars[i])) {
        output.push(chars[i]);
        vars.push(chars[i]);
      } else if (chars[i] === "(") {
        stack.push(chars[i]);
      } else if (chars[i] === ")") {
        while (stack.length && stack[stack.length - 1] !== "(") {
          output.push(stack.pop());
        }

        stack.pop();
      } else if (ops.includes(chars[i])) {
        while (
          stack.length &&
          opSpecs[chars[i]].precedence >
            (opSpecs[stack[stack.length - 1]]
              ? opSpecs[stack[stack.length - 1]].precedence
              : Number.POSITIVE_INFINITY)
        ) {
          output.push(stack.pop());
        }

        stack.push(chars[i]);
      } else {
        throw new Error(`Invalid character in expression at index ${i}`);
      }
    }

    while (stack.length) {
      if (stack[stack.length] === "(") {
        throw new Error(`Invalid expression`);
      }

      output.push(stack.pop());
    }

    // Store the postfix expression and variables.
    this.postfixExpr = output.join("");
    this.vars = vars;
  }
}

module.exports = Equation;
