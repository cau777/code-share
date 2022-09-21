import {NextRouter} from "next/router";
import {AuthCtx} from "../components/AuthContext";
import {User} from "@supabase/gotrue-js";
import {fromTable, supabase} from "./supabase_client";

export function redirectToLogin(router: NextRouter) {
    return router.push("/login");
}

async function getProfileData(id: string) {
    const response = await fromTable(supabase, "UserPublicInfo")
        .select("*")
        .match({id})
        .single();
    return response.data;
}

export async function login(context: AuthCtx, user: User) {
    const profileData = await getProfileData(user.id);
    const result = profileData !== null;
    
    context.changeCtx({
        completedProfile: result,
        loggedIn: true,
        changeCtx: context.changeCtx,
        profileData: profileData ?? {bio: "", name: "", username: ""},
        id: user.id
    });
    
    return result;
}