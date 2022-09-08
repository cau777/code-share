import {Command} from "../code_editor_types";
import {find, findReversed} from "../../text";

export const MoveLineUpCommand: Command = {
    saveStateAfter: true,
    saveStateBefore: true,
    canExecute: (key, {alt, ctrl, shift}) => alt && !ctrl && !shift && key === "ArrowUp",
    
    perform: target => {
        let selectionStart = target.selectionStart;
        let selectionEnd = target.selectionEnd;
    
        let currentLineStart = findReversed(target.value, "\n", 0, selectionStart);
        if (!currentLineStart) return;
        currentLineStart++;
    
        let currentLineEnd = find(target.value, "\n", selectionEnd) ?? target.value.length;
        let currentLine = target.value.substring(currentLineStart, currentLineEnd);
    
        let prevLineEnd = currentLineStart - 1;
        let prevLineStart = (findReversed(target.value, "\n", 0, prevLineEnd - 1) ?? -1) + 1;
    
        let prevLine = target.value.substring(prevLineStart, prevLineEnd);
        let textBefore = target.value.substring(0, prevLineStart);
        let textAfter = target.value.substring(currentLineEnd);
    
        target.value = textBefore + currentLine + "\n" + prevLine + textAfter;
    
        target.selectionStart = selectionStart - prevLine.length - 1;
        target.selectionEnd = selectionEnd - prevLine.length - 1;
    }
}