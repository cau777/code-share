import {NextPage} from "next";
import Profile from "../../components/profile/Profile";
import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {AsyncState} from "../../src/attributes";
import {fromTable, supabase} from "../../src/supabase_client";
import Loading from "../../components/basic/Loading";
import {useAsyncEffect} from "../../src/hooks";
import Head from "next/head";
import {AppName} from "../../src/styling";
import {AuthContext} from "../../components/AuthContext";
import {UserData} from "../../src/db_types";
import {getServerCommonTranslations} from "../../src/i18n";

const ProfileByUsernamePage: NextPage = () => {
    let router = useRouter();
    let {username} = router.query;
    let [state, setState] = useState<AsyncState<UserData>>({current: "loading"});
    let context = useContext(AuthContext);
    let shouldRedirect = context.loggedIn && context.profileData.name === username;
    
    useAsyncEffect(async () => {
        if (shouldRedirect) return;
        if (username === undefined) return;
        
        let {data} = await fromTable(supabase, "UserPublicInfo")
            .select("*")
            .match({username})
            .single();
        
        if (data === null)
            setState({current: "error", error: "Profile does not exist"});
        else
            setState({current: "ready", value: data});
    }, [username]);
    
    if (shouldRedirect) {
        router.push("/profile").then();
        return (<p>Redirecting</p>);
    }
    
    switch (state.current) {
        case "loading":
            return (<Loading></Loading>);
        case "error":
            return (<p>{state.error}</p>); // TODO: error message
        case "ready":
            return (
                <>
                    <Head>
                        <title>{state.value.name} {AppName}</title>
                    </Head>
                    <Profile {...state.value}></Profile>
                </>
            );
    }
}

export const getServerSideProps = getServerCommonTranslations();

export default ProfileByUsernamePage;