import {FC} from "react";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import Card from "../Card";
import BtnPrimary from "../basic/BtnPrimary";
import Link from "next/link";
import {useForm} from "react-hook-form";

type Form = {
    email: string;
    password: string;
    passwordRepeat: string;
}

const RegistrationForm: FC = () => {
    let {register, handleSubmit, formState: {errors}, getValues} = useForm<Form>({});
    
    function submit(data: Form) {
        console.log("Sub", data)
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
            <h3>Registration</h3>
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
                    <BtnPrimary type={"submit"}>Register</BtnPrimary>
                </div>
            </form>
            <p className={"mt-2 text-sm"}>Already registered? <span className={"simple-link"}><Link href={"/login"}>Log in</Link></span>
            </p>
        </Card>
    )
}

export default RegistrationForm;