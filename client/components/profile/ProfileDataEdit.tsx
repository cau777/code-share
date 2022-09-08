import {FC} from "react";
import {useForm} from "react-hook-form";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import BtnPrimary from "../basic/BtnPrimary";
import FloatingLabelTextarea from "../basic/FloatingLabelTextarea";
import BtnSecondary from "../basic/BtnSecondary";
import {fromTable, supabase} from "../../src/supabase_client";
import {ProfileData} from "../../src/db_types";

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
    console.log(props.data)
    let {register, handleSubmit} = useForm<Form>({defaultValues: {name: props.data.name, bio: props.data.bio}});
    
    async function submit(data: Form) {
        console.log(data);
        await fromTable(supabase, "UserPublicInfo")
            .update({name: data.name, bio: data.bio})
            .match({id: props.id});
        props.onSave(data);
    }
    
    return (
        <form onSubmit={handleSubmit(submit)}>
            <FloatingLabelInput label={"Name"} props={register("name", {required: true})}></FloatingLabelInput>
            <FloatingLabelTextarea label={"Bio"} props={register("bio")}></FloatingLabelTextarea>
            <div className={"flex justify-between"}>
                <BtnSecondary type={"button"} onClick={()=>props.onSave()}>Cancel</BtnSecondary>
                <BtnPrimary type={"submit"}>Save</BtnPrimary>
            </div>
        </form>
    )
}

export default ProfileDataEdit;