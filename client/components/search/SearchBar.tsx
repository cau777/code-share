import {FC, useState} from "react";
import MagnifyingGlassIcon from "../icons/MagnifyingGlassIcon";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

// Search bar to query posts that redirects to a search url with query parameters
const SearchBar: FC = () => {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const {t} = useTranslation();
    
    async function submit() {
        if (!query) return;
        await router.push("/search?q=" + query);
    }
    
    return (
        <label className={"bg-back-1 border-2 border-back-3 rounded-xl px-2 w-full flex align-middle py-1 md:py-0.5"}>
            <input formAction={"submit"} type={"text"} className={"w-full bg-transparent"}
                   value={query} onChange={o => setQuery(o.currentTarget.value)}
                   onKeyDown={({key}) => {
                       if (key === "Enter") submit().then();
                   }} placeholder={t("search")}/>
            <MagnifyingGlassIcon className={"my-auto cursor-pointer"} height={"1rem"} onClick={submit}></MagnifyingGlassIcon>
        </label>
    )
}

export default SearchBar;