import {createContext, FC, PropsWithChildren, useState} from "react";
import {ProfileData} from "../src/db_types";
import {useAsyncEffect} from "../src/hooks";
import {supabase} from "../src/supabase_client";
import {login} from "../src/auth";
import Loading from "./basic/Loading";

type BaseCtx = {
    changeCtx: (ctx: AuthCtx) => void;
};

export type LoggedOutCtx = BaseCtx & {
    loggedIn: false;
};

export type LoggedInCtx = BaseCtx & {
    loggedIn: true;
    id: string;
    completedProfile: boolean;
    profileData: ProfileData;
};

export type AuthCtx = LoggedInCtx | LoggedOutCtx;

// @ts-ignore
export const AuthContext = createContext<AuthCtx>(undefined);

const AuthProvider: FC<PropsWithChildren> = (props) => {
    let [state, setState] = useState<AuthCtx>();
    
    useAsyncEffect(async () => {
        let context: AuthCtx = {loggedIn: false, changeCtx: (ctx) => setState(ctx)};
        
        async function tryLogIn() {
            let token = localStorage.getItem("refresh_token");
            if (!token) return false;
            let {user} = await supabase.auth.signIn({refreshToken: token});
            if (!user) return false;
            return await login(context, user);
        }
        
        let result = await tryLogIn();
        if (!result) // If the callback in login() wasn't called
            setState(context);
    }, []);
    
    if (!state)
        return (<Loading></Loading>);
    
    return (
        <AuthContext.Provider value={state} key={supabase.auth.session()?.access_token ?? "null"}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;