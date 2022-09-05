import "../styles/globals.scss";
import "../styles/fonts.scss";
import "../styles/syntax_highlight.scss";
import type {AppProps} from "next/app";
import NavControls from "../components/nav/NavControls";
import Head from "next/head";
import AuthProvider from "../components/AuthContext";
import {AppName} from "../src/styling";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
                <title>Loading... {AppName}</title>
            </Head>
            <AuthProvider>
                <NavControls>
                    <Component {...pageProps} />
                </NavControls>
            </AuthProvider>
        </>
    )
}

export default MyApp;
