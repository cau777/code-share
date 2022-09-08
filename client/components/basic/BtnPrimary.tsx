import {FC, HTMLProps, PropsWithChildren} from "react";

type Props = HTMLProps<HTMLButtonElement>;

const BtnPrimary: FC<PropsWithChildren<Props>> = (props) => {
    return (
        // @ts-ignore
        <button {...props}
                className={"bg-primary-400 border-2 border-primary-500 disabled:bg-primary-600 disabled:border-primary-600 disabled:text-font-2"}>
            {props.children}</button>
    )
}

export default BtnPrimary;