import {FC, useEffect, useState} from "react";
import {LanguageOptions} from "../../src/code/code_editor_types";
import {highlightText} from "../../src/code/syntax_highlight";
import CodeEditorLine from "./CodeLine";
import {countOccurrences} from "../../src/text";
import {useInView} from "react-intersection-observer";

type Props = {
    text: string;
    selected?: number;
    language: LanguageOptions;
}


const CodeDisplay: FC<Props> = (props) => {
    const options = props.language;
    const height = 23 * countOccurrences(props.text, "\n");
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState< [string, Uint8Array][]>([]);
    
    const {ref} = useInView({
        threshold: 0.001,
        onChange: setVisible
    });
    
    useEffect(() => {
        setState(highlightText(props.text, options));
    }, [options, props.text]);
    
    return (
        <table ref={ref} className={"w-full whitespace-pre monospace code"} style={{height}}>
            <colgroup>
                <col className={"bg-back-1"}/>
            </colgroup>
            <tbody>
            {visible ?
                state.map(([line, highlight], index) =>
                    <CodeEditorLine key={"line " + index} selected={props.selected === index} text={line}
                                    highlights={highlight}/>)
                : (<></>)}
            </tbody>
        </table>
    );
}

export default CodeDisplay;