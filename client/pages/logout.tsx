import {NextPage} from "next";
import {supabase} from "../src/supabase_client";
import {useAsyncEffect} from "../src/hooks";
import {useRouter} from "next/router";
import {useContext} from "react";
import {AuthContext} from "../components/AuthContext";
import {getStaticCommonTranslations} from "../src/i18n";
import {useTranslation} from "next-i18next";

const Login: NextPage = () => {
    const router = useRouter();
    const context = useContext(AuthContext);
    const {t} = useTranslation();
    
    useAsyncEffect(async () => {
        await supabase.auth.signOut();
        context.changeCtx({loggedIn: false, changeCtx: context.changeCtx});
        await router.push("/");
    }, []);
    
    return (
        <div>
            {t("loggingOut")}...
        </div>
    )
}

export const getStaticProps = getStaticCommonTranslations();

export default Login;