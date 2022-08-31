import {FC} from "react";
import {ProfileData} from "../../src/auth";
import Image from "next/image";
import avatar from "../../public/img/profile_avatar.png";
import VerticalLine from "../basic/VerticalLine";

type Props = {
    data: ProfileData;
}

const Profile: FC<Props> = (props) => {
    let data = props.data;
    return (
        <div className={"md:flex"}>
            <div className={"md:basis-1/4"}>
                <div className={"flex items-center gap-4 md:block"}>
                    <div className={"basis-1/4 md:basis-auto"}>
                        <Image src={avatar} objectFit={"contain"}></Image>
                    </div>
                    <h2>{data.name}</h2>
                </div>
                <p>{data.bio}</p>
            </div>
            <div className={"hidden md:block"}>
                <VerticalLine></VerticalLine>
            </div>
        </div>
    );
}

export default Profile;