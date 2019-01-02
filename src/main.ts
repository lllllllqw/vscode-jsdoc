import * as vscode from 'vscode'
import { getFormatDate } from './date'

export const createJSDoc = () => {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    return
  }

  // 获取 selection 对象(其中包含当前选择的行与字符)
  const selection = editor.selection
  // 获取选中的内容
  const selectionText = editor.document.getText(selection)
  const getParamReg = /\(([^)]*)\)/
  // 获取参数列表, 去除其中的空格与回车
  const m = selectionText.match(getParamReg)
  if(!m) {
    return
  }
  const paramList = m[1].replace(/[\t\s\r]/g, '').split(',').filter(s => s !== '')

  editor.edit(editBuilder => {
    // 取上一行的末尾作为插入点
    const prevLine = editor.document.lineAt(selection.start.line - 1)
    const insertPosition = prevLine.range.end
    let text = `\r`
    text += `/**\r`
    text += `* 描述\r`
    // 作者
    const configuration = vscode.workspace.getConfiguration('jsdoc');
    const author: string = configuration.get('author') || ''
    author && (text += `* @author ${author}\r`)
    // 日期
    text += `* @date ${getFormatDate('YYYY-MM-DD',new Date())}\r`
    // 参数
    text += paramList
      .map(paramName => `* @param {any} ${paramName}\r`)
      .join('')
    // 返回值
    text += `* @returns {any}\r`
    text += `*/`

    // 填充行头的空格
    const whitespace = editor.document.lineAt(selection.start.line).firstNonWhitespaceCharacterIndex
    const padSpaceStr = Array.from({length: whitespace}, () => ' ').join('')
    text = text.replace(/\r/g, `\r${padSpaceStr}`)

    // 插入注释
    editBuilder.insert(insertPosition, text)
  })
}