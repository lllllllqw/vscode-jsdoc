
import * as path from "path";
import * as vscode from "vscode";

export const TEST_WORKSPACE_PATH = vscode.Uri.file(path.resolve(__dirname, "../../../src/test/test-workspace"));
export const SUIT_1_FILE_PATH = vscode.Uri.joinPath(TEST_WORKSPACE_PATH, "suit1.ts");

export const openDocument = async (file: vscode.Uri): Promise<readonly [vscode.TextDocument, vscode.TextEditor]> => {
  const document = await vscode.workspace.openTextDocument(file);
  const editor = await vscode.window.showTextDocument(document);
  return [document, editor];
};