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
import BlockError from "../basic/BlockError";
import {ImgSource, updateImage} from "../../src/images";
import {useTranslation} from "next-i18next";
import Redirect from "../basic/Redirect";
import ProfileImageEdit from "../profile/ProfileImageEdit";

type Form = {
    username: string;
    name: string;
    bio: string;
    image: ImgSource;
}

const FirstLoginForm: FC = () => {
    const {handleSubmit, register, formState, setValue} = useForm<Form>({defaultValues: {bio: ""}});
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string>();
    
    const {t} = useTranslation();
    const context = useContext(AuthContext);
    const router = useRouter();
    
    if (!context.loggedIn)
        return (<MustBeLoggedIn actionKey={"createYouProfile"}></MustBeLoggedIn>);
    
    if (context.completedProfile) {
        router.push("/").then();
        return (<Redirect message={t("errorProfileDone")} target={t("home")}></Redirect>)
    }
    
    async function submit(data: Form) {
        if (!context.loggedIn) return;
        setBusy(true);
        
        await updateImage(data.image, context.id);
        
        const response = await fromTable(supabase, "UserPublicInfo")
            .insert({id: context.id, name: data.name, bio: data.bio, username: data.username});
        
        if (response.error) {
            setError(response.error.message);
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
        if (username.includes(" ")) return t("errorUsernameHasSpace");
        if (!/^[\x00-\x7F]+$/.test(username)) return t("errorUsernameCharset");
        
        const response = await fromTable(supabase, "UserPublicInfo")
            .select("username")
            .match({username})
            .maybeSingle();
        if (response.error)
            return response.error.message;
        if (response.data)
            return t("errorUsernameInUse");
    }
    
    function formatUsernameError() {
        if (formState.errors.username)
            return formState.errors.username.message;
        if (formState.dirtyFields.username)
            return t("cantChangeLater");
    }
    
    return (
        <>
            <Card>
                <div className={"mb-3"}>
                    <h1 className={"monospace text-primary-200 flex justify-center"}>
                        <TextWriteAnimation text={t("aLittleAboutYou")} triggerView={true}></TextWriteAnimation>
                    </h1>
                </div>
                
                <form className={"w-[20rem]"} onSubmit={handleSubmit(submit)}>
                    <BlockError>{error}</BlockError>
                    
                    <FloatingLabelInput label={t("username")} props={register("username", {
                        required: true,
                        validate: validateUsername
                    })} error={formatUsernameError()}></FloatingLabelInput>
                    
                    <div className={"mt-2"}></div>
                    <FloatingLabelInput label={t("name")} props={register("name", {
                        required: true
                    })}></FloatingLabelInput>
                    
                    <FloatingLabelTextarea label={t("bio")} props={register("bio")}></FloatingLabelTextarea>
                    
                    <h4 className={"mt-4 mb-2 font-semibold"}>{t("profileImage")}</h4>
                    <ProfileImageEdit onSourceChanged={data => setValue("image", data)}></ProfileImageEdit>
                    
                    <div className={"mt-4"}>
                        <BtnPrimary disabled={busy} type={"submit"}>{t("save")}</BtnPrimary>
                    </div>
                </form>
            </Card>
        </>
    );
}

export default FirstLoginForm;