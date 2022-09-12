import {NextPage} from "next";
import Head from "next/head";
import LogInForm from "../components/login/LogInForm";
import {AppName} from "../src/styling";
import {getStaticCommonTranslations} from "../src/i18n";
import {useTranslation} from "next-i18next";

const Login: NextPage = () => {
    let {t} = useTranslation();
    
    //TODO: translate login errors
    return (
        <div>
            <Head>
                <title>{t("login")} {AppName}</title>
            </Head>
            <div className={"grid-center"}>
                <LogInForm></LogInForm>
            </div>
        </div>
    )
}

export const getStaticProps = getStaticCommonTranslations();

export default Login;