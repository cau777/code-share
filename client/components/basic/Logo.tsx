import {FC, HTMLProps} from "react";
import {mergeClasses} from "../../src/attributes";

type Props = HTMLProps<HTMLDivElement>;

const Logo: FC<Props> = (props) => {
    return (
        <div {...props} className={mergeClasses("monospace text-primary-200 font-semibold", props.className)}>Code.Share</div>
    )
}

export default Logo;