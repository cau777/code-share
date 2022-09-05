import {FC} from "react";
import Card from "../Card";
import {useForm} from "react-hook-form";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import FloatingLabelTextarea from "../basic/FloatingLabelTextarea";
import BtnPrimary from "../basic/BtnPrimary";
import CodeEditor from "./CodeEditor";
import {findLanguageByName, Languages} from "../../src/code/Languages";
import SearchSelect from "../basic/SearchSelect";

type Form = {
    title: string;
    description: string;
    lang: string;
    code: string;
}

const PostForm: FC = () => {
    let {register, handleSubmit, setValue, watch} = useForm<Form>();
    let lang = watch("lang");
    
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
                
                <div className={"mb-2"}>
                    <SearchSelect onChange={(o: any) => setValue("lang", o.value)} placeholder={"Language"}
                                  options={Languages.map(o => ({label: o.name, value: o.name}))}/>
                </div>
                
                <div className={"mb-3"}>
                    <CodeEditor textareaProps={register("code", {deps: ["lang"]})}
                                language={findLanguageByName(lang)}></CodeEditor>
                </div>
                
                <div>
                    <BtnPrimary type={"submit"}>Submit</BtnPrimary>
                </div>
            </form>
        </Card>
    );
}

export default PostForm;