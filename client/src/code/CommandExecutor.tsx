/**
 * @summary Executor of the command pattern that allows undo and redo
 */
import {CodeEditorState} from "./CodeEditorState";
import {Command, LanguageOptions} from "./code_editor_types";

export class CommandExecutor {
    private readonly history: CodeEditorState[];
    private undoneHistory: CodeEditorState[];
    private savingTimeout?: NodeJS.Timeout;
    
    public constructor() {
        this.history = [new CodeEditorState()];
        this.undoneHistory = [];
    }
    
    public execute(command: Command, target: HTMLTextAreaElement, options: LanguageOptions, key: string) {
        this.undoneHistory = [];
        
        if (command.saveStateBefore) {
            this.saveState(target);
        }
        
        command.perform(target, {options, key});
        
        // The state is saved when the user stops typing for one second or an action forces it (like enter)
        if (command.saveStateAfter) {
            this.saveState(target);
        } else {
            if (this.savingTimeout) {
                clearTimeout(this.savingTimeout);
            }
            
            this.savingTimeout = setTimeout(() => {
                this.saveState(target);
                this.savingTimeout = undefined;
            }, 1000);
        }
    }
    
    public undo(target: HTMLTextAreaElement) {
        this.saveState(target);
        
        if (this.history.length !== 1) {
            let prev = this.history.pop();
            if (prev)
                this.undoneHistory.push(prev);
        }
        
        let last = this.lastState();
        last.applyState(target);
    }
    
    public redo(target: HTMLTextAreaElement) {
        let action = this.undoneHistory.pop();
        if (action === undefined) return;
        
        action.applyState(target);
        
        this.history.push(action);
    }
    
    public saveState(target: HTMLTextAreaElement) {
        let last = this.lastState();
        if (!last.equalState(target))
            this.history.push(new CodeEditorState(last, target));
    }
    
    private lastState() {
        return this.history[this.history.length - 1];
    }
}