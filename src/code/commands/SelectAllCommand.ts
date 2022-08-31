import {Command} from "../CodeEditorTypes";

export const SelectAllCommand: Command = {
    canExecute: (key, {alt, ctrl, shift}) => !alt && ctrl && !shift && key === "a",
    
    perform: target => {
        target.selectionStart = 0;
        target.selectionEnd = target.value.length;
    }
}