import {FC, PropsWithChildren, useContext} from "react";
import {AuthContext} from "./AuthContext";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

const AssertProfileComplete: FC<PropsWithChildren> = (props) => {
    let context = useContext(AuthContext);
    let router = useRouter();
    let {t} = useTranslation();
    
    if (context.loggedIn && !context.completedProfile) {
        router.push("/firstlogin").then();
        return (<h3>{t("errorMustCompleteProfile")}</h3>);
    }
    return (<>{props.children}</>);
}

export default AssertProfileComplete;