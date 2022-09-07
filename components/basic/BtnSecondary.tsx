import {FC, HTMLProps, PropsWithChildren} from "react";

type Props = HTMLProps<HTMLButtonElement>;

const BtnPrimary: FC<PropsWithChildren<Props>> = (props) => {
    return (
        // @ts-ignore
        <button {...props}
                className={"bg-gray-600 border-2 border-gray-800 disabled:bg-primary-700 disabled:border-primary-900 disabled:text-font-2"}>
            {props.children}</button>
    )
}

export default BtnPrimary;