import {Command} from "../code_editor_types";
import {find, findReversed} from "../../text";

export const MoveLineDownCommand: Command = {
    saveStateAfter: true,
    saveStateBefore: true,
    canExecute: (key, {alt, ctrl, shift}) => alt && !ctrl && !shift && key === "ArrowDown",
    
    perform: target => {
        const selectionStart = target.selectionStart;
        const selectionEnd = target.selectionEnd;
    
        const currentLineStart = (findReversed(target.value, "\n", 0, selectionStart) ?? -1) + 1;
        const currentLineEnd = find(target.value, "\n", selectionEnd);
        if (!currentLineEnd) return;
    
        const currentLine = target.value.substring(currentLineStart, currentLineEnd);
    
        const nextLineStart = currentLineEnd + 1;
        const nextLineEnd = find(target.value, "\n", nextLineStart) ?? target.value.length;
    
        const nextLine = target.value.substring(nextLineStart, nextLineEnd);
        const textBefore = target.value.substring(0, currentLineStart);
        const textAfter = target.value.substring(nextLineEnd);
    
        target.value = textBefore + nextLine + "\n" + currentLine + textAfter;
    
        target.selectionStart = selectionStart + nextLine.length + 1;
        target.selectionEnd = selectionEnd + nextLine.length + 1;
    }
}