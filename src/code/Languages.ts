import {LanguageOptions} from "./CodeEditorTypes";
import {LanguagesConfig} from "./LanguagesConfig";

export const Languages: LanguageOptions[] = Object.entries(LanguagesConfig)
    .map(([name, props]) => {
        let keywords = props.keywords ?? [];
        if (props.accessModifiers)
            keywords.push("public", "private", "protected");
        
        return {
            name,
            autoIndent: !(props.disableAutoIndent ?? false),
            keywords,
            tab: " ".repeat(props.spacesNumber??4),
            literals: props.literals ?? [],
            inlineComments: props.inlineComments,
            multilineComments: props.multilineComments,
            stringHighlight: !(props.disableStringHighlight ?? false),
            numberHighlight: !(props.disableNumberHighlight ?? false),
        };
    });

export const LanguageNames = Languages.map(o => o.name);

export function findLanguageByName(name: string) {
    return Languages.find(o => o.name === name) ?? Languages.find(o => o.name === "Other");
}