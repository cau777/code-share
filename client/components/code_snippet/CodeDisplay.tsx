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
    let options = props.language;
    let linesWithColors = highlightText(props.text, options);
    
    return (
        <div>
            
            <div className={"w-full whitespace-pre monospace code bg-back-1"}>
                {linesWithColors.map(([line, highlight], index) =>
                    <CodeEditorLine key={"line " + index} selected={props.selected === index} text={line}
                                    highlights={highlight}/>)}
            </div>
        </div>
    );
}

export default CodeDisplay;