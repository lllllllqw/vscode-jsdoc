import * as vscode from 'vscode'
import { createJSDoc } from './main'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'extension.createJSDoc',
    createJSDoc
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
