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
import ProfileImageEditSection from "./ProfileImageEditSection";
import {updateImage} from "../../src/images";
import {useTranslation} from "next-i18next";

type Props = UserData;

// Show all the public information about a user, including picture, id, name, bio, and posts
// Automatically, enabled editing if it's referring to the user logged in
const Profile: FC<Props> = (props) => {
    const [editing, setEditing] = useState(false);
    const [editingImg, setEditingImg] = useState(false);
    const context = useContext(AuthContext);
    const {t} = useTranslation();
    
    function profileData() {
        return editing ?
            <>
                <p>{t("tipClickImageEdit")}</p>
                <ProfileDataEdit data={props} id={context.loggedIn ? context.id : null!}
                                 onSave={(data) => {
                                     if (data && context.loggedIn)
                                         context.changeCtx({
                                             ...context,
                                             profileData: {...context.profileData, ...data}
                                         });
                                     setEditing(false);
                                 }}></ProfileDataEdit>
            </>
            : <>
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
    
    function profilePicture() {
        return (context.loggedIn && editingImg) ? (
            <ProfileImageEditSection
                id={context.id} onCancel={() => setEditingImg(false)}
                onSave={async (image) => {
                    await updateImage(image, context.id);
                    setEditingImg(false);
                    window.alert(t("profileImageUpdateSoon"));
                }}></ProfileImageEditSection>
        ) : (
            <div className={"m-2 cursor-pointer"} onClick={() => setEditingImg(true)}>
                <ProfilePicture id={props.id}></ProfilePicture>
            </div>
        );
    }
    
    return (
        <>
            <AboveSm render={() => (
                <div className={"flex gap-3 w-full"}>
                    <div className={"w-[24%]"}>
                        <Card>
                            {profilePicture()}
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
                                {profilePicture()}
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