import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {SupabaseQueryBuilder} from "@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder";

const AnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrcXd0YW9yc250d2dxbWNmc21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE2MzcyODAsImV4cCI6MTk3NzIxMzI4MH0.G1mNvuMnYRW-ZzNrQvqrKOmHhpAqVeSbT_WBf8-nClw";
const Url = "https://ckqwtaorsntwgqmcfsmi.supabase.co";

export const supabase = createClient(Url, AnonKey);

export type Tables = {
    UserPublicInfo: {
        id: string;
        name: string;
        bio: string;
        created_at: string;
    },
    Posts: {
        id: number;
        author: string;
        created_at: string;
        title: string;
        description: string;
        code: string;
        lang: string;
    }
}

export type StorageBuckets = "profile-pictures";

export function fromTable<T extends keyof Tables>(supabase: SupabaseClient, name: T): SupabaseQueryBuilder<Tables[T]> {
    return supabase.from<Tables[T]>(name);
}

export function fromStorage(supabase: SupabaseClient, name: StorageBuckets) {
    return supabase.storage.from(name);
}