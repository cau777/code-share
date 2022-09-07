import {createContext, FC, PropsWithChildren, useEffect, useState} from "react";
import {ProfileData} from "../src/auth";

type BaseCtx = {
    changeCtx: (ctx: AuthCtx) => void;
};

export type LoggedOutCtx = BaseCtx & {
    loggedIn: false
};

export type LoggedInCtx = BaseCtx & {
    loggedIn: true;
    id: string;
    profileData: ProfileData;
};

export type AuthCtx = LoggedInCtx | LoggedOutCtx;

// @ts-ignore
export const AuthContext = createContext<AuthCtx>(undefined);

const AuthProvider: FC<PropsWithChildren> = (props) => {
    let [state, setState] = useState<AuthCtx>({loggedIn: false, changeCtx: (ctx) => setState(ctx)});
    
    useEffect(() => {
        console.log("New context", state);
    }, [state]);
    
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;