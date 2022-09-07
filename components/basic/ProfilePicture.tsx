import {FC} from "react";
import Image from "next/image";
import {fromStorage, supabase} from "../../src/supabase_client";
import defaultUser from "../../public/img/profile_avatar.png";

type Props = {
    id?: string;
}
// TODO: dicebear
const ProfilePicture: FC<Props> = (props) => {
    let url;
    if (props.id)
        url = fromStorage(supabase, "profile-pictures").getPublicUrl(props.id + ".jpg").publicURL ?? defaultUser;
    else
        url = defaultUser;
    
    return (
        <div className={"relative h-full"}>
            <Image priority={false} src={defaultUser} layout={"fill"} alt={"Profile picture of " + props.id}
                   objectFit={"contain"} height={"100%"} width={"100%"}></Image>
        </div>
    )
}

export default ProfilePicture;