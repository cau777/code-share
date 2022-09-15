import {createContext, FC, PropsWithChildren, useState} from "react";
import {ProfileData} from "../src/db_types";
import {useAsyncEffect} from "../src/hooks";
import {supabase} from "../src/supabase_client";
import {login} from "../src/auth";

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

// TODO: logging in state
const AuthProvider: FC<PropsWithChildren> = (props) => {
    let [state, setState] = useState<AuthCtx>({loggedIn: false, changeCtx: (ctx) => setState(ctx)});
    
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
    
    return (
        // TODO: needed?
        // Key attribute forces re-render when the user data changes
        <AuthContext.Provider value={state} key={JSON.stringify(state)}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;