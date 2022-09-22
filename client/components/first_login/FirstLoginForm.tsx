import {ChangeEvent, FC, useContext, useState} from "react";
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
import {createDicebearUrl, createUserImageUrl, CropAndResize, cropAndResizeCall, getImageDims} from "../../src/images";
import BtnSecondary from "../basic/BtnSecondary";
import axios from "axios";
import {useTranslation} from "next-i18next";
import ImageCropAndResize from "../basic/ImageCropAndResize";
import Redirect from "../basic/Redirect";
import {useEffectOnMount} from "../../src/hooks";

type Form = {
    username: string;
    name: string;
    bio: string;
}

type ImgSource = {
    type: "dicebear";
    src: string;
} | {
    type: "file";
    blob: Blob
    src: string;
};

type ChoosingFileState = {
    file: File;
    src: string;
    width: number;
    height: number;
}

function randId(): ImgSource {
    return {type: "dicebear", src: createDicebearUrl(nanoid(10))};
}

const FirstLoginForm: FC = () => {
    const {handleSubmit, register, formState} = useForm<Form>({defaultValues: {bio: ""}});
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string>();
    const [imgSource, setImgSource] = useState<ImgSource>(randId());
    const [choosingFile, setChoosingFile] = useState<ChoosingFileState>();
    
    const {t} = useTranslation();
    const context = useContext(AuthContext);
    const router = useRouter();
    
    useEffectOnMount(() => {
        return () => {
            if (imgSource.type === "file")
                URL.revokeObjectURL(imgSource.src)
            if (choosingFile !== undefined)
                URL.revokeObjectURL(choosingFile.src);
        }
    });
    
    if (!context.loggedIn)
        return (<MustBeLoggedIn actionKey={"createYouProfile"}></MustBeLoggedIn>);
    
    if (context.completedProfile) {
        router.push("/").then();
        return (<Redirect message={t("errorProfileDone")} target={t("home")}></Redirect>)
    }
    
    async function submit(data: Form) {
        if (!context.loggedIn) return;
        setBusy(true);
        
        if (imgSource.type === "dicebear") {
            const buffer = await axios.get<Blob>(imgSource.src, {responseType: "blob"});
            await fromStorage(supabase, "profile-pictures")
                .upload(createUserImageUrl(context.id), buffer.data);
        } else if (imgSource.type === "file") {
            await fromStorage(supabase, "profile-pictures")
                .upload(createUserImageUrl(context.id), imgSource.blob);
        }
    
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
    
    async function startCropAndResize(e: ChangeEvent<HTMLInputElement>) {
        const element = e.currentTarget;
        if (element.files === null || element.files === undefined) return;
        const file = element.files[0];
        const src = URL.createObjectURL(file);
        const size = await getImageDims(src);
        setChoosingFile({file, src, ...size});
    }
    
    function endCropAndResize() {
        const input = document.getElementById("fileInput") as HTMLInputElement;
        input.value = null!;
        if (!choosingFile) return;
        setChoosingFile(undefined);
    }
    
    async function submitFile(value: CropAndResize) {
        if (!choosingFile) return;
        if (imgSource.type === "file")
            URL.revokeObjectURL(imgSource.src)
        
        endCropAndResize();
        const response = await cropAndResizeCall(choosingFile.file, value);
    
        setImgSource({
            type: "file",
            src: URL.createObjectURL(response.data),
            blob: response.data
        });
    }
    
    return (
        <>
            {choosingFile && (
                <ImageCropAndResize width={choosingFile.width} height={choosingFile.height} src={choosingFile.src}
                                    onCancel={endCropAndResize} onSubmit={submitFile}></ImageCropAndResize>)}
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
                    <div className={"mx-3 mb-4"}>
                        <div className={"relative mb-1"}>
                            <Image src={imgSource.src} alt={t("altRandomAvatar")} width={"100%"}
                                   height={"100%"}
                                   layout={"responsive"} objectFit={"contain"} className={"rounded-full"}/>
                        </div>
                        <div className={"flex gap-1 justify-center"}>
                            <BtnSecondary type={"button"}
                                          onClick={() => setImgSource(randId())}>{t("random")}</BtnSecondary>
                            
                            <BtnSecondary type={"button"}>
                                <label htmlFor={"fileInput"}>{t("chooseFromFile")}</label>
                                <input type={"file"} className={"hidden"} id={"fileInput"}
                                       onChange={startCropAndResize}/>
                            </BtnSecondary>
                        </div>
                    </div>
                    
                    <div>
                        <BtnPrimary disabled={busy} type={"submit"}>{t("save")}</BtnPrimary>
                    </div>
                </form>
            </Card>
        </>
    
    );
}

export default FirstLoginForm;