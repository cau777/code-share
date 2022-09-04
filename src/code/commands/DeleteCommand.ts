import {Command} from "../code_editor_types";
import {insertValue} from "./commands_utils";

export const DeleteCommand: Command = {
    canExecute: (key, {alt, ctrl, shift}) => !alt && !ctrl && !shift && key === "Delete",
    
    perform: (target) => {
        if (target.selectionStart === target.selectionEnd) {
            target.selectionEnd = Math.min(target.value.length, target.selectionEnd + 1);
        }
    
        insertValue(target, "");
    }
}