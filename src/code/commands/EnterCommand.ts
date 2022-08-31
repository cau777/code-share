import {Command} from "../CodeEditorTypes";
import {findReversed, regexTestRange} from "../../text";
import {calcIndentationLevel, generateIndentation, insertValue} from "./commands_utils";

export const EnterCommand: Command = {
    canExecute: key => key === "Enter",
    saveStateAfter: true,
    
    perform: (target, {options}) => {
        if (options.autoIndent) {
            // If there is ] ) or } right after the cursor, send this character to the next line
            if (regexTestRange(target.value, /^ *[})\]]/, target.selectionEnd)) {
                let level = calcIndentationLevel(target);
                let firstPart = "\n" + generateIndentation(level, options);
                let secondPart = "\n" + generateIndentation(level - 1, options);
                insertValue(target, firstPart);
                insertValue(target, secondPart);
                target.selectionStart -= secondPart.length;
                target.selectionEnd = target.selectionStart;
            } else {
                let indentation = generateIndentation(calcIndentationLevel(target), options);
                insertValue(target, "\n" + indentation);
            }
        } else {
            let lineStart = findReversed(target.value, "\n", 0, target.selectionEnd) ?? 0;
            let spaces = 0;
            let pos = lineStart + 1;
            while (target.value.charAt(pos) === " ") {
                spaces++;
                pos++;
            }
            let indentation = " ".repeat(spaces);
            insertValue(target, "\n" + indentation);
        }
    
        if (target.scrollHeight !== 0) {
            target.scrollBy(0, 23);
        }
    }
}