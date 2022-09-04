import {LanguageOptions} from "./code_editor_types";
import {Cache} from "../data/Cache";
import {zipArrays} from "../arrays";

export enum HighlightColorCodes {
    None = 0,
    Keywords = 1,
    Literals = 2,
    Number = 3,
    String = 4,
    Comments = 5
}

export const HighlightColorNames = [
    "", "keyword", "literal", "number", "string", "comment",
]

const HighlightCache = new Cache<string, Uint8Array>(60);

function applyRegex(text: string, target: Uint8Array, regex: RegExp, code: HighlightColorCodes) {
    let matches = text.matchAll(regex);
    for (let match of matches) {
        let start = match.index;
        if (start === undefined) continue;
        
        for (let groupIndex = 0; groupIndex < match[0].length; groupIndex++) {
            target[start + groupIndex] = code;
        }
    }
}

function applyMultilineRegex(text: string, target: Uint8Array[], regex: RegExp, code: HighlightColorCodes) {
    let matches = text.matchAll(regex);
    let arrayIndex = 0;
    let index = 0;
    let totalIndex = 0;
    
    function skip() {
        totalIndex++;
        index++;
        if (index >= target[arrayIndex].length) {
            arrayIndex++;
            index = 0;
        }
    }
    
    for (let match of matches) {
        let start = match.index;
        if (start === undefined) continue;
        
        while (totalIndex < start) skip();
        
        for (let matchIndex = 0; matchIndex < match[0].length; matchIndex++) {
            target[arrayIndex][index] = code;
            skip();
        }
    }
}

function highlightStrings(text: string, target: Uint8Array) {
    let enclosedBy = ""; // Can be either " or '
    for (let i = 0; i < text.length; i++) {
        let char = text.charAt(i);
        let escaping = i !== 0 && text.charAt(i - 1) === "\\"; // Don't consider quotes if the previous character is \
        
        if (enclosedBy === "") {
            if ((char === "\"" || char === "'") && !escaping) {
                enclosedBy = char;
                target[i] = HighlightColorCodes.String;
            }
        } else {
            target[i] = HighlightColorCodes.String;
            if (char === enclosedBy && !escaping) {
                enclosedBy = "";
            }
        }
    }
}

function highlightLine(line: string, options: LanguageOptions) {
    let charColors = new Uint8Array(line.length + 1);
    
    if (options.keywordsRegex)
        applyRegex(line, charColors, options.keywordsRegex, HighlightColorCodes.Keywords);
    
    if (options.literalsRegex)
        applyRegex(line, charColors, options.literalsRegex, HighlightColorCodes.Literals);
    
    if (options.numberRegex)
        applyRegex(line, charColors, options.numberRegex, HighlightColorCodes.Number);
    
    if (options.stringHighlight)
        highlightStrings(line, charColors);
    
    if (options.inlineCommentsRegex)
        applyRegex(line, charColors, options.inlineCommentsRegex, HighlightColorCodes.Comments);
    
    return charColors;
}

export function highlightText(text: string, options: LanguageOptions): [string, Uint8Array][] {
    let lines = text.split("\n");
    let charColors = lines.map(o =>
        HighlightCache.getCachedOr(o, () => highlightLine(o, options)));
    
    if (options.multilineCommentsRegex)
        applyMultilineRegex(text, charColors, options.multilineCommentsRegex, HighlightColorCodes.Comments);
    
    return zipArrays(lines, charColors);
}


