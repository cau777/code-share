import {Command} from "../code_editor_types";
import {findReversed, regexTestRange} from "../../text";
import {calcIndentationLevel, generateIndentation, insertValue} from "./commands_utils";

export const EnterCommand: Command = {
    canExecute: key => key === "Enter",
    saveStateAfter: true,
    
    perform: (target, {options}) => {
        if (options.autoIndent) {
            // If there is ] ) or } right after the cursor, send this character to the next line
            if (regexTestRange(target.value, /^ *[})\]]/, target.selectionEnd)) {
                const level = calcIndentationLevel(target);
                const firstPart = "\n" + generateIndentation(level, options);
                const secondPart = "\n" + generateIndentation(level - 1, options);
                insertValue(target, firstPart);
                insertValue(target, secondPart);
                target.selectionStart -= secondPart.length;
                target.selectionEnd = target.selectionStart;
            } else {
                const indentation = generateIndentation(calcIndentationLevel(target), options);
                insertValue(target, "\n" + indentation);
            }
        } else {
            const lineStart = findReversed(target.value, "\n", 0, target.selectionEnd) ?? 0;
            let spaces = 0;
            let pos = lineStart + 1;
            while (target.value.charAt(pos) === " ") {
                spaces++;
                pos++;
            }
            const indentation = " ".repeat(spaces);
            insertValue(target, "\n" + indentation);
        }
    
        if (target.scrollHeight !== 0) {
            target.scrollBy(0, 23);
        }
    }
}