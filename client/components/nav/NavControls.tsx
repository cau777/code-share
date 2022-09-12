import {FC, PropsWithChildren} from "react";
import Link from "next/link";
import {mergeClasses} from "../../src/attributes";
import {useRouter} from "next/router";
import CurrentProfileButton from "./CurrentProfileButton";
import {useTranslation} from "next-i18next";

const NavControls: FC<PropsWithChildren> = (props) => {
    let router = useRouter();
    let {t} = useTranslation();
    
    return (
        <>
            <header className={"bg-back-2"}>
                <div className={"container"}>
                    <div className={"flex items-center gap-3"}>
                        <div>
                            Logo
                        </div>
                        <span className={"header-link" + mergeClasses({selected: router.pathname === "/"})}>
                            <Link href={"/"}>{t("home")}</Link>
                        </span>
                        <span className={"header-link" + mergeClasses({selected: router.pathname === "/post"})}>
                            <Link href={"/post"}>{t("postSnippet")}</Link>
                        </span>
                        <span className={"header-link" + mergeClasses({selected: router.pathname === "/profile"})}>
                            <Link href={"/profile"}>{t("profile")}</Link>
                        </span>
                        <span className={"header-link" + mergeClasses({selected: router.pathname === "/profile/test1"})}>
                            <Link href={"/profile/test1"}>Profile 1</Link>
                        </span>
                        <span className={"header-link" + mergeClasses({selected: router.pathname === "/profile/test2"})}>
                            <Link href={"/profile/test2"}>Profile 2</Link>
                        </span>
                        <div className={"ml-auto"}>
                            <CurrentProfileButton></CurrentProfileButton>
                        </div>
                    </div>
                </div>
            </header>
            <div className={"container mt-3"}>
                {props.children}
            </div>
        </>
    );
}

export default NavControls;