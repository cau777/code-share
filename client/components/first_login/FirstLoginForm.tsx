import {FC, useContext, useState} from "react";
import TextWriteAnimation from "../animated/TextWriteAnimation";
import Card from "../Card";
import {useForm} from "react-hook-form";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import {fromStorage, fromTable, supabase} from "../../src/supabase_client";
import BtnPrimary from "../basic/BtnPrimary";
import FloatingLabelTextarea from "../basic/FloatingLabelTextarea";
import {AuthContext} from "../AuthContext";
import MustBeLoggedIn from "../basic/MustBeLoggedIn";
import {useRouter} from "next/router";
import BlockError from "../basic/BlockError";
import Image from "next/image";
import {nanoid} from "nanoid";
import {createDicebearUrl} from "../../src/images";
import BtnSecondary from "../basic/BtnSecondary";
import axios from "axios";

type Form = {
    username: string;
    name: string;
    bio: string;
}

type ImgSource = {
    type: "file" | "dicebear";
    src: string;
}

function randId(): ImgSource {
    return {type: "dicebear", src: createDicebearUrl(nanoid(10))};
}

// TODO: translate
// TODO: validation rules
const FirstLoginForm: FC = () => {
    let {handleSubmit, register, formState} = useForm<Form>({defaultValues: {bio: ""}});
    let [busy, setBusy] = useState(false);
    let [error, setError] = useState<string>();
    let [imgSource, setImgSource] = useState<ImgSource>(randId());
    
    let context = useContext(AuthContext);
    let router = useRouter();
    
    if (!context.loggedIn)
        return (<MustBeLoggedIn actionKey={"createYouProfile"}></MustBeLoggedIn>);
    
    if (context.completedProfile) {
        // router.push("/").then();
        // return (<h3>Your profile is already done. Redirecting to Home</h3>); TODO
    }
    
    async function submit(data: Form) {
        if (!context.loggedIn) return;
        setBusy(true);
        
        if (imgSource.type === "dicebear") {
            let buffer = await axios.get<Blob>(imgSource.src, {responseType: "blob"});
            await fromStorage(supabase, "profile-pictures")
                .upload(context.id + ".jpg", buffer.data);
        }
        
        let response = await fromTable(supabase, "UserPublicInfo")
            .insert({id: context.id, name: data.name, bio: data.bio, username: data.username});
        
        if (response.error) {
            setError(response.error.message); // TODO: translate
            setBusy(false);
        } else {
            context.changeCtx({
                ...context,
                completedProfile: true,
                profileData: {name: data.name, bio: data.bio, username: data.username}
            });
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
                <BlockError>{error}</BlockError>
                
                <FloatingLabelInput label={"Username"} props={register("username", {
                    required: true,
                    validate: validateUsername
                })} error={formatUsernameError()}></FloatingLabelInput>
                
                <div className={"mt-2"}></div>
                <FloatingLabelInput label={"Name"} props={register("name", {
                    required: true
                })}></FloatingLabelInput>
                
                <FloatingLabelTextarea label={"Bio"} props={register("bio")}></FloatingLabelTextarea>
                
                <h4 className={"mt-4 mb-2 font-semibold"}>Profile image</h4>
                <div className={"mx-3 mb-4"}>
                    <div className={"relative mb-1"}>
                        <Image src={imgSource.src} alt={"Randomly generated robot avatar"} width={"100%"}
                               height={"100%"}
                               layout={"responsive"} objectFit={"contain"} className={"rounded-full"}/>
                    </div>
                    <div className={"flex gap-1 justify-center"}>
                        <BtnSecondary type={"button"} onClick={() => setImgSource(randId())}>Random</BtnSecondary>
                        <BtnSecondary type={"button"} onClick={() => setImgSource(randId())}>Choose file</BtnSecondary>
                        {/*    TODO: implement file*/}
                    </div>
                </div>
                
                <div>
                    <BtnPrimary disabled={busy} type={"submit"}>Submit</BtnPrimary>
                </div>
            </form>
        </Card>
    );
}

export default FirstLoginForm;