import * as vscode from 'vscode';
import { getFormatDate } from './utils/date';
import * as settings from './settings';

export const genJSDoc = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  // 获取 selection 对象(其中包含当前选择的行与字符)
  const selection = editor.selection;
  // 获取选中的内容
  const selectionText = editor.document.getText(selection);
  const getParamReg = /\(([^)]*)\)/;
  // 获取参数列表, 去除其中的空格与回车
  const m = selectionText.match(getParamReg);
  if(!m) {
    return;
  }
  const paramList = m[1].replace(/[\t\s\r]/g, '').split(',').filter(s => s !== '');

  editor.edit(editBuilder => {
    // 取上一行的末尾作为插入点
    const selectionLine = editor.document.lineAt(selection.start.line);
    const insertPosition = selectionLine.range.start;
    let text = '/**\r';
    text += `* ${vscode.l10n.t('Description')}\r`;
    // 作者
    const author = settings.getAuthor();
    author && (text += `* @author ${author}\r`);
    // 日期
    const dateEnabled = settings.getDateEnabled();
    dateEnabled && (text += `* @date ${getFormatDate('YYYY-MM-DD',new Date())}\r`);
    // 参数
    text += paramList
      .map(paramName => `* @param {any} ${paramName}\r`)
      .join('');
    // 返回值
    text += `* @returns {any}\r`;
    text += `*/\r`;

    // 填充行头的空格
    const whitespace = selectionLine.firstNonWhitespaceCharacterIndex;
    const padSpaceStr = ' '.repeat(whitespace);
    text = text.replace(/\r/g, `\r${padSpaceStr} `);
    text = `${padSpaceStr}${text}`;
    text = text.slice(0, text.length - whitespace - 1);

    // 插入注释
    editBuilder.insert(insertPosition, text);
  });
};
