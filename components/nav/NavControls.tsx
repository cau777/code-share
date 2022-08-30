import {FC, PropsWithChildren} from "react";
import Link from "next/link";
import {mergeClasses} from "../../utils/attributes";
import {useRouter} from "next/router";
import CurrentProfileButton from "./CurrentProfileButton";

const NavControls: FC<PropsWithChildren> = (props) => {
    let router = useRouter();
    
    return (
        <>
            <div className={"bg-back-2"}>
                <div className={"container"}>
                    <div className={"flex items-center gap-3"}>
                        <div>
                            Logo
                        </div>
                        <span className={"header-link" + mergeClasses({selected: router.pathname === "/"})}>
                            <Link href={"/"}>Home</Link>
                        </span>
                        <span className={"header-link" + mergeClasses({selected: router.pathname === "/post"})}>
                            <Link href={"/post"}>Post snippet</Link>
                        </span>
                        <span className={"header-link" + mergeClasses({selected: router.pathname === "/profile"})}>
                            <Link href={"/profile"}>Profile</Link>
                        </span>
                        <span className={"header-link" + mergeClasses({selected: router.pathname === "/"})}>
                            <Link href={"/profile/6af7dcea-b563-4820-b2ef-3c78014ec0ba"}>Profile 6af</Link>
                        </span>
                        <div className={"ml-auto"}>
                            <CurrentProfileButton></CurrentProfileButton>
                        </div>
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