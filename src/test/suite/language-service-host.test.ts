import * as assert from "assert";
import * as ts from "typescript";
import * as vscode from "vscode";
// import { isUndefined } from "lodash-es";

import LanguageServiceHost from "../../v2/language-service-host";
import { SUIT_1_FILE_PATH, openDocument } from "../utils/vscode";
import { getActiveNode } from "../../utils/language-service";

const isUndefined = (val: unknown) => val === undefined;

const initLanguageService = () => {
  const languageServiceHost = new LanguageServiceHost();
  const languageService = ts.createLanguageService(
    languageServiceHost,
    ts.createDocumentRegistry()
  );

  return {
    lsh: languageServiceHost,
    ls: languageService,
  };
};

suite("LanguageServiceHost Test Suite", async () => {
  test("getActiveNode failed", async () => {
    await openDocument(SUIT_1_FILE_PATH);
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
      return;
    }
    activeEditor.selection = new vscode.Selection(
      new vscode.Position(0, 0),
      new vscode.Position(0, 5)
    );
    const { lsh, ls } = initLanguageService();
    const result = getActiveNode(lsh, ls);
    assert.strictEqual(isUndefined(result), true);
  });

  test("getActiveNode successful", async () => {
    await openDocument(SUIT_1_FILE_PATH);
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
      return;
    }
    activeEditor.selection = new vscode.Selection(
      new vscode.Position(5, 0),
      new vscode.Position(7, 0)
    );
    const { lsh, ls } = initLanguageService();
    const result = getActiveNode(lsh, ls);
    assert.strictEqual(isUndefined(result), false);
  });
});
