import {FC} from "react";
import {ProfileData} from "../../utils/auth";

type Props = {
    data: ProfileData;
}

const Profile: FC<Props> = (props) => {
    return (
        <div>
            {JSON.stringify(props.data)}
        </div>
    );
}

export default Profile;