import {createContext, FC, PropsWithChildren, useState} from "react";

export type AuthCtx = (LoggedInCtx | LoggedOutCtx) & {
    changeCtx: (ctx: AuthCtx) => void;
};

export type LoggedOutCtx = {
    loggedIn: false
};

export type LoggedInCtx = {
    loggedIn: true;
    id: string;
};

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