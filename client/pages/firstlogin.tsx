import {NextPage} from "next";
import Head from "next/head";
import {AppName} from "../src/styling";
import FirstLoginForm from "../components/first_login/FirstLoginForm";
import {getStaticCommonTranslations} from "../src/i18n";
import {useTranslation} from "next-i18next";

const FirstLogin: NextPage = () => {
    const {t} = useTranslation();
    
    return (
        <div>
            <Head>
                <title>{t("signUp") + " " + AppName}</title>
            </Head>
            
            <div className={"grid-center"}>
                <FirstLoginForm></FirstLoginForm>
            </div>
        </div>
    )
}

export const getStaticProps = getStaticCommonTranslations();

export default FirstLogin;