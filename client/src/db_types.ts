// Types for Supabase table's rows
export type Tables = {
    UserPublicInfo: {
        id: string;
        username: string;
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
        keywords: string[];
    },
    Likes: {
        author: string;
        target: number;
        created_at: string;
    },
    Comments: {
        id: number;
        post: number;
        author: string;
        created_at: string;
        text: string;
    }
}

// Basic information about the profile plus its id
export type UserData = ProfileData & {
    id: string;
}

// Basic information about the profile
export type ProfileData = {
    name: string;
    bio: string;
    username: string;
}