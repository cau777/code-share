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
    const matches = text.matchAll(regex);
    for (const match of matches) {
        const start = match.index;
        if (start === undefined) continue;
        
        for (let groupIndex = 0; groupIndex < match[0].length; groupIndex++) {
            target[start + groupIndex] = code;
        }
    }
}

function applyMultilineRegex(text: string, target: Uint8Array[], regex: RegExp, code: HighlightColorCodes) {
    const matches = text.matchAll(regex);
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
    
    for (const match of matches) {
        const start = match.index;
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
        const char = text.charAt(i);
        const escaping = i !== 0 && text.charAt(i - 1) === "\\"; // Don't consider quotes if the previous character is \
        
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
    const charColors = new Uint8Array(line.length + 1);
    
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
    const lines = text.split("\n");
    const charColors = lines.map(o =>
        HighlightCache.getCachedOr(options.name + "|||" + o, () => highlightLine(o, options)));
    
    if (options.multilineCommentsRegex)
        applyMultilineRegex(text, charColors, options.multilineCommentsRegex, HighlightColorCodes.Comments);
    
    return zipArrays(lines, charColors);
}