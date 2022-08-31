import {FC, useContext, useState} from "react";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import Card from "../Card";
import BtnPrimary from "../basic/BtnPrimary";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {supabase} from "../../src/supabase_client";
import SmallError from "../basic/SmallError";
import {AuthContext} from "../AuthContext";
import {useRouter} from "next/router";
import {login} from "../../src/auth";

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
    let [state, setState] = useState<State>({busy: false});
    let ctx = useContext(AuthContext);
    let {register, handleSubmit, formState: {errors}, getValues} = useForm<Form>({});
    let router = useRouter();
    
    async function submit(data: Form) {
        setState({busy: true});
        let {user, error} = await supabase.auth.signUp({email: data.email, password: data.password});
        
        if (error) {
            console.error(error);
            setState({busy: false, error: error?.message});
        } else {
            login(ctx, user!);
            await router.push("/");
        }
    }
    
    function complexEnough(password: string) {
        if (!(
            /\d/.test(password) &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password)
        )) return "Password should contain lowercase and uppercase letters, and at least one digit";
    }
    
    return (
        <Card>
            <h3>Sign Up</h3>
            <form className={"w-[20rem]"} onSubmit={handleSubmit(submit)}>
                <FloatingLabelInput label={"Email"} inputType={"text"} error={errors.email?.message}
                                    props={register("email", {
                                        pattern: {message: "Invalid email", value: /\w+@\w+\.\w+/}
                                    })}></FloatingLabelInput>
                
                <FloatingLabelInput label={"Password"} inputType={"password"} error={errors.password?.message}
                                    props={register("password", {
                                        minLength: {value: 6, message: "Password should be at least 6 characters long"},
                                        validate: complexEnough
                                    })}></FloatingLabelInput>
                
                <FloatingLabelInput label={"Repeat password"} inputType={"password"}
                                    error={errors.passwordRepeat?.message}
                                    props={register("passwordRepeat", {
                                        validate: o => o === getValues("password") ? undefined : "Passwords don't match"
                                    })}></FloatingLabelInput>
                <div className={"mt-3"}>
                    <BtnPrimary disabled={state.busy} type={"submit"}>Sign Up</BtnPrimary>
                </div>
                <SmallError message={state.error}></SmallError>
            </form>
            <p className={"mt-2 text-sm"}>Already registered? <span className={"simple-link"}><Link href={"/login"}>Log in</Link></span>
            </p>
        </Card>
    )
}

export default SignUpForm;