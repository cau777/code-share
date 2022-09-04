import {Command} from "../code_editor_types";
import {find, findReversed} from "../../text";

export const MoveLineDownCommand: Command = {
    saveStateAfter: true,
    saveStateBefore: true,
    canExecute: (key, {alt, ctrl, shift}) => alt && !ctrl && !shift && key === "ArrowDown",
    
    perform: target => {
        let selectionStart = target.selectionStart;
        let selectionEnd = target.selectionEnd;
    
        let currentLineStart = (findReversed(target.value, "\n", 0, selectionStart) ?? -1) + 1;
        let currentLineEnd = find(target.value, "\n", selectionEnd);
        if (!currentLineEnd) return;
    
        let currentLine = target.value.substring(currentLineStart, currentLineEnd);
    
        let nextLineStart = currentLineEnd + 1;
        let nextLineEnd = find(target.value, "\n", nextLineStart) ?? target.value.length;
    
        let nextLine = target.value.substring(nextLineStart, nextLineEnd);
        let textBefore = target.value.substring(0, currentLineStart);
        let textAfter = target.value.substring(nextLineEnd);
    
        target.value = textBefore + nextLine + "\n" + currentLine + textAfter;
    
        target.selectionStart = selectionStart + nextLine.length + 1;
        target.selectionEnd = selectionEnd + nextLine.length + 1;
    }
}