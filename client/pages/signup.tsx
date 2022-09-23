import {NextPage} from "next";
import Head from "next/head";
import SignUpForm from "../components/signup/SignUpForm";
import {AppName} from "../src/styling";
import {getStaticCommonTranslations} from "../src/i18n_server";
import {useTranslation} from "next-i18next";

const SignupPage: NextPage = () => {
    const {t} = useTranslation();
    
    return (
        <div>
            <Head>
                <title>{t("signUp") + " " + AppName}</title>
            </Head>
            
            <div className={"grid-center"}>
                <SignUpForm></SignUpForm>
            </div>
        </div>
    )
}

export const getStaticProps = getStaticCommonTranslations();

export default SignupPage;