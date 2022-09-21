import {Command} from "../code_editor_types";
import {find, findReversed} from "../../text";

export const MoveLineUpCommand: Command = {
    saveStateAfter: true,
    saveStateBefore: true,
    canExecute: (key, {alt, ctrl, shift}) => alt && !ctrl && !shift && key === "ArrowUp",
    
    perform: target => {
        const selectionStart = target.selectionStart;
        const selectionEnd = target.selectionEnd;
    
        let currentLineStart = findReversed(target.value, "\n", 0, selectionStart);
        if (!currentLineStart) return;
        currentLineStart++;
    
        const currentLineEnd = find(target.value, "\n", selectionEnd) ?? target.value.length;
        const currentLine = target.value.substring(currentLineStart, currentLineEnd);
    
        const prevLineEnd = currentLineStart - 1;
        const prevLineStart = (findReversed(target.value, "\n", 0, prevLineEnd - 1) ?? -1) + 1;
    
        const prevLine = target.value.substring(prevLineStart, prevLineEnd);
        const textBefore = target.value.substring(0, prevLineStart);
        const textAfter = target.value.substring(currentLineEnd);
    
        target.value = textBefore + currentLine + "\n" + prevLine + textAfter;
    
        target.selectionStart = selectionStart - prevLine.length - 1;
        target.selectionEnd = selectionEnd - prevLine.length - 1;
    }
}