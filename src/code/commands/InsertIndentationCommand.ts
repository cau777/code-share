import {Command} from "../CodeEditorTypes";
import {insertValue} from "./commands_utils";

export const InsertIndentationCommand: Command = {
    canExecute: (key, {alt, ctrl, shift}) => !alt && !ctrl && !shift && key === "Tab",
    
    perform: (target, {options}) => {
        insertValue(target, options.tab)
    }
}