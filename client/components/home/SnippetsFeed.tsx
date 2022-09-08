import {FC, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {fromTable, supabase} from "../../src/supabase_client";
import Loading from "../basic/Loading";
import SnippetPost from "./SnippetPost";
import {useEffectOnMount} from "../../src/hooks";

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
    
    useEffectOnMount(() => {
        next().then();
    });
    
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
        
        let promises: Promise<Snippet>[] = records.data.map(async o => {
            let userData = await fromTable(supabase, "UserPublicInfo")
                .select("id, name, username")
                .match({id: o.author})
                .single();
            
            if (!userData.data) throw userData.error;
            
            let result: Snippet = {
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
            }
            return result;
        });
        
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
        <InfiniteScroll next={next} hasMore={state.hasMore}
                        endMessage={<p className={"text-center"}>That&apos;s all. Come back later</p>}
                        loader={<Loading></Loading>} dataLength={state.snippets.length}>
            {state.snippets.map(o => (<SnippetPost {...o} key={o.id}></SnippetPost>))}
        </InfiniteScroll>
    )
}


export default SnippetsFeed;