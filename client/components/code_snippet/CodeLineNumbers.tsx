import {FC, memo, RefObject} from "react";

type Props = {
    lineCount: number;
    innerRef?: RefObject<HTMLDivElement>;
}

const CodeLineNumbers: FC<Props> = (props) => {
    let children: JSX.Element[] = [];
    
    for (let i = 0; i < props.lineCount; i++) {
        children.push(
            <div key={"line " + i} className={"relative z-10 bg-back-2 code-height px-1"}>
                {i + 1}
            </div>
        );
    }
    
    return (
        <div>
            <div className={"code left-0"} ref={props.innerRef}>
                {children}
            </div>
        </div>
    );
}

export default memo(CodeLineNumbers);