import {FC, useContext, useState} from "react";
import {AuthContext} from "../AuthContext";
import {useForm} from "react-hook-form";
import {supabase} from "../../src/supabase_client";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import BtnPrimary from "../basic/BtnPrimary";
import SmallError from "../basic/SmallError";
import Link from "next/link";
import Card from "../Card";
import {useRouter} from "next/router";
import TextWriteAnimation from "../animated/TextWriteAnimation";
import {login} from "../../src/auth";

type Form = {
    email: string;
    password: string;
}

type State = {
    error?: string;
    busy: boolean;
}

const LogInForm: FC = () => {
    let [state, setState] = useState<State>({busy: false});
    let ctx = useContext(AuthContext);
    let {register, handleSubmit, formState: {errors}} = useForm<Form>({});
    let router = useRouter();
    
    async function submit(data: Form) {
        setState({busy: true});
        let {user, error} = await supabase.auth.signIn({email: data.email, password: data.password});
        
        if (error) {
            console.error(error);
            setState({busy: false, error: error?.message});
        } else {
            login(ctx, user!);
            await router.push("/");
        }
    }
    
    return (
        <Card>
            <div className={"mb-3"}>
                <h1 className={"monospace text-primary-200 flex justify-center"}>
                    <TextWriteAnimation text={"Welcome back!"} triggerView={true}></TextWriteAnimation>
                </h1>
            </div>
            <form className={"w-[20rem]"} onSubmit={handleSubmit(submit)}>
                <FloatingLabelInput label={"Email"} inputType={"text"} error={errors.email?.message}
                                    props={register("email")}></FloatingLabelInput>
                
                <FloatingLabelInput label={"Password"} inputType={"password"} error={errors.password?.message}
                                    props={register("password")}></FloatingLabelInput>
                
                <div className={"mt-3"}>
                    <BtnPrimary disabled={state.busy} type={"submit"}>Log In</BtnPrimary>
                </div>
                <SmallError message={state.error}></SmallError>
            </form>
            <p className={"mt-2 text-sm"}>Don't have an account? <span className={"simple-link"}><Link href={"/signup"}>Sign up</Link></span>
            </p>
        </Card>
    )
}

export default LogInForm;