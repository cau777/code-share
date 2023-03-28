import {LanguageConfig} from "./code_editor_types";

// This is where support for new languages is implemented
// Taken from the previous version of this project
// https://github.com/cau777/CodeSharingNetwork/blob/master/client/src/components/code_editor/languages/Languages.ts
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
    },
    ["C#"]: {
        inlineComments: "//",
        multilineComments: {start: "/*", end: "*/"},
        accessModifiers: true,
        keywords: ["abstract", "add", "as", "ascending", "async", "await", "base", "bool", "break", "break", "by",
            "byte", "case", "case", "catch", "catch", "char", "checked", "checked", "checked", "class", "const",
            "continue", "continue", "decimal", "default", "default", "descending", "do", "do", "double", "dynamic",
            "else", "else", "enum", "equals", "event", "extern", "extern", "finally", "finally", "fixed", "fixed",
            "float", "for", "for", "foreach", "foreach", "from", "global", "goto", "goto", "group", "if", "if", "in",
            "in", "in", "int", "internal", "into", "is", "join", "let", "lock", "lock", "long", "new", "new", "namespace",
            "on", "operator", "orderby", "out", "override", "params", "partial", "readonly", "ref", "return", "return",
            "sbyte", "sealed", "select", "set", "short", "sizeof", "stackalloc", "static", "string", "struct", "switch",
            "switch", "this", "throw", "throw", "try", "try", "typeof", "uint", "ulong", "unchecked", "unchecked",
            "unchecked", "unsafe", "ushort", "using", "value", "value", "var", "virtual", "void", "volatile", "where",
            "while", "while", "yield", "yield"],
        literals: ["true", "false", "null"],
    },
    Python: {
        inlineComments: "#",
        disableAutoIndent: true,
        keywords: ["and", "as", "assert", "bool", "break", "bytearray", "bytes", "class", "complex", "continue", "def",
            "del", "dict", "elif", "else", "except", "finally", "float", "for", "from", "frozenset", "global", "if",
            "import", "in", "int", "is", "lambda", "list", "memoryview", "nonlocal", "not", "or", "pass", "raise",
            "range", "return", "set", "str", "try", "tuple", "while", "with", "yield"],
        literals: ["True", "False", "None"],
    },
    Typescript: {
        inlineComments: "//",
        multilineComments: {start: "/*", end: "*/"},
        accessModifiers: true,
        literals: ["true", "false", "null", "undefined"],
        keywords: ["Array", "any", "await", "boolean", "break", "case", "catch", "class", "const", "continue", "debugger",
            "default", "delete", "do", "else", "enum", "export", "extends", "false", "finally", "for", "function", "if",
            "implements", "import", "in", "instanceof", "interface", "let", "never", "new", "number", "package", "return",
            "static", "string", "super", "switch", "this", "throw", "true", "try", "tuple", "typeof", "var", "void", "while",
            "with", "yield"]
    },
    Javascript: {
        inlineComments: "//",
        multilineComments: {start: "/*", end: "*/"},
        accessModifiers: true,
        literals: ["true", "false", "null", "undefined"],
        keywords: ["await", "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete",
            "do", "else", "enum", "export", "extends", "false", "finally", "for", "function", "if", "implements",
            "import", "in", "instanceof", "interface", "let", "new", "package", "return", "super", "switch", "static",
            "this", "throw", "try", "true", "typeof", "var", "void", "while", "with", "yield"]
    }
}