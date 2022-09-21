import {FC, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {fromTable, supabase} from "../../src/supabase_client";
import Loading from "../basic/Loading";
import SnippetPost from "./SnippetPost";
import {useEffectOnMount} from "../../src/hooks";
import {useTranslation} from "next-i18next";
import BlockError from "../basic/BlockError";
import {completeSnippetData} from "../../src/post";

const PageSize = 15;

export type Snippet = {
    id: number;
    created_at: string;
    title: string;
    description: string;
    lang: string;
    code: string;
    author: {
        id: string;
        name: string;
        username: string;
    }
    keywords: string[];
}

type Props = {
    userFilter?: string;
    queryFilter?: string[];
    
}

type State = {
    snippets: Snippet[];
    hasMore: boolean;
    page: number;
    initialTime: string;
}

function defaultState(): State {
    return {snippets: [], hasMore: true, page: 0, initialTime: new Date().toISOString()};
}

const SnippetsFeed: FC<Props> = (props) => {
    let [state, setState] = useState<State>(defaultState());
    let [error, setError] = useState<string>();
    let {t} = useTranslation();
    
    useEffectOnMount(() => {
        console.log("mount feed", props)
        next().then();
    });
    
    async function next() {
        let query = fromTable(supabase, "Posts")
            .select("*")
            .order("created_at", {ascending: false})
            .lt("created_at", state.initialTime) // Ignore snippets posted after query
        
        if (props.userFilter)
            query = query.match({author: props.userFilter});
        
        if (props.queryFilter) {
            let targets = ["title", "description"];
            let ftsString = props.queryFilter.join(" | ");
            let fts = targets.map(o => `${o}.fts.%${ftsString}%`);
            let querySearch = props.queryFilter.map(o => `keywords.cs.{${o}}`);
            
            query = query.or([...fts, ...querySearch].map(o => "or(" + o + ")").join(","));
        }
        
        query = query.range(state.page * PageSize, (state.page + 1) * PageSize);
        let records = await query;
        
        if (records.data === null) {
            setError(records.error.message);
            return;
        }
        
        let promises: Promise<Snippet>[] = records.data.map(completeSnippetData);
        
        let data = await Promise.all(promises);
        
        let nSnippets: Snippet[] = [...state.snippets, ...data];
        setState({
            snippets: nSnippets,
            page: state.page + 1,
            initialTime: state.initialTime,
            hasMore: records.data.length === PageSize // If the response is full, there is probably more data
        });
    }
    
    return (
        <>
            <BlockError>{error}</BlockError>
            <InfiniteScroll next={next} hasMore={state.hasMore}
                            endMessage={<p className={"text-center"}>{t("feedEnd")}</p>}
                            loader={<Loading></Loading>} dataLength={state.snippets.length}>
                {state.snippets.map(o => (<SnippetPost limitHeight={true} {...o} key={o.id}></SnippetPost>))}
            </InfiniteScroll>
        </>
    )
}


export default SnippetsFeed;