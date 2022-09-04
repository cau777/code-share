import {LanguageConfig} from "./code_editor_types";

export const LanguagesConfig: { [key: string]: LanguageConfig } = {
    Other: {
        disableAutoIndent: true,
    },
    Java: {
        inlineComments: "//",
        multilineComments: {start: "/*", end: "*/"},
        accessModifiers: true,
        keywords: ["abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class", "continue",
            "const", "default", "do", "double", "else", "enum", "exports", "extends", "final", "finally", "float",
            "for", "goto", "if", "implements", "import", "instanceof", "int", "interface", "long", "module", "native",
            "new", "package", "requires", "return", "short", "static", "strictfp", "super", "switch", "synchronized",
            "this", "throw", "throws", "transient", "try", "var", "void", "volatile", "while"],
        literals: ["true", "false", "null"],
    }
}