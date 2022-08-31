import {NextPage} from "next";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../components/AuthContext";
import Profile from "../../components/profile/Profile";
import {useRouter} from "next/router";
import {ProfileData, redirectToLogin} from "../../src/auth";
import {AsyncState} from "../../src/attributes";
import Loading from "../../components/basic/Loading";

const ProfilePage: NextPage = () => {
    let context = useContext(AuthContext);
    let router = useRouter();
    let [state, setState] = useState<AsyncState<ProfileData>>({current: "loading"});
    
    useEffect(() => {
        if (!context.loggedIn) {
            redirectToLogin(router).then();
            setState({current: "error", error: "Not logged in"});
            return;
        }
        
        let data = context.profileData;
        if (data === null)
            setState({current: "error", error: "Profile does not exist"});
        else
            setState({current: "ready", value: data});
        
    }, []);
    
    switch (state.current) {
        case "loading":
            return (<Loading></Loading>);
        case "error":
            return (<p>{state.error}</p>); // TODO: error message
        case "ready":
            return (<Profile data={state.value}></Profile>);
    }
}

export default ProfilePage;