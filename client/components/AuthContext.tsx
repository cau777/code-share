import {createContext, FC, PropsWithChildren, useState} from "react";
import {ProfileData} from "../src/db_types";
import {useEffectOnMount} from "../src/hooks";
import {login, logout} from "../src/auth";
import {useRouter} from "next/router";
import {AuthCallbackBuffer} from "../src/supabase_client";

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

// AuthContext provider
const AuthProvider: FC<PropsWithChildren> = (props) => {
    const [state, setState] = useState<AuthCtx>({loggedIn: false, changeCtx: (ctx) => setState(ctx)});
    let router = useRouter();
    
    useEffectOnMount(() => {
        AuthCallbackBuffer.registerListener(async ({event, session}) => {
            if (event === "SIGNED_OUT") {
                logout(state);
                await router.push("/login");
            }
            if (event === "SIGNED_IN") {
                await login(state, session!.user!);
            }
        });
    });
    
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;