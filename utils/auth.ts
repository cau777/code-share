import {NextRouter} from "next/router";
import {AuthCtx} from "../components/AuthContext";
import {User} from "@supabase/gotrue-js";
import {fromTable, supabase} from "./supabaseClient";

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

async function getProfileData(id: string) {
    let response = await fromTable(supabase, "UserPublicInfo")
        .select("*")
        .match({id})
        .single();
    if (response.data === null) throw new Error("Logged in profile not found in database");
    return response.data;
}

export async function login(context: AuthCtx, user: User) {
    let profileData = await getProfileData(user.id);
    context.changeCtx({
        loggedIn: true,
        changeCtx: context.changeCtx,
        profileData,
        id: user.id
    });
}

export type ProfileData = {
    name: string;
    bio: string;
}