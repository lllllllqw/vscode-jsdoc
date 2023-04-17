import * as ts from 'typescript';

class LanguageServiceHost implements ts.LanguageServiceHost {
  #files: Record<string, { text: string, version: number }> = {};

  updateScriptFile(fileName: string, fileContent: string) {
    if(!this.#files[fileName]) {
      this.#files[fileName] = {
        text: fileContent,
        version: 0,
      };
    } else {
      this.#files[fileName].version = this.#files[fileName].version + 1;
      this.#files[fileName].text = fileContent;
    }
  }
  
  getScriptVersion = (fileName: string) => {
    return this.#files[fileName] && this.#files[fileName].version.toString();
  };
  
  getScriptFileNames = () => {
    return Object.keys(this.#files);
  };

  getScriptSnapshot = (fileName: string) => {
    return ts.ScriptSnapshot.fromString(this.#files[fileName] ? this.#files[fileName].text : '');
  };

  getCompilationSettings = () => {
    // return ts.getDefaultCompilerOptions();
    return {
      allowJs: true,
    };
  };

  getDefaultLibFileName = ts.getDefaultLibFileName;
  readFile = ts.sys.readFile;
  fileExists = ts.sys.fileExists;
  getCurrentDirectory = ts.sys.getCurrentDirectory;


  // updateCurrentFile(fileName: string, fileText: string) {
  //   Object.keys(this.#files).forEach((existingFileName) => {
  //     Reflect.deleteProperty(this.#files[existingFileName], 'text');
  //   });

  //   if (this.#files[fileName]) {
  //     this.#files[fileName].version += 1;
  //     this.#files[fileName].text = fileText;
  //   } else {
  //     this.#files[fileName] = { text: fileText, version: 0 };
  //   }
  // }

  // getScriptFileNames() {
  //   return Object.keys(this.#files);
  // }

  // getScriptVersion(fileName: string) {
  //   return this.#files[fileName] && this.#files[fileName].version.toString();
  // }

  // // getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) {
  // getSourceFile(fileName: string): ts.SourceFile | null {
  //   if (!this.#files[fileName]) {
  //     return null;
  //   }

  //   return ts.createSourceFile(fileName, this.#files[fileName].text, ts.ScriptTarget.Latest);
  // }
}

export default LanguageServiceHost;
