import {FC, HTMLProps, PropsWithChildren} from "react";

type Props = HTMLProps<HTMLButtonElement>;

const BtnPrimary: FC<PropsWithChildren<Props>> = (props) => {
    return (
        // @ts-ignore
        <button {...props} className={"px-2 py-1 rounded-lg bg-primary-400 border-2 border-primary-500"}>{props.children}</button>
    )
}

export default BtnPrimary;