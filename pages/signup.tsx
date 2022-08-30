import {NextPage} from "next";
import Head from "next/head";
import SignUpForm from "../components/signup/SignUpForm";

const SignupPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>code-&gt;share Register</title>
            </Head>
            
            <div className={"flex"}>
                <SignUpForm></SignUpForm>
                <div className={"ml-auto"}>
                    <h1>Thanks for considering joining us</h1>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;