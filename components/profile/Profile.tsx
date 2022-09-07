import {FC, useContext, useState} from "react";
import {ProfileData} from "../../src/auth";
import Image from "next/image";
import avatar from "../../public/img/profile_avatar.png";
import VerticalLine from "../basic/VerticalLine";
import SnippetsFeed from "../home/SnippetsFeed";
import ProfileDataEdit from "./ProfileDataEdit";
import Card from "../Card";
import PenSquareIcon from "../icons/PenSquareIcon";
import {AuthContext} from "../AuthContext";
import {AboveSm, BelowMd} from "../basic/Breakpoints";

type Props = ProfileData & { id: string; }

const Profile: FC<Props> = (props) => {
    let [editing, setEditing] = useState(false);
    let context = useContext(AuthContext);
    
    function profileData() {
        return editing ?
            <ProfileDataEdit data={props} id={context.loggedIn ? context.id : null!}
                             onSave={(data) => {
                                 if (data && context.loggedIn)
                                     context.changeCtx({...context, profileData: data});
                                 setEditing(false);
                             }}></ProfileDataEdit>
            : <>
                {(context.loggedIn && context.id === props.id) &&
                    <button
                        className={"float-right rounded bg-back-3 p-1 grid-center cursor-pointer"}
                        onClick={() => setEditing(true)}>
                        <PenSquareIcon width={"1rem"} height={"1rem"}></PenSquareIcon>
                    </button>}
                <h2>{props.name}</h2>
                <p>{props.bio}</p>
            </>
    }
    
    return (
        <>
            <AboveSm>
                <div className={"flex gap-3"}>
                    <div className={"basis-1/4"}>
                        <Card>
                            <div>
                                <Image src={avatar} objectFit={"contain"}></Image>
                            </div>
                            {profileData()}
                        </Card>
                    </div>
                    <div>
                        <VerticalLine></VerticalLine>
                    </div>
                    <div className={"flex-grow"}>
                        <SnippetsFeed specificUser={props.id}></SnippetsFeed>
                    </div>
                </div>
            </AboveSm>
            
            <BelowMd>
                <Card>
                    <div className={"flex gap-4"}>
                        <div className={"basis-1/4"}>
                            <Image src={avatar} objectFit={"contain"}></Image>
                        </div>
                        <div className={"basis-3/4"}>
                            {profileData()}
                        </div>
                    </div>
                </Card>
                <hr className={"my-2"}/>
                <div className={"flex-grow"}>
                    <SnippetsFeed specificUser={props.id}></SnippetsFeed>
                </div>
            </BelowMd>
        </>
    
    );
}

export default Profile;