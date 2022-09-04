import {FC, useContext, useState} from "react";
import {AuthContext} from "../AuthContext";
import Image from "next/image";
import avatar from "../../public/img/profile_avatar.png";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ScreenCover from "../basic/ScreenCover";
import Link from "next/link";

type State = {
    open: boolean;
}

const CurrentProfileButton: FC = () => {
    let context = useContext(AuthContext);
    let [state, setState] = useState<State>({open: false});
    
    return (
        <>
            {state.open && <ScreenCover onClick={() => setState({open: false})}></ScreenCover>}
            
            <div className={"flex items-center cursor-pointer"} onClick={() => setState({open: !state.open})}>
                <div className={"w-10"}>
                    <Image src={avatar} layout={"responsive"}></Image>
                </div>
                <div className={"relative"}>
                    <ChevronDownIcon height={"1rem"}></ChevronDownIcon>
                    {/*TODO: fiz width*/}
                    {state.open &&
                        <ul className={"absolute bg-back-2 px-3 py-2 rounded-lg border-2 border-back-3 translate-y-2 -translate-x-3/4 min-w-[6rem]"}>
                            {context.loggedIn ?
                                <>
                                    <li>Logged in as {context.profileData.name}</li>
                                    <li><Link href={"/profile"}>Profile</Link></li>
                                    <li><Link href={"/logout"}>Logout</Link></li>
                                </> : <>
                                    <li><Link href={"/login"}>Login</Link></li>
                                </>}
                        </ul>
                    }
                </div>
            </div>
        </>
    
    )
}

export default CurrentProfileButton;