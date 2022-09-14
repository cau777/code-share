import {FC, useEffect, useState} from "react";
import Image from "next/image";
import {fromStorage, supabase} from "../../src/supabase_client";
import defaultUser from "../../public/img/profile_avatar.png";

type Props = {
    id?: string;
}

function getState(id: string | undefined) {
    return id
        ? (fromStorage(supabase, "profile-pictures").getPublicUrl(id + ".jpg").publicURL ?? defaultUser)
        : defaultUser
}

const ProfilePicture: FC<Props> = (props) => {
    let [url, setUrl] = useState(getState(props.id));
    
    useEffect(() => setUrl(getState(props.id)), [props.id]);
    
    return (
        <Image priority={false} src={url} layout={"responsive"} alt={"Profile picture of " + props.id} key={props.id}
               height={"100%"} width={"100%"} onError={() => setUrl(defaultUser)} className={"rounded-full"}></Image>
    )
}

export default ProfilePicture;