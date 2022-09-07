import {FC, useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {fromTable, supabase} from "../../src/supabase_client";
import Loading from "../basic/Loading";
import SnippetPost from "./SnippetPost";

const PageSize = 15;

export type Snippet = {
    id: number;
    created_at: string;
    title: string;
    description: string;
    lang: string;
    code: string;
    author: string;
}

type Props = {
    specificUser?: string;
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
    
    useEffect(() => {
        next().then();
    }, []);
    
    async function next() {
        let query = fromTable(supabase, "Posts")
            .select("*")
            .order("created_at", {ascending: false})
            .lt("created_at", state.initialTime) // Ignore snippets posted after query
        
        if (props.specificUser)
            query = query.match({author: props.specificUser});
        
        query = query.range(state.page * PageSize, (state.page + 1) * PageSize);
        let records = await query;
        
        console.log("records", records);
        
        if (records.data === null) {
            console.error(records.error);
            return;
        }
        
        let nSnippets: Snippet[] = [...state.snippets, ...records.data];
        setState({
            snippets: nSnippets,
            page: state.page + 1,
            initialTime: state.initialTime,
            hasMore: records.data.length === PageSize // If the response is full, there is probably more data
        });
    }
    
    return (
        <InfiniteScroll next={next} hasMore={state.hasMore}
                        endMessage={<p className={"text-center"}>That's all. Come back later</p>}
                        loader={<Loading></Loading>} dataLength={state.snippets.length}>
            {state.snippets.map(o => (<SnippetPost {...o} key={o.id}></SnippetPost>))}
        </InfiniteScroll>
    )
}


export default SnippetsFeed;