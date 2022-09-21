import {GetServerSideProps, NextPage} from "next";
import Head from "next/head";
import {AppName} from "../../src/styling";
import {useTranslation} from "next-i18next";
import {fromTable, supabase} from "../../src/supabase_client";
import {Snippet} from "../../components/home/SnippetsFeed";
import {completeSnippetData} from "../../src/post";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import SnippetPost from "../../components/home/SnippetPost";
import BlockError from "../../components/basic/BlockError";

type Props = { found: false; } | ({ found: true; } & Snippet);

const PostByIdPage: NextPage<Props> = (props) => {
    const {t} = useTranslation();
    
    if (!props.found)
        return (
            <BlockError>{t("errorPostNotFound")}</BlockError>
        )
    
    return (
        <div>
            <Head>
                <title> {AppName}</title>
            </Head>
            <div>
                <SnippetPost id={props.id} code={props.code} created_at={props.created_at}
                             description={props.description} title={props.title} lang={props.lang}
                             keywords={props.keywords} author={props.author}></SnippetPost>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({query, locale}) => {
    const {id} = query;
    const {data, error} = await fromTable(supabase, "Posts")
        .select("*")
        .match({id: Number(id)})
        .single();
    const translations = await serverSideTranslations(locale!, ["common"]);
    
    if (error)
        if (error.code === "404")
            return {props: {...translations, found: false}};
        else
            // eslint-disable-next-line no-console
            console.error(error)
    return {
        props: {...translations, found: true, ...await completeSnippetData(data!)}
    };
}
export default PostByIdPage;