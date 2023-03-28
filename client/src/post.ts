import {fromTable, supabase} from "./supabase_client";
import {Snippet} from "../components/home/SnippetsFeed";
import {Tables} from "./db_types";

// Given a post downloaded from the Supabase table, it adds to the object information about the user that made the post
export async function completeSnippetData(o: Tables["Posts"]): Promise<Snippet> {
    const userData = await fromTable(supabase, "UserPublicInfo")
        .select("id, name, username")
        .match({id: o.author})
        .single();
    
    if (!userData.data) throw userData.error;

    return {
        id: o.id,
        code: o.code,
        title: o.title,
        created_at: o.created_at,
        lang: o.lang,
        description: o.description,
        author: {
            id: o.author,
            name: userData.data.name,
            username: userData.data.username,
        },
        keywords: o.keywords
    };
}