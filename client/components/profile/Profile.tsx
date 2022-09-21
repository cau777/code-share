import {FC, useContext, useState} from "react";
import VerticalLine from "../basic/VerticalLine";
import SnippetsFeed from "../home/SnippetsFeed";
import ProfileDataEdit from "./ProfileDataEdit";
import Card from "../Card";
import PenSquareIcon from "../icons/PenSquareIcon";
import {AuthContext} from "../AuthContext";
import {AboveSm, BelowMd} from "../basic/Breakpoints";
import ProfilePicture from "../basic/ProfilePicture";
import {UserData} from "../../src/db_types";

type Props = UserData;

const Profile: FC<Props> = (props) => {
    let [editing, setEditing] = useState(false);
    let context = useContext(AuthContext);
    
    function profileData() {
        return editing ?
            <ProfileDataEdit data={props} id={context.loggedIn ? context.id : null!}
                             onSave={(data) => {
                                 if (data && context.loggedIn)
                                     context.changeCtx({...context, profileData: {...context.profileData, ...data}});
                                 setEditing(false);
                             }}></ProfileDataEdit>
            : <>
                {/*TODO: image update*/}
                {(context.loggedIn && context.id === props.id) &&
                    <button
                        className={"float-right rounded bg-back-3 p-1 grid-center cursor-pointer"}
                        onClick={() => setEditing(true)}>
                        <PenSquareIcon width={"1rem"} height={"1rem"}></PenSquareIcon>
                    </button>}
                <h2>{props.name}</h2>
                <h3 className={"text-font-2"}>@{props.username}</h3>
                {props.bio.length !== 0 ? (<hr className={"my-2"}/>) : (<></>)}
                <p>{props.bio}</p>
            </>
    }
    
    return (
        <>
            <AboveSm render={() => (
                <div className={"flex gap-3 w-full"}>
                    <div className={"w-[24%]"}>
                        <Card>
                            <div className={"p-2"}>
                                <ProfilePicture id={props.id}></ProfilePicture>
                            </div>
                            {profileData()}
                        </Card>
                    </div>
                    <div className={"flex-grow"}>
                        <span className={"grid-center h-full"}><VerticalLine></VerticalLine></span>
                    </div>
                    <div className={"w-[73%]"}>
                        <SnippetsFeed key={"feed " + props.id} userFilter={props.id}></SnippetsFeed>
                    </div>
                </div>
            )}></AboveSm>
            
            <BelowMd render={() => (
                <>
                    <Card>
                        <div className={"flex gap-4"}>
                            <div className={"basis-1/4"}>
                                <ProfilePicture id={props.id}></ProfilePicture>
                            </div>
                            <div className={"basis-3/4"}>
                                {profileData()}
                            </div>
                        </div>
                    </Card>
                    <hr className={"my-2"}/>
                    <div className={"flex-grow"}>
                        <SnippetsFeed userFilter={props.id}></SnippetsFeed>
                    </div>
                </>
            )}></BelowMd>
        </>
    );
}

export default Profile;