import * as ts from "typescript";

export const eachNode = (node: ts.Node, callback: (node: ts.Node) => void) => {
  callback(node);
  node.forEachChild((node) => {
    eachNode(node, callback);
  });
};
