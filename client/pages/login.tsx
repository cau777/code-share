import {NextPage} from "next";
import Head from "next/head";
import LogInForm from "../components/login/LogInForm";
import {AppName} from "../src/styling";

const Login: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Post Snippet {AppName}</title>
            </Head>
            <div className={"grid-center"}>
                <LogInForm></LogInForm>
            </div>
        </div>
    )
}

export default Login;