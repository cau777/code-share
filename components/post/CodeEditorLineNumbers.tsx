import {FC, memo, RefObject} from "react";

type Props = {
    lineCount: number;
    innerRef: RefObject<HTMLTableElement>;
}

const CodeEditorLineNumbers: FC<Props> = (props) => {
    let children: JSX.Element[] = [];
    
    for (let i = 0; i < props.lineCount; i++) {
        children.push(
            <tr key={"line " + i}>
                <td className={"px-1 code-height m-1"}>{i + 1}</td>
            </tr>
        );
    }
    
    return (
        <div>
            <table className="left-0" ref={props.innerRef}>
                <colgroup>
                    <col/>
                </colgroup>
                <tbody>
                {children}
                <tr>
                    {/* Offset some display errors */}
                    <td height={4}/>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default memo(CodeEditorLineNumbers);