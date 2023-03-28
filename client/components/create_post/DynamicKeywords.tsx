import {FC, useEffect, useRef, useState} from "react";
import {AsyncState} from "../../src/attributes";
import Loading from "../basic/Loading";
import KeywordsList from "../basic/KeywordsList";
import {fetchPostKeywords, KeywordsRequestManager} from "../../src/keywords";
import {sleep} from "../../src/promises";
import BlockError from "../basic/BlockError";

type Props = {
    title: string;
    description: string;
}

// Displays keywords for the current title and description. Has a mechanism to avoid flooding the API with calls.
const DynamicKeywords: FC<Props> = (props) => {
    const [state, setState] = useState<AsyncState<string[]>>({current: "loading"});
    const prev = useRef<string[]>();
    
    useEffect(() => {
        setState({current: "loading"});
        
        KeywordsRequestManager.call(async () => {
            const data = await fetchPostKeywords(props.title, props.description);
            prev.current = data;
            setState({current: "ready", value: data});
            await sleep(1_500); // Avoid too many requests
        });
    }, [props.title, props.description])
    
    switch (state.current) {
        case "loading":
            return (
                <>
                    {prev.current && <KeywordsList keywords={prev.current}></KeywordsList>}
                    <Loading></Loading>
                </>
            );
        case "error":
            return (<BlockError>{state.error}</BlockError>);
        case "ready":
            return (<KeywordsList keywords={state.value}></KeywordsList>);
    }
}

export default DynamicKeywords