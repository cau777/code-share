import {FC} from "react";
import {ProfileData} from "../../src/auth";
import Image from "next/image";
import avatar from "../../public/img/profile_avatar.png";
import VerticalLine from "../basic/VerticalLine";
import SnippetsFeed from "../home/SnippetsFeed";

type Props = ProfileData & {id: string;}

const Profile: FC<Props> = (props) => {
    return (
        <div className={"md:flex"}>
            <div className={"md:basis-1/4"}>
                <div className={"flex items-center gap-4 md:block"}>
                    <div className={"basis-1/4 md:basis-auto"}>
                        <Image src={avatar} objectFit={"contain"}></Image>
                    </div>
                    <h2>{props.name}</h2>
                </div>
                <p>{props.bio}</p>
            </div>
            <div className={"hidden md:block"}>
                <VerticalLine></VerticalLine>
            </div>
            <div className={"flex-grow"}>
                <SnippetsFeed specificUser={props.id}></SnippetsFeed>
            </div>
        </div>
    );
}

export default Profile;