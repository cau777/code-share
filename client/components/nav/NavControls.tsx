import {FC, PropsWithChildren} from "react";
import Link from "next/link";
import {mergeClasses} from "../../src/attributes";
import {useRouter} from "next/router";
import CurrentProfileButton from "./CurrentProfileButton";
import {useTranslation} from "next-i18next";
import {AboveSm, BelowMd} from "../basic/Breakpoints";
import HomeIcon from "../icons/HomeIcon";
import CodeSquareIcon from "../icons/CodeSquareIcon";
import Logo from "../basic/Logo";

const NavControls: FC<PropsWithChildren> = (props) => {
    let router = useRouter();
    let {t} = useTranslation();
    let path = router.pathname;
    
    return (
        <>
            <header className={"bg-back-2"}>
                <div className={"container"}>
                    <div className={"flex items-center gap-3"}>
                        <Link href={"/"}>
                            <div>
                                <Logo className={"my-auto cursor-pointer"}></Logo>
                            </div>
                        </Link>
                        
                        <AboveSm>
                        <span className={"header-link" + mergeClasses({selected: path === "/"})}>
                            <Link href={"/"}>{t("home")}</Link>
                        </span>
                            <span className={"header-link" + mergeClasses({selected: path === "/post"})}>
                            <Link href={"/post"}>{t("postSnippet")}</Link>
                        </span>
                            <span className={"header-link" + mergeClasses({selected: path === "/profile"})}>
                            <Link href={"/profile"}>{t("profile")}</Link>
                        </span>
                        </AboveSm>
                        
                        <div className={"ml-auto"}>
                            <CurrentProfileButton></CurrentProfileButton>
                        </div>
                    </div>
                </div>
            </header>
            <div className={"container mt-3"}>
                {props.children}
            </div>
            <BelowMd>
                <footer className={"fixed left-0 bottom-0 w-full bg-back-2 border-t-2 border-back-1 z-50"}>
                    <div className={"flex justify-around my-1"}>
                        <span className={"header-link" + mergeClasses({selected: path === "/"})}>
                            <Link href={"/"}>
                                <span>
                                <HomeIcon height={"2rem"}></HomeIcon>
                                </span>
                            </Link>
                        </span>
                        <span className={"header-link" + mergeClasses({selected: path === "/post"})}>
                            <Link href={"/post"}>
                                <span>
                                <CodeSquareIcon height={"2rem"}></CodeSquareIcon>
                                </span>
                            </Link>
                        </span>
                    </div>
                </footer>
            </BelowMd>
        </>
    );
}

export default NavControls;