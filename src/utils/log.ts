import * as vscode from 'vscode';

const showClientLog = (message: string) => {
  if(process.env.NODE_ENV === 'development') {
    vscode.window.showInformationMessage(message);
  }
};

export {
  showClientLog
};