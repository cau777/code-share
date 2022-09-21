import {FC, PropsWithChildren, useContext, useEffect, useState} from "react";
import {AuthContext, LoggedInCtx} from "./AuthContext";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

const AssertProfileComplete: FC<PropsWithChildren> = (props) => {
    const context = useContext(AuthContext);
    const router = useRouter();
    const {t} = useTranslation();
    const [show, setShow] = useState(!context.loggedIn || context.completedProfile);
    const loggedCtx = context as LoggedInCtx;
    
    useEffect(() => {
        setShow(!context.loggedIn || context.completedProfile);
    }, [context.loggedIn, loggedCtx.completedProfile, context])
    
    if (show || router.pathname.includes("firstlogin"))
        return (<>{props.children}</>);
    
    router.push("/firstlogin").then();
    return (<h3>{t("errorMustCompleteProfile")}</h3>);
}

export default AssertProfileComplete;