import {FC, memo} from "react";
import {LanguageOptions} from "../../src/code/CodeEditorTypes";
import {SyntaxHighlighter} from "../../src/code/SyntaxHighlighter";
import {mergeClasses} from "../../src/attributes";

type Props =  {
    text: string;
    selected: number;
    language: LanguageOptions;
}

const CodeEditorDisplay: FC<Props> = (props) => {
    let options = props.language;
    let highlighter = new SyntaxHighlighter(options);
    let text = props.text;
    let charColors = highlighter.highlight(text);
    let lines = highlighter.generateLines(text, charColors);
    let tableRows: JSX.Element[] = [];
    let lineIndex = 0;
    
    for (let line of lines) {
        tableRows.push(
            <tr key={"line " + lineIndex}>
                <td className={mergeClasses("code-height", {"bg-back-2": props.selected === lineIndex})}>
                    {line}
                </td>
            </tr>);
        lineIndex++;
    }
    
    return (
        <table className={"w-full whitespace-pre"}>
            <colgroup>
                <col className={"bg-back-1"}/>
            </colgroup>
            <tbody>
            {tableRows}
            </tbody>
        </table>
    );
}

export default memo(CodeEditorDisplay);