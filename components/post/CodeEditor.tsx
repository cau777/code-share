import {FC, useState, UIEvent, KeyboardEvent, useRef, useEffect} from "react";
import {LanguageOptions} from "../../src/code/code_editor_types";
import {UseFormRegisterReturn} from "react-hook-form";
import {countOccurrences} from "../../src/text";
import {CommandExecutor} from "../../src/code/CommandExecutor";
import Commands from "../../src/code/commands/Commands";
import CodeEditorLineNumbers from "./CodeEditorLineNumbers";
import CodeEditorDisplay from "./CodeEditorDisplay";
import CodeEditorTextArea from "./CodeEditorTextArea";

type Props = {
    language: LanguageOptions;
    textareaProps: UseFormRegisterReturn;
}

type State = {
    text: string;
    selected: number;
    rows: number;
}

function prepareKey(key: string) {
    // InternetExplorer and Edge use different naming
    switch (key) {
        case "Down":
            return "ArrowDown";
        case "Up":
            return "ArrowUp";
        case "Left":
            return "ArrowLeft";
        case "Right":
            return "ArrowRight";
        case "Esc":
            return "Escape";
        default:
            return key;
    }
}

const CodeEditor: FC<Props> = (props) => {
    let [state, setState] = useState<State>({text: "", selected: 0, rows: 1});
    
    let executorRef = useRef<CommandExecutor>();
    let lineNumbersRef = useRef<HTMLElement>(null);
    let textareaParentRef = useRef<HTMLDivElement>(null);
    let codeTextRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        executorRef.current = new CommandExecutor(textareaParentRef.current!.querySelector("textarea")!);
    }, []);
    
    useEffect(() => console.log("Render"));
    
    function updateSelectedRow(target: HTMLTextAreaElement) {
        let lineNum = countOccurrences(target.value, "\n", 0, target.selectionEnd);
        setState(s => ({...s, selected: lineNum}));
    }
    
    function updateRowsAndCols(target: HTMLTextAreaElement) {
        let lines = (target.value + "\n").match(/.*\n/g) || [];
        let rows = lines.length;
        let longestRow = 0;
        
        for (let line of lines) {
            longestRow = Math.max(longestRow, line.length);
        }
        
        target.rows = rows;
        setState(s => ({...s, rows: rows}));
    }
    
    async function change(e: { target: any, type?: any, currentTarget: HTMLTextAreaElement }) {
        let target = e.currentTarget;
        updateRowsAndCols(target);
        setState(s => ({...s, text: target.value}));
        await props.textareaProps.onChange(e);
    }
    
    function scrollNumbers(event: UIEvent<HTMLTextAreaElement>) {
        console.log("scroll")
        let target = event.currentTarget;
        let lines = lineNumbersRef.current;
        let codeText = codeTextRef.current;
        
        if (lines) {
            lines.style.top = -target.scrollTop + "px";
            lines.style.left = "0";
        }
        
        if (codeText) {
            codeText.style.top = -target.scrollTop + "px";
            codeText.style.left = -target.scrollLeft + "px";
        }
    }
    
    function keyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        let executor = executorRef.current!;
        if (!e.altKey && e.ctrlKey && !e.shiftKey && e.key === "z") {
            executor.undo();
            e.preventDefault();
        } else if (!e.altKey && e.ctrlKey && e.shiftKey && e.key === "Z") {
            executor.redo();
            e.preventDefault();
        } else {
            let key = prepareKey(e.key);
            
            for (let command of Commands) { // Chooses the appropriate and passes it to the executor
                if (command.canExecute(key, {alt: e.altKey, ctrl: e.ctrlKey, shift: e.shiftKey})) {
                    e.preventDefault();
                    executor.execute(command, e.currentTarget, props.language, key);
                    break;
                }
            }
        }
        
        // TODO: optimize
        change(e).then();
    }
    
    return (
        <div className="code-editor max-h-[80vh] code flex w-full relative overflow-auto">
            <CodeEditorLineNumbers lineCount={state.rows} innerRef={lineNumbersRef}/>
    
            <div ref={textareaParentRef} className={"flex-grow top-0 left-0 relative w-full"}>
                <div ref={codeTextRef} className={"select-none absolute top-0 left-0 w-full overflow-hidden"}>
                    <CodeEditorDisplay selected={state.selected} text={state.text} language={props.language}/>
                </div>
        
                {/*TODO: mobile support + style*/}
                <CodeEditorTextArea onKeyDown={keyDown} onScroll={scrollNumbers}
                                    onSelect={e => updateSelectedRow(e.currentTarget)}
                                    textareaProps={props.textareaProps} onChange={change}/>
            </div>
        </div>
    )
}

export default CodeEditor;