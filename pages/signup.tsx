import {NextPage} from "next";
import Head from "next/head";
import SignUpForm from "../components/signup/SignUpForm";
import {AppName} from "../src/styling";

const SignupPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Sign up {AppName}</title>
            </Head>
            
            <div className={"grid-center"}>
                <SignUpForm></SignUpForm>
            </div>
        </div>
    )
}

export default SignupPage;