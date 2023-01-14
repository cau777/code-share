import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {supabase} from "../../src/supabase_client";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import BtnPrimary from "../basic/BtnPrimary";
import Link from "next/link";
import Card from "../Card";
import TextWriteAnimation from "../animated/TextWriteAnimation";
import {login} from "../../src/auth";
import {useTranslation} from "next-i18next";
import BlockError from "../basic/BlockError";
import {ApiError} from "@supabase/gotrue-js";
import ProviderButton from "../basic/ProviderButton";
import {useRouter} from "next/router";

type Form = {
    email: string;
    password: string;
}

type State = {
    error?: string;
    busy: boolean;
}

const LogInForm: FC = () => {
    const [state, setState] = useState<State>({busy: false});
    const {register, handleSubmit, formState: {errors}} = useForm<Form>({});
    const {t} = useTranslation();
    const router = useRouter();
    
    function translateError(error: ApiError | null) {
        if (error === null) return undefined;
        
        switch (error.status) {
            case 400:
                return t("errorInvalidCredentials");
            default:
                return error.message;
        }
    }
    
    async function submit(data: Form) {
        setState({busy: true});
        const {error} = await supabase.auth.signIn({email: data.email, password: data.password});
        
        if (error) {
            setState({busy: false, error: translateError(error)});
        } else {
            await router.push("/");
        }
    }
    
    
    return (
        <Card>
            <div className={"mb-3"}>
                <h1 className={"monospace text-primary-200 flex justify-center"}>
                    <TextWriteAnimation text={t("welcomeBack") + "!"} triggerView={true}></TextWriteAnimation>
                </h1>
            </div>
            <BlockError>{state.error}</BlockError>
            <form className={"w-[20rem]"} onSubmit={handleSubmit(submit)}>
                <FloatingLabelInput label={t("email")} inputType={"text"} error={errors.email?.message}
                                    autoCapitalize={"off"}
                                    props={register("email", {required: true})}></FloatingLabelInput>
                
                <FloatingLabelInput label={t("password")} inputType={"password"} error={errors.password?.message}
                                    props={register("password", {required: true})}></FloatingLabelInput>
                
                <div className={"mt-3 flex gap-1"}>
                    <BtnPrimary disabled={state.busy} type={"submit"}>{t("login")}</BtnPrimary>
                    <ProviderButton provider={"github"}></ProviderButton>
                </div>
            </form>
            <div className={"text-sm"}>
                <p>Debug login</p>
                <p>test1@gmail.com</p>
                <p>asdASD123</p>
            </div>
            <p className={"mt-2 text-sm"}>{t("noAccount?")} <span className={"simple-link"}><Link
                href={"/signup"}>{t("signUp")}</Link></span></p>
        </Card>
    )
}

export default LogInForm;
