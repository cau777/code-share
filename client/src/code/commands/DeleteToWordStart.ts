import {Command} from "../code_editor_types";
import {insertValue} from "./commands_utils";

export const DeleteToWordStart: Command = {
     canExecute: (key, {alt, ctrl, shift}) => !alt && ctrl && !shift && key === "Backspace",
    
    perform: (target) => {
        if (target.selectionStart === target.selectionEnd) {
            const sub = target.value.substring(0, target.selectionEnd);
            const lineStartIndex = target.selectionStart - (sub.match(/\n *$/) ?? [" "])[0].length + 1;
            const wordStartIndex = target.selectionStart - (sub.match(/\w+ *$/) ?? [" "])[0].length;
            target.selectionStart = Math.max(0, Math.min(lineStartIndex, wordStartIndex));
        }
    
        insertValue(target, "");
    }
}