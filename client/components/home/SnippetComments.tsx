import {FC, useContext, useState} from "react";
import ProfilePicture from "../basic/ProfilePicture";
import {useTranslation} from "next-i18next";
import FloatingLabelTextarea from "../basic/FloatingLabelTextarea";
import BtnPrimary from "../basic/BtnPrimary";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {fromTable, supabase} from "../../src/supabase_client";
import {AuthContext} from "../AuthContext";
import BlockError from "../basic/BlockError";
import {useAsyncEffect} from "../../src/hooks";
import {Tables} from "../../src/db_types";
import {formatPostTime} from "../../src/i18n";

type Props = {
    postId: number;
    limit?: number;
}

type Form = {
    text: string;
}

type Comment = {
    authorId: string;
    authorName: string;
    text: string;
    createdAt: string;
}

type State = {
    comments: Comment[];
    hasMore: boolean;
}

async function completeComment(o: Tables["Comments"]): Promise<Comment> {
    const name = await fromTable(supabase, "UserPublicInfo")
        .select("name, id")
        .match({id: o.author})
        .single();
    
    if (name.error) throw name.error.message;
    
    return {
        createdAt: o.created_at,
        text: o.text,
        authorId: o.author,
        authorName: name.data!.name
    };
}

const SnippetComments: FC<Props> = (props) => {
    const {t} = useTranslation();
    const {handleSubmit, register} = useForm<Form>();
    const [state, setState] = useState<State>();
    const [error, setError] = useState<string>();
    const router = useRouter();
    const context = useContext(AuthContext);
    
    useAsyncEffect(async () => {
        let query = fromTable(supabase, "Comments")
            .select("*")
            .match({post: props.postId});
        if (props.limit)
            query = query.limit(props.limit + 1);
        
        const {data, error} = await query;
        if (error) {
            setError(error.message);
        } else {
            const promises: Promise<Comment>[] = data!.map(completeComment);
            try {
                let results = await Promise.all(promises);
                let hasMore = props.limit !== undefined && results.length >= props.limit;
                if (hasMore) results.splice(props.limit!);
                
                setState({comments: results, hasMore});
            } catch (e) {
                setError(e as string);
            }
        }
        
    }, [props.postId, props.limit])
    
    async function submit(data: Form) {
        if (!context.loggedIn) return;
        let {error} = await fromTable(supabase, "Comments")
            .insert({text: data.text, author: context.id, post: props.postId});
        
        if (error)
            setError(error.message);
        
        if (!state) return;
        setState({
            comments: [...(state.comments ?? []), {
                text: data.text,
                authorId: context.id,
                createdAt: new Date().toISOString(),
                authorName: context.profileData.name
            }],
            hasMore: state.hasMore
        });
    }
    
    return (
        <>
            <BlockError>{error}</BlockError>
            {context.loggedIn ? (
                <form onSubmit={handleSubmit(submit)}>
                    <div className={"flex align-middle gap-3"}>
                        <div className={"w-12 my-auto"}>
                            <ProfilePicture id={context.id}></ProfilePicture>
                        </div>
                        
                        <div className={"flex-grow"}>
                            <FloatingLabelTextarea label={""} props={{
                                placeholder: t("leaveComment"),
                                ...register("text", {required: true})
                            }}/>
                        </div>
                        
                        <div className={"my-auto"}>
                            <BtnPrimary>{t("comment")}</BtnPrimary>
                        </div>
                    </div>
                </form>
            ) : (<></>)}
            {state && (
                <>
                    {state.comments.map((o, index) => (
                        <div className={"flex align-middle gap-3 mb-2"} key={index}>
                            <div className={"w-12 my-auto"}>
                                <ProfilePicture id={o.authorId}></ProfilePicture>
                            </div>
                            
                            <div>
                                <div>
                                    <span>{o.authorName}</span> <span
                                    className={"text-sm text-font-2"}>{formatPostTime(o.createdAt, router.locale!)}</span>
                                </div>
                                <p>{o.text}</p>
                            </div>
                        </div>
                    ))}
                    
                    {props.limit !== undefined && state.hasMore ? (
                        <p className={"text-center cursor-pointer text-font-2"}
                           onClick={() => router.push("/post/" + props.postId)}>{t("seeMore")}</p>
                    ) : (<></>)}
                </>
            )}
        </>
    );
}

export default SnippetComments;