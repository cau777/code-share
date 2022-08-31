import {Command} from "../CodeEditorTypes";
import {countOccurrences} from "../../text";
import {insertValue, LinkedCharacters} from "./commands_utils";

export const InsertKeyCommand: Command = {
    canExecute: (key, {alt, ctrl}) => !alt && !ctrl && key.length === 1,
    
    perform: (target, {key}) => {
        let isSelecting = target.selectionStart !== target.selectionEnd;
        let isOpen = LinkedCharacters.isOpenCharacter(key);
        let isClose = LinkedCharacters.isCloseCharacter(key);
    
        if (isSelecting) {
            if (isOpen) {
                // Wrap selection (example: '{selection}')
                let selection = target.value.substring(target.selectionStart, target.selectionEnd);
                insertValue(target, key + selection + LinkedCharacters.findCloseCharacter(key));
            } else {
                // Replace the selection with the new letter
                insertValue(target, key);
            }
        } else {
            if (isClose) {
                let opening = countOccurrences(target.value, LinkedCharacters.findOpenCharacter(key));
                let closing = countOccurrences(target.value, key);
            
                if (opening === closing && target.selectionStart < target.value.length && target.value.charAt(target.selectionStart) === key) {
                    // Just advance one letter
                    target.selectionStart++;
                    target.selectionEnd = target.selectionStart;
                } else if (isOpen) {
                    // Place the closing character (example: '}')
                    placeCloseChar(target, key);
                } else {
                    // Just insert the letter
                    insertValue(target, key);
                }
            } else if (isOpen) {
                // Place the closing character (example: '}')
                placeCloseChar(target, key);
            } else {
                // Just insert the letter
                insertValue(target, key);
            }
        }
    }
}

function placeCloseChar(target: HTMLTextAreaElement, key: string) {
    insertValue(target, key + LinkedCharacters.findCloseCharacter(key));
    target.selectionStart--;
    target.selectionEnd--;
}