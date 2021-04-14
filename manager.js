const Equation = require("./equation");
const ContainerEquation = require("./container-equation");

/**
 * A manager of the equations.
 */
class EquationManager {
  /**
   * A local variable to keep track of the currently generated IDs.
   */
  idCounter = 0;

  /**
   * The collection of equations this manager is managing.
   */
  equations = [];

  /**
   * Creates a new equation.
   *
   * @param {string} expression An infix expression of the equation.
   * @returns The ID of the newly created equation.
   */
  createEquation(expression) {
    const eq = new Equation(++this.idCounter, expression);
    this.equations.push(eq);
    return eq.id;
  }

  /**
   * Updates an existing equation by its ID.
   *
   * @param {number} id The ID of the equation.
   * @param {string} expression An infix expression to update in the equation.
   */
  editEquation(id, expression) {
    const eq = this.equations.find((e) => e.id === id);

    if (!eq) {
      throw new Error(`Equation with ID ${id} doesn't exist`);
    }

    eq.expression = expression;
  }

  /**
   * Deletes an equation using its ID.
   *
   * @param {number} id The ID of the equation.
   */
  deleteEquation(id) {
    const eqIndex = this.equations.findIndex((e) => e.id === id);

    if (eqIndex === -1) {
      throw new Error(`Equation with ID ${id} doesn't exist`);
    }

    this.equations.splice(eqIndex, 1);
  }

  /**
   * Merges two equations using an operator and returns a new merged equation.
   *
   * A merged equation doesn't modify the passed equations, but can be
   * affected by modifications made in the passed equations.
   *
   * @param {number} eq1 ID of the first equation.
   * @param {number} eq2 ID of the second equation.
   * @param {string} operator The operator to apply while merging.
   * @returns {number} The ID of the newly created merged equation.
   */
  mergeEquations(eq1, eq2, operator) {
    const equation1 = this.equations.find((e) => e.id === eq1);

    if (!equation1) {
      throw new Error(`Equation with ID ${eq1} doesn't exist`);
    }

    const equation2 = this.equations.find((e) => e.id === eq2);

    if (!equation2) {
      throw new Error(`Equation with ID ${eq2} doesn't exist`);
    }

    const newEquation = new ContainerEquation(
      ++this.idCounter,
      equation1,
      equation2,
      operator
    );

    this.equations.push(newEquation);
    return newEquation.id;
  }

  /**
   * Solves an equation against a map of variable values.
   *
   * @param {number} id The unique ID of an existing equation.
   * @param {object} varsMap The map of variables and values.
   * @returns {number} The result of the equation.
   */
  solveEquation(id, varsMap = {}) {
    const eq = this.equations.find((e) => e.id === id);

    if (!eq) {
      throw new Error(`Equation with ID ${id} doesn't exist`);
    }

    return eq.solve(varsMap);
  }
}

module.exports = EquationManager;
