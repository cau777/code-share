import {FC, PropsWithChildren} from "react";

const Card: FC<PropsWithChildren> = (props) => {
    return (
        <div className={"rounded-xl p-4 bg-back-2"}>
            {props.children}
        </div>
    );
}

export default Card;