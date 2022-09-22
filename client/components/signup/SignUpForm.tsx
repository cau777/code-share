import {FC, useState} from "react";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import Card from "../Card";
import BtnPrimary from "../basic/BtnPrimary";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {supabase} from "../../src/supabase_client";
import {login} from "../../src/auth";
import TextWriteAnimation from "../animated/TextWriteAnimation";
import {useTranslation} from "next-i18next";
import BlockError from "../basic/BlockError";
import {ApiError} from "@supabase/gotrue-js";
import ProviderButton from "../basic/ProviderButton";

type Form = {
    email: string;
    password: string;
    passwordRepeat: string;
}

type State = {
    error?: string;
    busy: boolean;
}

const SignUpForm: FC = () => {
    const [state, setState] = useState<State>({busy: false});
    const {register, handleSubmit, formState: {errors}, getValues} = useForm<Form>({});
    const {t} = useTranslation();
    
    function translateError(error: ApiError|null) {
        if(error === null) return undefined;
    
        // console.log(error.status, error.message);
        switch (error.status) {
            case 400:
                return t("errorAlreadyRegistered");
            default:
                return error.message;
        }
    }
    
    async function submit(data: Form) {
        setState({busy: true});
        const {error} = await supabase.auth.signUp({email: data.email, password: data.password});
    
        if (error) {
            setState({busy: false, error: translateError(error)});
        }
    }
    
    function complexEnough(password: string) {
        if (!(
            /\d/.test(password) &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password)
        )) return t("errorPasswordComplexity", {});
    }
    
    return (
        <Card>
            <div className={"mb-3"}>
                <h1 className={"monospace text-primary-200 flex justify-center"}>
                    <TextWriteAnimation text={t("joinUs")} triggerView={true}></TextWriteAnimation>
                </h1>
            </div>
            
            <form className={"w-[20rem]"} onSubmit={handleSubmit(submit)}>
                <BlockError>{state.error}</BlockError>
                
                <FloatingLabelInput label={t("email")} inputType={"text"} error={errors.email?.message} autoCapitalize={"off"}
                                    props={register("email", {
                                        pattern: {value: /\w+@\w+\.\w+/, message: t("errorInvalidEmail")},
                                    })}></FloatingLabelInput>
                
                <FloatingLabelInput label={t("password")} inputType={"password"} error={errors.password?.message}
                                    props={register("password", {
                                        minLength: {value: 6, message: t("errorPasswordLength", {count: 6})},
                                        validate: complexEnough
                                    })}></FloatingLabelInput>
                
                <FloatingLabelInput label={t("repeatPassword")} inputType={"password"}
                                    error={errors.passwordRepeat?.message}
                                    props={register("passwordRepeat", {
                                        validate: o => o === getValues("password") ? undefined : t("errorPasswordsDontMatch")
                                    })}></FloatingLabelInput>
                <div className={"mt-3 flex gap-1"}>
                    <BtnPrimary disabled={state.busy} type={"submit"}>{t("signUp")}</BtnPrimary>
                    <ProviderButton provider={"github"}></ProviderButton>
                </div>
            </form>
            <p className={"mt-2 text-sm"}>{t("alreadyRegistered?")} <span className={"simple-link"}><Link href={"/login"}>{t("login")}</Link></span></p>
        </Card>
    )
}

export default SignUpForm;