// export class SyntaxHighlighter {
//     private readonly keywordClass = "keyword";
//     private readonly numberClass = "number";
//     private readonly stringClass = "string";
//     private readonly commentClass = "comment";
//     private readonly options: LanguageOptions;
//
//     public constructor(options: LanguageOptions) {
//         this.options = options;
//     }
//
//     /**
//      * @summary Creates an array containing the color of each character of the text
//      * @param text The text to highlight
//      */
//     public highlight(text: string) {
//         let charColors: string[] = [];
//
//         for (let j = 0; j < text.length; j++) {
//             charColors.push("");
//         }
//
//         for (let keyword of this.options.keywords) {
//             SyntaxHighlighter.applyColor(text, charColors, "\\b" + escapeRegExp(keyword) + "\\b", this.keywordClass);
//         }
//
//         for (let literal of this.options.literals) {
//             SyntaxHighlighter.applyColor(text, charColors, "\\b" + escapeRegExp(literal) + "\\b", this.keywordClass);
//         }
//
//         if (this.options.numberHighlight) {
//             SyntaxHighlighter.applyColor(text, charColors, "\\b[_\\d]+\\b", this.numberClass);
//         }
//
//         if (this.options.stringHighlight) {
//             let enclosedBy = ""; // Can be either " or '
//             for (let i = 0; i < text.length; i++) {
//                 let char = text.charAt(i);
//                 let escaping = i !== 0 && text.charAt(i - 1) === "\\"; // Don't consider quotes if the previous character is \
//
//                 if (enclosedBy === "") {
//                     if ((char === "\"" || char === "'") && !escaping) {
//                         enclosedBy = char;
//                         charColors[i] = this.stringClass;
//                     }
//                 } else {
//                     charColors[i] = this.stringClass;
//                     if (char === enclosedBy && !escaping) {
//                         enclosedBy = "";
//                     }
//                 }
//             }
//         }
//
//         if (this.options.inlineComments) {
//             SyntaxHighlighter.applyColor(text, charColors, escapeRegExp(this.options.inlineComments) + ".*", this.commentClass);
//         }
//
//         if (this.options.multilineComments) {
//             let regexStr = escapeRegExp(this.options.multilineComments.start) + "[\\s\\S]*?(" +
//                 escapeRegExp(this.options.multilineComments.end) + "|$)";
//             SyntaxHighlighter.applyColor(text, charColors, regexStr, this.commentClass);
//         }
//
//         return charColors;
//     }
//
//     /**
//      * @summary Generates arrays of colored <span> elements for each line
//      * @param text
//      * @param charColors
//      */
//     public generateLines(text: string, charColors: string[]) {
//         let lineResult: JSX.Element[] = [];
//         let lines: JSX.Element[][] = [];
//         let currentColor = "";
//         let textBuffer = "";
//         let spanIndex = 0;
//
//         for (let i = 0; i <= text.length; i++) {
//             let char = text.charAt(i);
//
//             if (char === "\n" || i === text.length) {
//                 if (textBuffer !== "")
//                     lineResult.push(<span key={spanIndex++} className={"code-" + currentColor}>{textBuffer}</span>);
//
//                 // Add a space if the line is empty because the height of empty table lines is always empty
//                 if (lineResult.length === 0) lineResult.push(<span key={spanIndex++}>{" "}</span>);
//
//                 lines.push(lineResult);
//                 lineResult = [];
//                 textBuffer = "";
//                 currentColor = "";
//             } else {
//                 let color = charColors[i];
//
//                 // If the color of the current character is different from the previous
//                 if (char !== " " && currentColor !== color) {
//                     if (textBuffer !== "")
//                         lineResult.push(<span key={spanIndex++} className={"code-" + currentColor}>{textBuffer}</span>);
//                     currentColor = color;
//                     textBuffer = "";
//                 }
//
//                 textBuffer += char;
//             }
//         }
//
//         return lines;
//     }
//
//     private static applyColor(text: string, charColors: string[], regexStr: string, colorCode: string) {
//         let matches = text.matchAll(new RegExp(regexStr, "g"));
//         for (let match of matches) {
//             let start = match.index;
//             if (start === undefined) continue;
//
//             for (let groupIndex = 0; groupIndex < match[0].length; groupIndex++) {
//                 charColors[start + groupIndex] = colorCode;
//             }
//         }
//     }
// }