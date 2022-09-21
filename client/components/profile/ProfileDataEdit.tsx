import {FC} from "react";
import {useForm} from "react-hook-form";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import BtnPrimary from "../basic/BtnPrimary";
import FloatingLabelTextarea from "../basic/FloatingLabelTextarea";
import BtnSecondary from "../basic/BtnSecondary";
import {fromTable, supabase} from "../../src/supabase_client";
import {ProfileData} from "../../src/db_types";
import {useTranslation} from "next-i18next";

type Props = {
    id: string;
    data: ProfileData;
    onSave: (data?: Partial<ProfileData>) => void;
}

type Form = {
    name: string;
    bio: string;
}

const ProfileDataEdit: FC<Props> = (props) => {
    const {register, handleSubmit} = useForm<Form>({defaultValues: {name: props.data.name, bio: props.data.bio}});
    const {t} = useTranslation();
    
    async function submit(data: Form) {
        await fromTable(supabase, "UserPublicInfo")
            .update({name: data.name, bio: data.bio})
            .match({id: props.id});
        props.onSave(data);
    }
    
    return (
        <form onSubmit={handleSubmit(submit)}>
            <FloatingLabelInput label={t("name")} props={register("name", {required: true})}></FloatingLabelInput>
            <FloatingLabelTextarea label={t("bio")} props={register("bio")}></FloatingLabelTextarea>
            <div className={"flex justify-between"}>
                <BtnSecondary type={"button"} onClick={()=>props.onSave()}>{t("cancel")}</BtnSecondary>
                <BtnPrimary type={"submit"}>{t("save")}</BtnPrimary>
            </div>
        </form>
    )
}

export default ProfileDataEdit;