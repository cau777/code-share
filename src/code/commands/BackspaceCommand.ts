import {Command} from "../CodeEditorTypes";
import {regexTestRange} from "../../text";
import {insertValue, LinkedCharacters} from "./commands_utils";

export const BackspaceCommand: Command = {
    canExecute: (key, {ctrl, alt, shift}) => !alt && !ctrl && !shift && key === "Backspace",
    
    perform: (target, {options}) => {
        if (target.selectionStart === target.selectionEnd) {
            if (regexTestRange(target.value, new RegExp(options.tab + "$"), 0, target.selectionStart)) {
                // Remove indentation
                target.selectionStart = Math.max(0, target.selectionStart - options.tab.length);
            } else {
                // Remove the previous character
                target.selectionStart = Math.max(0, target.selectionStart - 1);
            
                if (target.selectionEnd !== target.value.length) {
                    let currentChar = target.value[target.selectionEnd - 1]
                    let nextChar = target.value[target.selectionEnd];
                    let closeChar = LinkedCharacters.findCloseCharacter(currentChar);
                
                    if (nextChar === closeChar) {
                        // If removing a character like ([{", also remove the next closing character if present
                        target.selectionEnd++;
                    }
                }
            }
        }
    
        insertValue(target, "");
    }
}