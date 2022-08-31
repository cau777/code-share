import {FC} from "react";
import Card from "../Card";
import {useForm} from "react-hook-form";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import FloatingLabelTextarea from "../basic/FloatingLabelTextarea";
import BtnPrimary from "../basic/BtnPrimary";
import CodeEditor from "./CodeEditor";
import {findLanguageByName} from "../../src/code/Languages";

type Form = {
    title: string;
    description: string;
    lang: string;
    code: string;
}

const PostForm: FC = () => {
    let {register, handleSubmit} = useForm<Form>();
    
    function submit(data: Form) {
        console.log(data);
    }
    
    // TODO
    return (
        <Card>
            <form onSubmit={handleSubmit(submit)}>
                <FloatingLabelInput label={"Title"} props={register("title", {required: true})}></FloatingLabelInput>
                <FloatingLabelTextarea label={"Description"}
                                       props={register("description", {required: true})}></FloatingLabelTextarea>
                
                <CodeEditor textareaProps={register("code")} language={findLanguageByName("Java")!}></CodeEditor>
                
                <div>
                    <BtnPrimary type={"submit"}>Submit</BtnPrimary>
                </div>
            </form>
        </Card>
    );
}

export default PostForm;