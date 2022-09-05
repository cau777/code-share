import type {NextPage} from 'next'
import Head from "next/head"
import {AppName} from "../src/styling";
import Home from "../components/home/Home";

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

export default HomePage;
