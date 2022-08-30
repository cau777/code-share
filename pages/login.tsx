import {NextPage} from "next";
import Head from "next/head";
import LogInForm from "../components/login/LogInForm";

const Login: NextPage = () => {
    return (
        <div>
            <Head>
                <title>code-&gt;share Login</title>
            </Head>
            <div className={"flex"}>
                <LogInForm></LogInForm>
            </div>
        </div>
    )
}

export default Login;