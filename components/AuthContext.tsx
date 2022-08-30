import {createContext, FC, PropsWithChildren, useState} from "react";

type BaseCtx = {
    changeCtx: (ctx: AuthCtx) => void;
};

export type LoggedOutCtx = BaseCtx & {
    loggedIn: false
};

export type LoggedInCtx = BaseCtx & {
    loggedIn: true;
    id: string;
};

export type AuthCtx = LoggedInCtx | LoggedOutCtx;

// @ts-ignore
export const AuthContext = createContext<AuthCtx>(undefined);

const AuthProvider: FC<PropsWithChildren> = (props) => {
    let [state, setState] = useState<AuthCtx>({loggedIn: false, changeCtx: (ctx) => setState(ctx)});
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;