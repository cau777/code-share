import {FC} from "react";
import Card from "../Card";
import {useForm} from "react-hook-form";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import FloatingLabelTextarea from "../basic/FloatingLabelTextarea";

type Form = {
    title: string;
    description: string;
    lang: string;
    code: string;
}

const PostForm: FC = ()=> {
    let {register} = useForm<Form>();
    // TODO
    return (
        <Card>
            <form>
            <FloatingLabelInput label={"Title"} props={register("title", {required: true})}></FloatingLabelInput>
            <FloatingLabelTextarea label={"Description"} props={register("description", {required: true})}></FloatingLabelTextarea>
            </form>
        </Card>
    );
}

export default PostForm;