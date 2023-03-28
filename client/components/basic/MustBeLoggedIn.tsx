import {FC} from "react";
import Link from "next/link";
import {useTranslation} from "next-i18next";

type Props = {
    actionKey: string;
}

// Component that displays says the user is not logged in, orienting them to log in or sign up.
// It doesn't check if the user is logged in or not
const MustBeLoggedIn: FC<Props> = (props) => {
    const {t} = useTranslation();
    
    return (
        <h3>
            {t("youMustLogin")} {t(props.actionKey)}. <span className={"simple-link"}><Link
            href={"/login"}>{t("login")}</Link></span> or <span className={"simple-link"}><Link
            href={"signup"}>{t("signUp")}</Link></span>
        </h3>
    )
}

export default MustBeLoggedIn;