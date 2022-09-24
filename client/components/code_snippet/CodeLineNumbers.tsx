import {FC, memo, RefObject} from "react";

type Props = {
    lineCount: number;
    innerRef?: RefObject<HTMLTableElement>;
    offsetBottom?: boolean;
}

const CodeLineNumbers: FC<Props> = (props) => {
    const children: JSX.Element[] = [];
    
    for (let i = 0; i < props.lineCount; i++) {
        children.push(
            <tr key={"line " + i} className={"relative z-40 bg-back-2"}>
                <td className={"px-1 code-height m-1"}>{i + 1}</td>
            </tr>
        );
    }
    
    return (
        <div className={"code"}>
            <table className={"left-0"} ref={props.innerRef}>
                <colgroup>
                    <col className={"bg-back-2"}/>
                </colgroup>
                <tbody>
                {children}
                <tr>
                    {/* Offset scroll */}
                    {props.offsetBottom ? (<td height={16}/>) : (<></>)}
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default memo(CodeLineNumbers);