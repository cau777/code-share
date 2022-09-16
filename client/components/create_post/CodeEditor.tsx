import {FC, useState, UIEvent, KeyboardEvent, useRef, useEffect} from "react";
import {LanguageOptions} from "../../src/code/code_editor_types";
import {countOccurrences} from "../../src/text";
import {CommandExecutor} from "../../src/code/CommandExecutor";
import Commands from "../../src/code/commands/Commands";
import CodeEditorLineNumbers from "../code_snippet/CodeLineNumbers";
import CodeDisplay from "../code_snippet/CodeDisplay";
import CodeEditorTextArea from "./CodeEditorTextArea";
import {findLanguageByName} from "../../src/code/Languages";
import BtnSecondary from "../basic/BtnSecondary";
import {InsertIndentationCommand} from "../../src/code/commands/InsertIndentationCommand";
import ArrowsRightLeftIcon from "../icons/ArrowsRightLeftIcon";
import UndoIcon from "../icons/UndoIcon";
import RedoIcon from "../icons/RedoIcon";
import {MobileView} from "react-device-detect";

type Props = {
    language?: LanguageOptions;
    text: string;
    onChange: (value: string) => void;
}

type State = {
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
    let [state, setState] = useState<State>({selected: 0, rows: 1});
    let language = props.language ?? findLanguageByName("Other")!;
    let executorRef = useRef<CommandExecutor>(new CommandExecutor());
    let lineNumbersRef = useRef<HTMLTableElement>(null);
    let textareaParentRef = useRef<HTMLDivElement>(null);
    let codeTextRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        updateRowsAndCols(getTextarea());
    }, [props.text]);
    
    function getTextarea() {
        return textareaParentRef.current!.querySelector("textarea")!;
    }
    
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
        await props.onChange(target.value);
    }
    
    function scrollNumbers(event: UIEvent<HTMLTextAreaElement>) {
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
        let executor = executorRef.current;
        let target = e.currentTarget;
        
        if (!e.altKey && e.ctrlKey && !e.shiftKey && e.key === "z") {
            executor.undo(target);
            e.preventDefault();
        } else if (!e.altKey && e.ctrlKey && e.shiftKey && e.key === "Z") {
            executor.redo(target);
            e.preventDefault();
        } else {
            let key = prepareKey(e.key);
            
            for (let command of Commands) { // Chooses the appropriate and passes it to the executor
                if (command.canExecute(key, {alt: e.altKey, ctrl: e.ctrlKey, shift: e.shiftKey})) {
                    e.preventDefault();
                    executor.execute(command, target, language, key);
                    break;
                }
            }
        }
        
        change(e).then();
    }
    
    function executeCustom(e: any, func: (executor: CommandExecutor, target: HTMLTextAreaElement) => void) {
        e.preventDefault();
        let target = getTextarea();
        func(executorRef.current, target);
        change({currentTarget: target, target, type: "keydown"}).then();
        target.focus();
    }
    
    return (
        <>
            <MobileView>
                <div className={"flex justify-end gap-1"}>
                    <BtnSecondary type={"button"} className={"ml-auto"}
                                  onClick={e => executeCustom(e, (exec, target) => exec.execute(InsertIndentationCommand, target, language, "Tab"))}>
                        <ArrowsRightLeftIcon className={"grid-center my-1"} width={"1rem"}></ArrowsRightLeftIcon>
                    </BtnSecondary>
                    
                    <BtnSecondary type={"button"} className={"ml-auto"} onClick={e => executeCustom(e, (exec, target) => exec.undo(target))}>
                        <UndoIcon className={"grid-center my-1"} width={"1rem"}></UndoIcon>
                    </BtnSecondary>
                    
                    <BtnSecondary type={"button"} className={"ml-auto"} onClick={e => executeCustom(e, (exec, target) => exec.redo(target))}>
                        <RedoIcon className={"grid-center my-1"} width={"1rem"}></RedoIcon>
                    </BtnSecondary>
                </div>
            </MobileView>
            <div
                className="code-editor max-h-[80vh] code flex w-full relative overflow-hidden border-2 border-back-1 rounded-lg">
                <CodeEditorLineNumbers lineCount={state.rows} innerRef={lineNumbersRef} offsetBottom={true}/>
                
                <div ref={textareaParentRef} className={"flex-grow top-0 left-0 relative w-full bg-back-1"}>
                    <div ref={codeTextRef} className={"select-none absolute min-w-full top-0 left-0 overflow-hidden "}>
                        <CodeDisplay selected={state.selected} text={props.text} language={language}/>
                    </div>
                    
                    <CodeEditorTextArea onKeyDown={keyDown} onScroll={scrollNumbers}
                                        onSelect={e => updateSelectedRow(e.currentTarget)}
                                        value={props.text} onChange={change}/>
                </div>
            </div>
        </>
    )
}

export default CodeEditor;