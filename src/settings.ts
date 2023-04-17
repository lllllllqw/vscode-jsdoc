import * as vscode from "vscode";

const getSettings = () => vscode.workspace.getConfiguration('jsdoc');

export const getAuthor = (): string => getSettings().get('Author') || '';

export const getDateEnabled = (): boolean => getSettings().get('EnabledDate') || false;
