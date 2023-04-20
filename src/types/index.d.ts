import * as ts from "typescript";

export type ActiveNode = ts.FunctionDeclaration

export interface JSDocBuilderOptions {
  ignoreIdentifierType: boolean,
}

export interface DescriptionBlock {
  blockType: 'description'
  description: string
}

export interface ParamBlock {
  blockType: 'param'
  name: string
  type?: string
  description?: string
}

export interface ReturnsBlock {
  blockType: 'returns'
  type?: string
  description?: string
}

export type JSDocBlock = DescriptionBlock | ParamBlock | ReturnsBlock

export interface JSDocStruct {
  blocks: JSDocBlock[]
}
