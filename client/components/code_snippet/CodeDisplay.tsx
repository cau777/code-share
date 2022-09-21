import {FC} from "react";
import {LanguageOptions} from "../../src/code/code_editor_types";
import {highlightText} from "../../src/code/syntax_highlight";
import CodeEditorLine from "./CodeLine";

type Props = {
    text: string;
    selected?: number;
    language: LanguageOptions;
}

const CodeDisplay: FC<Props> = (props) => {
    const options = props.language;
    const linesWithColors = highlightText(props.text, options);
    
    return (
        <table className={"w-full whitespace-pre monospace code"}>
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

export default CodeDisplay;