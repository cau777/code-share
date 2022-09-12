import {FC, PropsWithChildren} from "react";
import WarningIcon from "../icons/WarningIcon";

const BlockError: FC<PropsWithChildren> = (props) => {
    if (!props.children) return (<></>);
    
    return (
        <p className={"bg-error-800 text-error-50 flex items-center my-2 mx-1 p-2 rounded-lg gap-2 font-semibold"}>
            <WarningIcon width={"2.5rem"}></WarningIcon>
            <span>{props.children}</span>
        </p>
    );
}

export default BlockError;