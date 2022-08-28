import {FC, PropsWithChildren} from "react";
import Link from "next/link";
import {mergeClasses} from "../utils/attributes";
import {useRouter} from "next/router";
import CurrentProfileButton from "./CurrentProfileButton";

const NavControls: FC<PropsWithChildren> = (props) => {
    let router = useRouter();
    
    return (
        <>
            <div className={"bg-back-2"}>
                <div className={"container"}>
                    <div className={"flex"}>
                        Logo
                        <span className={"header-link" + mergeClasses({selected: router.pathname === "/"})}>
                            <Link href={"/"}>Home</Link>
                        </span>
                        <CurrentProfileButton></CurrentProfileButton>
                    </div>
                </div>
            </div>
            <div className={"container mt-3"}>
                {props.children}
            </div>
        </>
    );
}

export default NavControls;