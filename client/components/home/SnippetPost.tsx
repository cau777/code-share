import {FC, memo, useContext, useState} from "react";
import {Snippet} from "./SnippetsFeed";
import Card from "../Card";
import CodeDisplay from "../code_snippet/CodeDisplay";
import {findLanguageByName, OtherLanguage} from "../../src/code/Languages";
import CodeEditorLineNumbers from "../code_snippet/CodeLineNumbers";
import {countOccurrences} from "../../src/text";
import ProfilePicture from "../basic/ProfilePicture";
import KeywordList from "../basic/KeywordsList";
import HeartIcon from "../icons/HeartIcon";
import {useAsyncEffect} from "../../src/hooks";
import {fromTable, supabase} from "../../src/supabase_client";
import {AuthContext} from "../AuthContext";
import BlockError from "../basic/BlockError";
import Link from "next/link";
import {mergeClasses} from "../../src/attributes";

type Props = Snippet & { limitHeight?: boolean };

type LikeState = {
    hasLiked: boolean;
    likeCount: number;
}

//TODO: no render out of sight + intersection observer + recalc size when screen changes
const SnippetPost: FC<Props> = (props) => {
    let date = new Date(props.created_at);
    let [likeState, setLikeState] = useState<LikeState>();
    let [error, setError] = useState<string>();
    let context = useContext(AuthContext);
    
    async function updateLikeState() {
        let hasLikedResult = false;
        if (context.loggedIn) {
            let result = await fromTable(supabase, "Likes")
                .select("target, author")
                .match({target: props.id})
                .match({author: context.id})
            
            if (result.error) {
                setError(result.error.message);
                return;
            }
            
            hasLikedResult = result.body !== null && result.body.length !== 0;
        }
        
        let likesCountResult = await fromTable(supabase, "Likes")
            .select("target")
            .match({target: props.id});
        
        if (likesCountResult.error) {
            setError(likesCountResult.error.message);
            return;
        }
        
        setError(undefined);
        setLikeState({hasLiked: hasLikedResult, likeCount: likesCountResult.data!.length})
    }
    
    useAsyncEffect(updateLikeState, [context.loggedIn]);
    
    async function like() {
        if (!likeState || !context.loggedIn) return; // TODO: logged tooltip
        if (likeState.hasLiked) {
            let result = await fromTable(supabase, "Likes")
                .delete()
                .match({author: context.id, target: props.id})
                .single();
            
            if (result.error)
                // Like count can get out of sync when the user is using different devices at the same time
                await updateLikeState();
            else
                setLikeState({likeCount: likeState.likeCount - 1, hasLiked: false});
        } else {
            let result = await fromTable(supabase, "Likes")
                .insert({author: context.id, target: props.id});
            
            if (result.error)
                // Like count can get out of sync when the user is using different devices at the same time
                await updateLikeState();
            else
                setLikeState({likeCount: likeState.likeCount + 1, hasLiked: true});
        }
    }
    
    return (
        <article className={"mb-3"}>
            <Card>
                <BlockError>{error}</BlockError>
                <header className={"mb-1"}>
                    <p className={"float-right monospace"}>{props.lang}</p>
                    <div className={"flex gap-1 mb-1"}>
                        <div className={"h-12 w-12"}>
                            <ProfilePicture id={props.author.id}></ProfilePicture>
                        </div>
                        <Link href={"/profile/" + props.author.username}>
                            <div className={"cursor-pointer"}>
                                <p>{props.author.name}</p>
                                <p className={"text-font-2 text-sm"}>@{props.author.username}</p>
                            </div>
                        </Link>
                    </div>
                    <Link href={"/post/" + props.id}>
                        <div className={"cursor-pointer"}>
                            
                            <h4>{props.title}</h4>
                            <p className={"text-font-2 text-sm"}>{props.description}</p>
                        </div>
                    </Link>
                </header>
                <KeywordList keywords={props.keywords}></KeywordList>
                <div
                    className={mergeClasses("mt-2 mb-2 flex rounded border-back-1 border-2 overflow-auto monospace overflow-auto", {"max-h-[40vh]": props.limitHeight})}>
                    <CodeEditorLineNumbers
                        lineCount={countOccurrences(props.code, "\n") + 1}></CodeEditorLineNumbers>
                    <CodeDisplay text={props.code}
                                 language={findLanguageByName(props.lang) ?? OtherLanguage}></CodeDisplay>
                </div>
                
                <footer className={"flex gap-1"}>
                    {likeState && (
                        <>
                            <HeartIcon className={"text-primary-500 cursor-pointer"} full={likeState.hasLiked}
                                       width={"1.5rem"} onClick={like}></HeartIcon>
                            <p className={"text-sm text-font-2 my-auto"}>{likeState.likeCount}</p>
                        </>
                    )}
                    <div className={"ml-auto"}>
                        <span className={"text-xs inline-block align-middle"}>{date.toLocaleString()}</span>
                    </div>
                </footer>
            </Card>
        </article>
    );
}

export default memo(SnippetPost, (prev, next) => prev.id === next.id);