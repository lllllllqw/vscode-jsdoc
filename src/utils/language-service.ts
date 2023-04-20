import * as path from "path";
import * as ts from "typescript";
import * as vscode from "vscode";
import LanguageServiceHost from "../v2/language-service-host";
import { ActiveNode } from "../types";

export function getDocumentFileName(document: vscode.TextDocument) {
  // Fix directory delimiters
  const fileName = fixWinPath(document.fileName);

  // Determine if this is a TypeScript document
  const isTypeScript =
    document.languageId === "typescript" ||
    document.languageId === "typescriptreact";

  // Append ".js" if this is not a TypeScript document, but the extension is not ".js"
  // TypeScript's file resolution for allowJs seems to ignore documents if they're missing the extension
  const adjustedFileName =
    !isTypeScript && path.extname(fileName) !== "js"
      ? fileName + ".js"
      : fileName;
  return ts.sys.useCaseSensitiveFileNames
    ? adjustedFileName.toLowerCase()
    : adjustedFileName;
}

export const isTypeScript = (): boolean => {
  // TODO: ext name is not ts，like tsx or vue
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return false;
  }
  const textDocument = activeEditor.document;
  const fileName = getDocumentFileName(textDocument);
  if(fileName.endsWith('.ts')) {
    return true;
  }
  return false;
};

export function fixWinPath(filePath: string) {
  if (path.sep === "\\") {
    return filePath.replace(/\\/g, "/");
  }

  return filePath;
}

export const getActiveNode = (
  languageServiceHost: LanguageServiceHost,
  languageService: ts.LanguageService
): ActiveNode | undefined => {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return;
  }
  const textDocument = activeEditor.document;
  const fileName = getDocumentFileName(textDocument);
  const fileContent = textDocument.getText();
  languageServiceHost.updateScriptFile(fileName, fileContent);
  languageService.getSyntacticDiagnostics(fileName);
  const program = languageService.getProgram();
  if (!program) {
    return;
  }
  const sourceFile = program.getSourceFile(fileName);
  if (!sourceFile) {
    return;
  }
  const selectionStart = activeEditor.document.offsetAt(
    activeEditor.selection.start
  );
  const selectionEnd = activeEditor.document.offsetAt(
    activeEditor.selection.end
  );
  let result = ts.forEachChild<ActiveNode>(
    sourceFile,
    (node): ActiveNode | undefined => {
      if (ts.isFunctionDeclaration(node)) {
        if (node.pos <= selectionStart || node.end <= selectionEnd) {
          return node;
        }
      }
    }
  );

  return result;
};

// function handleFunctionDeclaration() {
//     if (node.pos <= selectionStart || node.end <= selectionEnd) {
//         const name = node.name?.escapedText.toString() ?? '';
//         const args = node.parameters.map((param => {
//           return {
//             name: ts.isIdentifier(param.name) ? param.name.escapedText.toString() : 'unknown',
//             type: param.type,
//           };
//         }));
//         return {
//           name,
//           args
//         };
//       }
// }
