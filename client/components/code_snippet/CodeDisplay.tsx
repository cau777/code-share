import {FC, useState} from "react";
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

type State = {
    visible: boolean;
    highlight: [string, Uint8Array][];
}

const CodeDisplay: FC<Props> = (props) => {
    const options = props.language;
    const height = 23 * countOccurrences(props.text, "\n");
    const [state, setState] = useState<State>({visible: false, highlight: []});
    
    const {ref} = useInView({
        threshold: 0.001,
        onChange: visible => {
            if (state.highlight)
                setState({visible, highlight: highlightText(props.text, options)});
            else
                setState(s => ({...s, visible}));
        }
    });
    
    return (
        <table ref={ref} className={"w-full whitespace-pre monospace code"} style={{height}}>
            <colgroup>
                <col className={"bg-back-1"}/>
            </colgroup>
            <tbody>
            {state.visible ?
                state.highlight.map(([line, highlight], index) =>
                    <CodeEditorLine key={"line " + index} selected={props.selected === index} text={line}
                                    highlights={highlight}/>)
                : (<></>)}
            </tbody>
        </table>
    );
}

export default CodeDisplay;