import {FC, memo, RefCallback} from "react";

type Props = {
    lineCount: number;
    innerRef: RefCallback<HTMLDivElement>;
}

const CodeEditorLineNumbers: FC<Props> = (props) => {
    let children: JSX.Element[] = [];
    
    for (let i = 0; i < props.lineCount; i++) {
        children.push(
            <tr key={"line " + i}>
                <td className={"px-1 code-height"}>{i + 1}</td>
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
                    <td height={20}/>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default memo(CodeEditorLineNumbers);