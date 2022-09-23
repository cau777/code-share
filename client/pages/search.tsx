import {getStaticCommonTranslations} from "../src/i18n_server";
import {NextPage} from "next";
import {useTranslation} from "next-i18next";
import Head from "next/head";
import {AppName} from "../src/styling";
import {useRouter} from "next/router";
import SnippetsFeed from "../components/home/SnippetsFeed";
import {BelowMd} from "../components/basic/Breakpoints";
import SearchBar from "../components/search/SearchBar";
import UsersList from "../components/search/UsersList";

const FirstLogin: NextPage = () => {
    const {t} = useTranslation();
    const router = useRouter();
    const {q} = router.query;
    
    return (
        <>
            <Head>
                <title>{t("search") + " " + AppName}</title>
            </Head>
            
            <BelowMd render={() => (
                <div className={"mb-4"}>
                    <SearchBar></SearchBar>
                </div>
            )}></BelowMd>
            
            {(q && typeof q === "string") && (
                <div key={q}>
                    <section>
                        <h2 className={"hide-one-child"}>{t("users")}</h2>
                        <UsersList query={q.split(" ")}></UsersList>
                    </section>
                    
                    <section>
                        <h2>{t("posts")}</h2>
                        <SnippetsFeed queryFilter={q.split(" ")}></SnippetsFeed>
                    </section>
                </div>
            )}
        </>
    )
}

export const getStaticProps = getStaticCommonTranslations();

export default FirstLogin;