import {FC, useEffect, useState} from "react";
import Image from "next/image";
import defaultUser from "../../public/img/profile_avatar.png";
import {createUserImageUrl} from "../../src/images";

type Props = {
    id?: string;
}

function getState(id: string | undefined) {
    return id
        ? (createUserImageUrl(id) ?? defaultUser)
        : defaultUser
}

const ProfilePicture: FC<Props> = (props) => {
    const [url, setUrl] = useState(getState(props.id));
    
    useEffect(() => setUrl(getState(props.id)), [props.id]);
    
    return (
        <Image priority={false} src={url} layout={"responsive"} alt={"Profile picture of " + props.id} key={props.id}
               height={"100%"} width={"100%"} onError={() => setUrl(defaultUser)} className={"rounded-full"}></Image>
    )
}

export default ProfilePicture;