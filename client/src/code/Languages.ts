import {LanguageOptions} from "./code_editor_types";
import {LanguagesConfig} from "./LanguagesConfig";
import {escapeRegExp} from "../text";

function createPattern(matches: string[]) {
    if (matches.length === 0) return undefined;
    return new RegExp("\\b\(" + matches.map(escapeRegExp).join("|") + "\)\\b", "g");
}

export const Languages: LanguageOptions[] = Object.entries(LanguagesConfig)
    .map(([name, props]) => {
        const keywords = props.keywords ?? [];
        if (props.accessModifiers)
            keywords.push("public", "private", "protected");
        
        return {
            name,
            autoIndent: !(props.disableAutoIndent ?? false),
            tab: " ".repeat(props.spacesNumber ?? 4),
            literalsRegex: createPattern(props.literals ?? []),
            keywordsRegex: createPattern(keywords),
            inlineCommentsRegex: props.inlineComments ?
                new RegExp(escapeRegExp(props.inlineComments) + ".*", "g") : undefined,
            multilineCommentsRegex: props.multilineComments ?
                new RegExp(escapeRegExp(props.multilineComments.start) + "[\\s\\S]*?(" +
                escapeRegExp(props.multilineComments.end) + "|$)", "g") : undefined,
            numberRegex: props.disableNumberHighlight ? undefined : /\b[_\d]+\b/g,
            stringHighlight: !(props.disableStringHighlight ?? false),
        };
    });

export function findLanguageByName(name: string) {
    return Languages.find(o => o.name === name) ?? Languages.find(o => o.name === "Other");
}

export const OtherLanguage = Languages[0];