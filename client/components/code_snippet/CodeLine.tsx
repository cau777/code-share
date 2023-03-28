import {mergeClasses} from "../../src/attributes";
import {FC, memo} from "react";
import {HighlightColorCodes, HighlightColorNames} from "../../src/code/syntax_highlight";
import {arraysAreEqual} from "../../src/arrays";

type Props = {
    text: string;
    highlights: Uint8Array;
    selected: boolean;
};

function generate(text: string, charColors: Uint8Array) {
    let spanIndex = 0;
    // Add a space if the line is empty because the height of empty table lines is always empty
    if (text.length === 0) {
        return [<span key={spanIndex++}>{" "}</span>];
    }
    
    const result: JSX.Element[] = [];
    let currentColor = HighlightColorCodes.None;
    let textBuffer = "";
    
    for (let i = 0; i <= text.length; i++) {
        const char = text.charAt(i);
    
        if (char === "\n" || i === text.length) {
            if (textBuffer !== "")
                result.push(<span key={spanIndex++}
                                  className={"code-" + HighlightColorNames[currentColor]}>{textBuffer}</span>);
            return result;
        } else {
            const color = charColors[i];
    
            // If the color of the current character is different from the previous
            if (char !== " " && currentColor !== color) {
                if (textBuffer !== "")
                    result.push(<span key={spanIndex++}
                                      className={"code-" + HighlightColorNames[currentColor]}>{textBuffer}</span>);
                currentColor = color;
                textBuffer = "";
            }
            
            textBuffer += char;
        }
    }
    
    return result;
}

// Displays a single line of code. It's different if the line is selected
const CodeLine: FC<Props> = (props) => {
    return (
        <tr>
            <td className={mergeClasses("code-height pl-1", {"border-y-2 border-back-3": props.selected})}>
                {generate(props.text, props.highlights)}
            </td>
        </tr>
    );
}

export default memo(CodeLine, (prev, next) => {
    return prev.text === next.text &&
        prev.selected === next.selected &&
        arraysAreEqual(prev.highlights, next.highlights)
});