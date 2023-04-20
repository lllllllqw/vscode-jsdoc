import { JSDocBuilderOptions, JSDocBlock, JSDocStruct, ParamBlock, ReturnsBlock } from "../types";

class JSDocBuilder {
  struct: JSDocStruct = {
    blocks: []
  };

  options: JSDocBuilderOptions = {
    ignoreIdentifierType: false,
  };

  setOptions(options: Partial<JSDocBuilderOptions> = {}) {
    this.options = {
      ...this.options,
      ...options,
    };
    return this;
  }

  addBlock(block: JSDocBlock) {
    this.struct.blocks.push(block);
    return this;
  }

  /**
   * 
   * @returns 
   */
  build() {
    const {ignoreIdentifierType } = this.options;
    const startStr = `/**`;
    const blocksStr = this.struct.blocks.map(block => {
      switch (block.blockType) {
        case 'description': {
          return ` * ${block.description}`;
        }
        case 'param': {
          const typeStr = ignoreIdentifierType ? '' : ` ${this.buildTypeStr(block.type)}`;
          return ` * @param${typeStr} ${block.name} ${block.description}`;
        }
        case 'returns': {
          const typeStr = ignoreIdentifierType ? '' : ` ${this.buildTypeStr(block.type)}`;
          return ` * @returns${typeStr} ${block.description}`;
        }
      }
    }).join('\n');
    const endStr = ` */`;
    
    return `${startStr}${blocksStr ? `\n${blocksStr}` : ''}\n${endStr}`;
  }

  private buildTypeStr(type?: string) {
    return `{${type ?? 'unknown'}}`;
  }
}

export {
  JSDocBuilder
};