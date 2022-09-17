import "../styles/globals.scss";
import "../styles/fonts.scss";
import "../styles/syntax_highlight.scss";
import type {AppProps, NextWebVitalsMetric} from "next/app";
import NavControls from "../components/nav/NavControls";
import Head from "next/head";
import AuthProvider from "../components/AuthContext";
import {AppName} from "../src/styling";
import AssertProfileComplete from "../components/AssertProfileComplete";
import {appWithTranslation, useTranslation} from "next-i18next";

// TODO: PWA
// TODO: favicon
function MyApp({Component, pageProps}: AppProps) {
    let {t} = useTranslation();
    
    return (
        <>
            <Head>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
                <title>{t("loading") + " " + AppName}</title>
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
    console.log(metric.startTime, metric.name);
}

export default appWithTranslation(MyApp);