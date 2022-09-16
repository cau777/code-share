import {FC, HTMLProps, PropsWithChildren} from "react";
import {mergeClasses} from "../src/attributes";

type Props = HTMLProps<HTMLDivElement>;

const Card: FC<PropsWithChildren<Props>> = (props) => {
    return (
        <div {...props} className={mergeClasses("rounded-xl p-4 bg-back-2", props.className)}>
            {props.children}
        </div>
    );
}

export default Card;