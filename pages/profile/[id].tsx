import {NextPage} from "next";
import Profile from "../../components/profile/Profile";
import {useRouter} from "next/router";
import {useState} from "react";
import {AsyncState} from "../../src/attributes";
import {ProfileData} from "../../src/auth";
import {fromTable, supabase} from "../../src/supabase_client";
import Loading from "../../components/basic/Loading";
import {useAsyncEffect} from "../../src/hooks";
import Head from "next/head";

const ProfileByIdPage: NextPage = () => {
    let router = useRouter();
    let {id} = router.query;
    let [state, setState] = useState<AsyncState<ProfileData>>({current: "loading"});
    
    useAsyncEffect(async () => {
        if (id === undefined) return;
        
        let {data} = await fromTable(supabase, "UserPublicInfo")
            .select("*")
            .match({id})
            .single();
        
        if (data === null)
            setState({current: "error", error: "Profile does not exist"});
        else
            setState({current: "ready", value: data});
    }, [id]);
    
    switch (state.current) {
        case "loading":
            return (<Loading></Loading>);
        case "error":
            return (<p>{state.error}</p>); // TODO: error message
        case "ready":
            return (
                <>
                    <Head>
                        <title>{state.value.name}</title>
                    </Head>
                    <Profile data={state.value}></Profile>
                </>
            );
    }
}

export default ProfileByIdPage;