import * as ts from "typescript";
import * as vscode from "vscode";
import LanguageServiceHost from "./language-service-host";
import { getActiveNode, isTypeScript } from "../utils/language-service";
import { JSDocBuilder } from "../utils/jsdoc-builder";
import { ParamBlock } from "../types";

// const supportedNodeKinds = [
//   ts.SyntaxKind.ClassDeclaration,
//   ts.SyntaxKind.PropertyDeclaration,
//   ts.SyntaxKind.GetAccessor,
//   ts.SyntaxKind.SetAccessor,
//   ts.SyntaxKind.InterfaceDeclaration,
//   ts.SyntaxKind.EnumDeclaration,
//   ts.SyntaxKind.EnumMember,
//   ts.SyntaxKind.FunctionDeclaration,
//   ts.SyntaxKind.ArrowFunction,
//   ts.SyntaxKind.MethodDeclaration,
//   ts.SyntaxKind.MethodSignature,
//   ts.SyntaxKind.PropertySignature,
//   ts.SyntaxKind.Constructor,
//   ts.SyntaxKind.FunctionExpression,
//   ts.SyntaxKind.VariableDeclaration,
//   ts.SyntaxKind.CallSignature,
//   ts.SyntaxKind.VariableDeclarationList,
// ];

const languageServiceHost = new LanguageServiceHost();
const languageService = ts.createLanguageService(
  languageServiceHost,
  ts.createDocumentRegistry()
);

const genJSDocV2 = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const node = getActiveNode(languageServiceHost, languageService);
  if (!node) {
    return;
  }
  const ignoreIdentifierType = isTypeScript();
  let docStr = '';
  if (ts.isFunctionDeclaration(node)) {
    const bd = new JSDocBuilder();
    bd.setOptions({
      ignoreIdentifierType,
    }).addBlock({
      blockType: "description",
      description: vscode.l10n.t("Description"),
    });
    const paramBlockList = node.parameters.map<ParamBlock>((p) => {
      return {
        blockType: "param",
        name: p.name.getText(),
        description: vscode.l10n.t("Description"),
      };
    });
    paramBlockList.forEach((block) => {
      bd.addBlock(block);
    });
    docStr = bd.build();
  }

  const position = ts.getLineAndCharacterOfPosition(node.getSourceFile(),node.getStart());
};

export { genJSDocV2 };
