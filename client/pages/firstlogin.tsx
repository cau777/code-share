import {NextPage} from "next";
import Head from "next/head";
import {AppName} from "../src/styling";
import FirstLoginForm from "../components/firstlogin/FirstLoginForm";

const FirstLogin: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Sign up {AppName}</title>
            </Head>
            
            <div className={"grid-center"}>
                <FirstLoginForm></FirstLoginForm>
            </div>
        </div>
    )
}

export default FirstLogin;