import {FC, useEffect, useRef, useState} from "react";
import {AsyncState} from "../../src/attributes";
import Loading from "../basic/Loading";
import KeywordsList from "../basic/KeywordsList";
import {fetchPostKeywords, KeywordsRequestManager} from "../../src/keywords";
import {sleep} from "../../src/promises";

type Props = {
    title: string;
    description: string;
}

const DynamicKeywords: FC<Props> = (props) => {
    let [state, setState] = useState<AsyncState<string[]>>({current: "loading"});
    let prev = useRef<string[]>();
    
    useEffect(() => {
        setState({current: "loading"});
        
        KeywordsRequestManager.call(async () => {
            let data = await fetchPostKeywords(props.title, props.description);
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
            return (<p>{state.error}</p>); // TODO: error
        case "ready":
            return (<KeywordsList keywords={state.value}></KeywordsList>);
    }
}

export default DynamicKeywords