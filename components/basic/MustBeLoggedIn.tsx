import {FC} from "react";
import Link from "next/link";

type Props = {
    action: string;
}

const MustBeLoggedIn: FC<Props> = (props) => {
    return (
        <h3>
            You must be logged in to {props.action}. <span className={"simple-link"}><Link
            href={"/login"}>Login</Link></span> or <span className={"simple-link"}><Link
            href={"signup"}>Sign up</Link></span>
        </h3>
    )
}

export default MustBeLoggedIn;