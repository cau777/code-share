import {FC} from "react";
import {useTranslation} from "next-i18next";

type Props = {
    message: string;
    target: string;
}

const Redirect: FC<Props> = (props) => {
    const {t} = useTranslation();
    
    return (
        <div>
            {props.message + ". " + t("redirectingTo") + " " + props.target}
        </div>
    );
}

export default Redirect;