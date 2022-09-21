import {FC} from "react";
import Link from "next/link";
import {useTranslation} from "next-i18next";

type Props = {
    actionKey: string;
}

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