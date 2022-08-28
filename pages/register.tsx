import {NextPage} from "next";
import Head from "next/head";
import RegistrationForm from "../components/registration/RegistrationForm";

const Register: NextPage = () => {
    return (
        <div>
            <Head>
                <title>code-&gt;share Register</title>
            </Head>
            
            <div className={"flex"}>
                <RegistrationForm></RegistrationForm>
                <div className={"ml-auto"}>
                    <h1>Thanks for considering joining us</h1>
                </div>
            </div>
        </div>
    )
}

export default Register;