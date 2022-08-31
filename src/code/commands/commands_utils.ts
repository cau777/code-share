import {countOccurrences} from "../../text";
import {LanguageOptions} from "../CodeEditorTypes";
import OpenCloseSet from "../../data/OpenCloseSet";

export const BlockCharacters = new OpenCloseSet([["(", ")"], ["{", "}"], ["[", "]"]]);
export const LinkedCharacters = new OpenCloseSet([["(", ")"], ["{", "}"], ["[", "]"], ["\"", "\""], ["'", "'"]]);

/**
 * @summary Inserts the given value in the textarea, replacing the selection with the new value
 */
export function insertValue(target: HTMLTextAreaElement, value: string) {
    let start = target.selectionStart;
    
    target.value = target.value.substring(0, target.selectionStart) + value + target.value.substring(target.selectionEnd);
    
    target.selectionStart = start + value.length;
    target.selectionEnd = target.selectionStart;
}

export function calcIndentationLevel(target: HTMLTextAreaElement) {
    let level = 0;
    
    for (let [open, close] of BlockCharacters.elements) {
        let opening = countOccurrences(target.value, open, 0, target.selectionStart);
        let closing = countOccurrences(target.value, close, 0, target.selectionStart);
        
        level += Math.max(0, opening - closing);
    }
    
    return Math.max(0, level);
}

export function moveCursor(target: HTMLTextAreaElement, pos: number) {
    target.selectionStart = pos;
    target.selectionEnd = target.selectionStart;
}

export function generateIndentation(level: number, options: LanguageOptions) {
    return options.tab.repeat(level);
}

