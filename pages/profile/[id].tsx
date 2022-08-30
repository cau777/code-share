import {NextPage} from "next";
import Profile from "../../components/profile/Profile";
import {useRouter} from "next/router";
import {useState} from "react";
import {AsyncState} from "../../utils/attributes";
import {ProfileData} from "../../utils/auth";
import {fromTable, supabase} from "../../utils/supabaseClient";
import Loading from "../../components/basic/Loading";
import {useAsyncEffect} from "../../utils/hooks";

const ProfileByIdPage: NextPage = () => {
    let router = useRouter();
    let {id} = router.query;
    let [state, setState] = useState<AsyncState<ProfileData>>({current: "loading"});
    
    useAsyncEffect(async () => {
        if (id === undefined) return;
        
        let {data} = await fromTable(supabase, "UserPublicInfo")
            .select("*")
            .match({id: id})
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
            return (<Profile data={state.value}></Profile>);
    }
}

export default ProfileByIdPage;