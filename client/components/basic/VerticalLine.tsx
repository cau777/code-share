import {FC, HTMLProps} from "react";
import {mergeClasses} from "../../src/attributes";

const VerticalLine: FC<HTMLProps<HTMLDivElement>> = (props) => {
    return (
        <div {...props} className={mergeClasses("border-l-2 border-font-2 h-full my-1", props.className)}>
        
        </div>
    )
}

export default VerticalLine;