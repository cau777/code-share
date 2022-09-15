import {FC, PropsWithChildren, useContext, useEffect, useState} from "react";
import {AuthContext, LoggedInCtx} from "./AuthContext";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

const AssertProfileComplete: FC<PropsWithChildren> = (props) => {
    let context = useContext(AuthContext);
    let router = useRouter();
    let {t} = useTranslation();
    let [show, setShow] = useState(!context.loggedIn || context.completedProfile);
    
    useEffect(() => {
        setShow(!context.loggedIn || context.completedProfile);
    }, [context.loggedIn, (context as LoggedInCtx).completedProfile, context])
    
    if (show || router.pathname.includes("firstlogin"))
        return (<>{props.children}</>);
    
    router.push("/firstlogin").then();
    return (<h3>{t("errorMustCompleteProfile")}</h3>);
}

export default AssertProfileComplete;