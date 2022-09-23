import {NextPage} from "next";
import CreatePostForm from "../../components/create_post/CreatePostForm";
import Head from "next/head";
import {AppName} from "../../src/styling";
import {getStaticCommonTranslations} from "../../src/i18n_server";
import {useTranslation} from "next-i18next";

const CreatePostPage: NextPage = () => {
    const {t} = useTranslation();
    
    return (
        <div>
            <Head>
                <title>{t("postSnippet") + " " + AppName}</title>
            </Head>
            <CreatePostForm></CreatePostForm>
        </div>
    )
}

export const getStaticProps = getStaticCommonTranslations();

export default CreatePostPage;