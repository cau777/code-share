import {FC, useContext, useState} from "react";
import {AuthContext} from "../AuthContext";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ScreenCover from "../basic/ScreenCover";
import Link from "next/link";
import ProfilePicture from "../basic/ProfilePicture";
import {useTranslation} from "next-i18next";
import {NextRouter, useRouter} from "next/router";
import {mergeClasses} from "../../src/attributes";
import {supabase} from "../../src/supabase_client";

type State = {
    open: boolean;
}

function changeLocale(router: NextRouter, lang: string) {
    return router.replace(router.pathname, router.pathname, {locale: lang});
}

// Displays the current user profile picture along with a chevron that opens a floating menu
const CurrentProfileButton: FC = () => {
    const context = useContext(AuthContext);
    const [state, setState] = useState<State>({open: false});
    const {t} = useTranslation();
    const router = useRouter();
    
    return (
        <>
            {state.open && <ScreenCover onClick={() => setState({open: false})}></ScreenCover>}
            
            <div className={"flex items-center cursor-pointer"} onClick={() => setState({open: !state.open})} key={JSON.stringify(context)}>
                <div className={"h-8 w-8 m-1"}>
                    <ProfilePicture id={context.loggedIn ? context.id : undefined}></ProfilePicture>
                </div>
                
                <div className={"relative"}>
                    <ChevronDownIcon height={"1rem"}></ChevronDownIcon>
                    {state.open &&
                        <ul className={"absolute bg-back-2 px-3 py-2 rounded-lg border-2 border-back-3 translate-y-2 -translate-x-[85%] w-36 z-20 text-font-2"}>
                            {context.loggedIn ?
                                <>
                                    <li className={"w-full mb-2 text-xs cursor-auto word-wrap-normal"}
                                        onClick={e => e.stopPropagation()}>
                                        {t("loggedInAs")} @<b>{context.profileData.username}</b>
                                    </li>
                                    
                                    <Link href={"/profile"}>
                                        <li>{t("profile")}</li>
                                    </Link>
                                    <li>
                                        <button className={"p-0"} onClick={() => supabase.auth.signOut()}>{t("logOut")}</button>
                                    </li>
                                </> : <>
                                    <Link href={"/login"}>
                                        <li>{t("login")}</li>
                                    </Link>
                                </>}

                            <li>
                                <button type={"button"}
                                        className={mergeClasses("p-0.5 text-xs", {"font-bold": router.locale === "en"})}
                                        onClick={() => changeLocale(router, "en")}>English
                                </button>
                                |
                                <button type={"button"}
                                        className={mergeClasses("p-0.5 text-xs", {"font-bold": router.locale === "pt-BR"})}
                                        onClick={() => changeLocale(router, "pt-BR")}>Português
                                </button>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </>
    
    )
}

export default CurrentProfileButton;