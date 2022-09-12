import {NextPage} from "next";
import PostForm from "../components/post/PostForm";
import Head from "next/head";
import {AppName} from "../src/styling";
import {getStaticCommonTranslations} from "../src/i18n";
import {useTranslation} from "next-i18next";

const PostPage: NextPage = () => {
    let {t} = useTranslation();
    
    return (
        <div>
            <Head>
                <title>{t("postSnippet")} {AppName}</title>
            </Head>
            <PostForm></PostForm>
        </div>
    )
}

export const getStaticProps = getStaticCommonTranslations();

export default PostPage;