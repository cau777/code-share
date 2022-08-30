import {NextRouter} from "next/router";
import {AuthCtx} from "../components/AuthContext";

export function redirectToLogin(router: NextRouter) {
    return router.push("/login");
}

export async function getLoggedContextOrRedirect(router: NextRouter, context: AuthCtx) {
    console.log(context);
    if (context.loggedIn) {
        return context;
    }
    await redirectToLogin(router);
    return null;
}

export type ProfileData = {
     name: string;
     bio: string;
}