import * as ts from "typescript";
import * as vscode from "vscode";
import LanguageServiceHost from './language-service-host';
import { getActiveNode, getDocumentFileName } from "../utils/language-service";

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
const languageService = ts.createLanguageService(languageServiceHost, ts.createDocumentRegistry());

const genJSDocV2 = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const node = getActiveNode(languageServiceHost, languageService);

  if(node) {
    if(node.parameters[1].initializer?.kind === ts.SyntaxKind.NumericLiteral) {
      console.log('第二个参数是数字');
      
    }
    
  }
  
};

export {
  genJSDocV2
};