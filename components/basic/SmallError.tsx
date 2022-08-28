import {FC} from "react";
import WarningIcon from "../icons/WarningIcon";

type Props = {
    message?: string;
}

const SmallError: FC<Props> = (props) => {
    if (!props.message) return <></>;
    return (
        <p className={"font-light text-sm text-error-300 flex items-center mt-0.5 w-full gap-2"}>
            <WarningIcon width={"1rem"}></WarningIcon>
            {props.message}
        </p>
    );
}

export default SmallError;