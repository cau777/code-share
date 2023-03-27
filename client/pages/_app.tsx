import "../styles/globals.scss";
import "../styles/fonts.scss";
import "../styles/syntax_highlight.scss";
import "../styles/loading_animation.scss";
import type {AppProps, NextWebVitalsMetric} from "next/app";
import NavControls from "../components/nav/NavControls";
import Head from "next/head";
import AuthProvider from "../components/AuthContext";
import {AppName} from "../src/styling";
import AssertProfileComplete from "../components/AssertProfileComplete";
import {appWithTranslation, useTranslation} from "next-i18next";

function MyApp({Component, pageProps}: AppProps) {
    const {t} = useTranslation();
    
    return (
        <>
            <Head>
                <meta name="keywords" content="code, social network, user profile, likes, comments, post, project, react, nextjs, supabase"/>
                <meta name="description" content="A social network that allows users to write and post snippets in different languages with a code editor, and interact with other users' posts and profiles."/>
                <meta name="author" content="Cauã Rinaldi"/>
                
                <link rel="icon" href="/favicon.ico"/>
                <title>{t("loading") + " " + AppName}</title>
                <link rel="apple-touch-icon" href="/img/icons/apple-touch-icon.png"/>
                <link rel="manifest" href="/manifest.json"/>
                <meta name="theme-color" content={"#c969ff"}/>
            </Head>
            <AuthProvider>
                <NavControls>
                    <AssertProfileComplete>
                        <Component {...pageProps}/>
                    </AssertProfileComplete>
                </NavControls>
            </AuthProvider>
        </>
    )
}

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
    if (process.env.NODE_ENV === "development")
        // eslint-disable-next-line no-console
        console.log(metric.startTime, metric.name);
}

export default appWithTranslation(MyApp);
