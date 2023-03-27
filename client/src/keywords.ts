import axios from "axios";
import {SingleRequestManager} from "./data/SingleRequestManager";
import {Cache} from "./data/Cache";

export async function fetchKeywords(text: string) {
    if (text === "") return [];
    return (await axios.post<string[]>("/api/key-terms/extract", {text, count: 5})).data ?? [];
}

export const KeywordsRequestManager = new SingleRequestManager();
export const KeywordsCache = new Cache<string, Promise<string[]>>(10);

export function fetchPostKeywords(title: string, description: string) {
    const text = title.trim() + ". " + description.trim();
    return KeywordsCache.getCachedOr(text, () => fetchKeywords(text));
}