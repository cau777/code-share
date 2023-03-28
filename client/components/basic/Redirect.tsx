import {FC} from "react";
import {useTranslation} from "next-i18next";

type Props = {
    message: string;
    target: string;
}

// Only formats a redirecting text starting with the provided message.
// It doesn't perform the redirect functionality
const Redirect: FC<Props> = (props) => {
    const {t} = useTranslation();
    
    return (
        <div>
            {props.message + ". " + t("redirectingTo") + " " + props.target}
        </div>
    );
}

export default Redirect;