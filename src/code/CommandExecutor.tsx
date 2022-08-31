/**
 * @summary Executor of the command pattern that allows undo and redo
 */
import {CodeEditorState} from "./CodeEditorState";
import {Command, LanguageOptions} from "./CodeEditorTypes";

export class CommandExecutor {
    private readonly history: CodeEditorState[];
    private readonly target: HTMLTextAreaElement;
    private undoneHistory: CodeEditorState[];
    private savingTimeout?: NodeJS.Timeout;
    
    public constructor(target: HTMLTextAreaElement) {
        this.target = target;
        this.history = [new CodeEditorState()];
        this.undoneHistory = [];
    }
    
    public execute(command: Command, target: HTMLTextAreaElement, options: LanguageOptions, key: string) {
        this.undoneHistory = [];
        
        if (command.saveStateBefore) {
            this.saveState();
        }
        
        command.perform(target, {options, key});
        
        // The state is saved when the user stops typing for one second or an action forces it (like enter)
        if (command.saveStateAfter) {
            this.saveState();
        } else {
            if (this.savingTimeout) {
                clearTimeout(this.savingTimeout);
            }
            
            this.savingTimeout = setTimeout(() => {
                this.saveState();
                this.savingTimeout = undefined;
            }, 1000);
        }
    }
    
    public undo() {
        this.saveState();
        
        if (this.history.length !== 1) {
            let prev = this.history.pop();
            if (prev)
                this.undoneHistory.push(prev);
        }
        
        let last = this.lastState();
        last.applyState(this.target);
    }
    
    public redo() {
        let action = this.undoneHistory.pop();
        if (action === undefined) return;
        
        action.applyState(this.target);
        
        this.history.push(action);
    }
    
    public saveState() {
        let last = this.lastState();
        if (!last.equalState(this.target))
            this.history.push(new CodeEditorState(last, this.target));
    }
    
    private lastState() {
        return this.history[this.history.length - 1];
    }
}