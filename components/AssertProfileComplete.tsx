import {FC, PropsWithChildren, useContext} from "react";
import {AuthContext} from "./AuthContext";
import {useRouter} from "next/router";

const AssertProfileComplete: FC<PropsWithChildren> = (props) => {
    let context = useContext(AuthContext);
    let router = useRouter();
    if (context.loggedIn && !context.completedProfile) {
        router.push("/firstlogin").then();
        return (<h3>You must complete your profile to access this page</h3>);
    }
    return (<>{props.children}</>);
}

export default AssertProfileComplete;