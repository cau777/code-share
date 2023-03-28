import {AuthCtx} from "../components/AuthContext";
import {User} from "@supabase/gotrue-js";
import {fromTable, supabase} from "./supabase_client";

// Queries the database with the specified if,
// @returns The public data associated with that user, or null if it wasn't found
async function getProfileData(id: string) {
    const response = await fromTable(supabase, "UserPublicInfo")
        .select("*")
        .match({id})
        .single();
    return response.data;
}

// Sets the authentication context with the data of the new user
// @returns whether the operation was successful
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

// Sets the authentication context with default values
export function logout(context: AuthCtx) {
    context.changeCtx({
        loggedIn: false,
        changeCtx: context.changeCtx
    });
}
