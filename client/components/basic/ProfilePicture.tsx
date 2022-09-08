import {FC, useState} from "react";
import Image from "next/image";
import {fromStorage, supabase} from "../../src/supabase_client";
import defaultUser from "../../public/img/profile_avatar.png";

type Props = {
    id?: string;
}
// TODO: dicebear
const ProfilePicture: FC<Props> = (props) => {
    let [url, setUrl] = useState(props.id
        ? (fromStorage(supabase, "profile-pictures").getPublicUrl(props.id + ".jpg").publicURL ?? defaultUser)
        : defaultUser
    );
    
    return (
        <Image priority={false} src={url} layout={"responsive"} alt={"Profile picture of " + props.id}
               height={"100%"} width={"100%"} onError={() => setUrl(defaultUser)}></Image>
    )
}

export default ProfilePicture;