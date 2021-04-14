const { ops, opSpecs } = require("./common");

/**
 * Represents a container equation.
 *
 * A container equation is a wrapper around two equations. The result of a
 * container equation is obtained by evaluating both underlying equations and
 * applying the specified operator on the results obtained.
 */
class ContainerEquation {
  /**
   * ID of this equation.
   *
   * @type {number}
   */
  id;

  /**
   * The first equation of this container equation.
   *
   * @type {Equation}
   */
  eq1;

  /**
   * The second equation of this container equation.
   *
   * @type {Equation}
   */
  eq2;

  /**
   * The operator to apply.
   *
   * @type {string}
   */
  operator;

  /**
   * Returns a new instance of the container equation.
   *
   * @param {number} id The unique ID of the equation.
   * @param {Equation} eq1 The first equation object.
   * @param {Equation} eq2 The second equation object.
   * @param {string} operator The operator to apply.
   */
  constructor(id, eq1, eq2, operator) {
    if (!id) {
      throw new Error("ID must be specified");
    }

    if (!eq1 || !eq2) {
      throw new Error("Equations must be specified");
    }

    if (!ops.includes(operator)) {
      throw new Error("Invalid operator");
    }

    this.id = id;
    this.eq1 = eq1;
    this.eq2 = eq2;
    this.operator = operator;
  }

  /**
   * Returns the ID of this equation.
   */
  get id() {
    return this.id;
  }

  /**
   * Returns the answer of this equation by solving individual equations, and
   * applying the operator on the results obtained.
   *
   * @param {object} varsMap The map of variable values to substitute in
   *   individual equations.
   * @returns {number} The result of this equation.
   */
  solve(varsMap) {
    return opSpecs[this.operator].action(
      this.eq1.solve(varsMap),
      this.eq2.solve(varsMap)
    );
  }
}

module.exports = ContainerEquation;
