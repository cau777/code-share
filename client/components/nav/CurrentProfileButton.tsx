import {FC, useContext, useState} from "react";
import {AuthContext} from "../AuthContext";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ScreenCover from "../basic/ScreenCover";
import Link from "next/link";
import ProfilePicture from "../basic/ProfilePicture";
import {useTranslation} from "next-i18next";

type State = {
    open: boolean;
}

const CurrentProfileButton: FC = () => {
    let context = useContext(AuthContext);
    let [state, setState] = useState<State>({open: false});
    let {t} = useTranslation();
    //TODO: language switch
    return (
        <>
            {state.open && <ScreenCover onClick={() => setState({open: false})}></ScreenCover>}
            
            <div className={"flex items-center cursor-pointer"} onClick={() => setState({open: !state.open})}>
                <div className={"h-8 w-8 m-1"}>
                    <ProfilePicture id={context.loggedIn ? context.id : undefined}></ProfilePicture>
                </div>
                
                <div className={"relative"}>
                    <ChevronDownIcon height={"1rem"}></ChevronDownIcon>
                    {state.open &&
                        <ul className={"absolute bg-back-2 px-3 py-2 rounded-lg border-2 border-back-3 translate-y-2 -translate-x-[85%] w-36 z-20 text-font-2"}>
                            {context.loggedIn ?
                                <>
                                    <li className={"w-full mb-2 text-xs cursor-auto word-wrap-normal"} onClick={e => e.stopPropagation()}>
                                        {t("loggedInAs")} @<b>{context.profileData.username}</b>
                                    </li>
                                    
                                    <Link href={"/profile"}><li>{t("profile")}</li></Link>
                                    <Link href={"/logout"}><li>{t("logOut")}</li></Link>
                                </> : <>
                                    <Link href={"/login"}><li>{t("login")}</li></Link>
                                </>}
                        </ul>
                    }
                </div>
            </div>
        </>
    
    )
}

export default CurrentProfileButton;