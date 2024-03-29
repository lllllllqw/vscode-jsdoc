import * as vscode from 'vscode';
import { genJSDoc } from './main';
import { genJSDocV2 } from './v2/main-v2';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'jsdoc.generateJSDoc',
    genJSDoc,
  );
  const disposableV2 = vscode.commands.registerCommand(
    'jsdoc.generateJSDocV2',
    genJSDocV2,
  );

  context.subscriptions.push(disposable, disposableV2);
}

export function deactivate() {}
