import {FC, useContext} from "react";
import {AuthContext} from "./AuthContext";

const CurrentProfileButton: FC = () => {
    let context = useContext(AuthContext);
    return (
        <div>
            {JSON.stringify(context)}
        </div>
    )
}

export default CurrentProfileButton;