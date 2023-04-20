import * as assert from "assert";
import * as ts from "typescript";
import * as path from "path";
import * as fs from "fs";
import { eachNode } from "../../utils/ast";

const codeSample = fs.readFileSync(
  path.join(__dirname, "../test-workspace/suit1.ts"),
  { encoding: "utf-8" }
);


suite("ast", () => {
  test("find correct function node", () => {
    const ast = ts.createSourceFile(
      "suit1.ts",
      codeSample,
      ts.ScriptTarget.Latest,
      true
    );
    let count = 0;
    eachNode(ast, (node) => {
      if (ts.isFunctionDeclaration(node)) {
        // Function Declare
        // Inner function
        count += 1;
      }
      if (
        ts.isFunctionExpression(node) &&
        ts.isVariableDeclaration(node.parent)
      ) {
        // Anonymous function
        count += 1;
      }
      if (ts.isArrowFunction(node) && ts.isVariableDeclaration(node.parent)) {
        // Arrow function
        count += 1;
      }
      if (ts.isArrowFunction(node) && ts.isPropertyDeclaration(node.parent)) {
        // Member function with arrow function
        count += 1;
      }
      if (ts.isMethodDeclaration(node)) {
        // Member function
        count += 1;
      }
    });
    assert.strictEqual(count, 6);
  });
});
