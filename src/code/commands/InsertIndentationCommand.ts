import {Command} from "../code_editor_types";
import {insertValue} from "./commands_utils";

export const InsertIndentationCommand: Command = {
    canExecute: (key, {alt, ctrl, shift}) => !alt && !ctrl && !shift && key === "Tab",
    
    perform: (target, {options}) => {
        insertValue(target, options.tab)
    }
}