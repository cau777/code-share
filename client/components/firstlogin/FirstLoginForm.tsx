import {FC, useContext, useState} from "react";
import TextWriteAnimation from "../animated/TextWriteAnimation";
import Card from "../Card";
import {useForm} from "react-hook-form";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import {fromTable, supabase} from "../../src/supabase_client";
import BtnPrimary from "../basic/BtnPrimary";
import FloatingLabelTextarea from "../basic/FloatingLabelTextarea";
import {AuthContext} from "../AuthContext";
import MustBeLoggedIn from "../basic/MustBeLoggedIn";
import {useRouter} from "next/router";

type Form = {
    username: string;
    name: string;
    bio: string;
}

const FirstLoginForm: FC = () => {
    let {handleSubmit, register, formState} = useForm<Form>({defaultValues: {bio: ""}});
    let [busy, setBusy] = useState(false);
    let context = useContext(AuthContext);
    let router = useRouter();
    
    if (!context.loggedIn)
        return (<MustBeLoggedIn action={"create your profile"}></MustBeLoggedIn>);
    
    if (context.completedProfile) {
        router.push("/").then();
        return (<h3>Your profile is already done. Redirecting to Home</h3>);
    }
    
    async function submit(data: Form) {
        if (!context.loggedIn) return;
        setBusy(true);
        let response = await fromTable(supabase, "UserPublicInfo")
            .insert({id: context.id, name: data.name, bio: data.bio, username: data.username});
        
        if (response.error) {
            console.error(response.error);
            setBusy(false);
        } else {
            await router.push("/");
        }
    }
    
    async function validateUsername(username?: string) {
        if (username === undefined) return false;
        let response = await fromTable(supabase, "UserPublicInfo")
            .select("username")
            .match({username})
            .maybeSingle();
        if (response.error)
            return "Error";
        if (response.data)
            return "This username is already in use";
    }
    
    function formatUsernameError() {
        if (formState.errors.username)
            return formState.errors.username.message;
        if (formState.dirtyFields.username)
            return "You won't be able to change this later";
    }
    
    return (
        <Card>
            <div className={"mb-3"}>
                <h1 className={"monospace text-primary-200 flex justify-center"}>
                    <TextWriteAnimation text={"A little about you"} triggerView={true}></TextWriteAnimation>
                </h1>
            </div>
            <form className={"w-[20rem]"} onSubmit={handleSubmit(submit)}>
                <FloatingLabelInput label={"Username"} props={register("username", {
                    required: true,
                    validate: validateUsername
                })} error={formatUsernameError()}></FloatingLabelInput>
                
                <div className={"mt-2"}></div>
                <FloatingLabelInput label={"Name"} props={register("name", {
                    required: true
                })}></FloatingLabelInput>
                
                <FloatingLabelTextarea label={"Bio"} props={register("bio")}></FloatingLabelTextarea>
                
                <div>
                    <BtnPrimary disabled={busy} type={"submit"}>Submit</BtnPrimary>
                </div>
            </form>
        </Card>
    );
}

export default FirstLoginForm;