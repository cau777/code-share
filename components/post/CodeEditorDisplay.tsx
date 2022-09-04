import {FC} from "react";
import {LanguageOptions} from "../../src/code/code_editor_types";
import {highlightText} from "../../src/code/syntax_highlight";
import CodeEditorLine from "./CodeEditorLine";

type Props = {
    text: string;
    selected: number;
    language: LanguageOptions;
}

const CodeEditorDisplay: FC<Props> = (props) => {
    let options = props.language;
    let linesWithColors = highlightText(props.text, options);
    
    return (
        <table className={"w-full whitespace-pre"}>
            <colgroup>
                <col className={"bg-back-1"}/>
            </colgroup>
            <tbody>
            {linesWithColors.map(([line, highlight], index) =>
                <CodeEditorLine key={"line " + index} selected={props.selected === index} text={line}
                                highlights={highlight}/>)}
            </tbody>
        </table>
    );
}

export default CodeEditorDisplay;