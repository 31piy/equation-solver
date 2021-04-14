const EquationManager = require("./manager");

const manager = new EquationManager();

const eq1 = manager.createEquation("a / b + a / b * c");
console.log(manager.solveEquation(eq1, { a: 10, b: 5, c: 10 })); // 2.2

manager.editEquation(eq1, "a / b + (a / b) * c");
console.log(manager.solveEquation(eq1, { a: 10, b: 5, c: 10 })); // 22

const eq2 = manager.createEquation("x^y+z+c");
console.log(manager.solveEquation(eq2, { x: 10, y: 2, z: 3, c: 4 })); // 107

const eq3 = manager.mergeEquations(eq1, eq2, "+");
console.log(
  manager.solveEquation(eq3, { a: 10, b: 5, c: 10, x: 10, y: 2, z: 3, c: 4 })
); // 117

manager.editEquation(eq2, "x^y+z-c");
console.log(
  manager.solveEquation(eq3, { a: 10, b: 5, c: 10, x: 10, y: 2, z: 3, c: 4 })
); // 109
