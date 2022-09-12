import type {NextPage} from "next"
import Head from "next/head"
import {AppName} from "../src/styling";
import Home from "../components/home/Home";
import {getStaticCommonTranslations} from "../src/i18n";

const HomePage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>{AppName}</title>
            </Head>
            <Home></Home>
        </div>
    )
}

export const getStaticProps = getStaticCommonTranslations();

export default HomePage;
