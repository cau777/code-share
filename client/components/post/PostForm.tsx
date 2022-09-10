import {FC, useContext, useRef} from "react";
import Card from "../Card";
import {useForm} from "react-hook-form";
import FloatingLabelInput from "../basic/FloatingLabelInput";
import FloatingLabelTextarea from "../basic/FloatingLabelTextarea";
import BtnPrimary from "../basic/BtnPrimary";
import CodeEditor from "./CodeEditor";
import {findLanguageByName, Languages} from "../../src/code/Languages";
import SearchSelect from "../basic/SearchSelect";
import {AboveLg, BelowXl} from "../basic/Breakpoints";
import {fromTable, supabase} from "../../src/supabase_client";
import {AuthContext} from "../AuthContext";
import MustBeLoggedIn from "../basic/MustBeLoggedIn";
import DynamicKeywords from "./DynamicKeywords";

type Form = {
    title: string;
    description: string;
    lang: string;
    code: string;
    keywords: string[];
}

const PostForm: FC = () => {
    let {register, handleSubmit, setValue, watch} = useForm<Form>({defaultValues: {title: "", description: ""}});
    let title = watch("title");
    let description = watch("description");
    let lang = watch("lang");
    
    
    let context = useContext(AuthContext);
    let keywords = useRef<Promise<string[]>>();
    
    async function submit(data: Form) {
        if (!context.loggedIn) return;
        
        await fromTable(supabase, "Posts")
            .insert({
                author: context.id,
                title: data.title,
                description: data.description,
                code: data.code,
                lang: data.lang,
                keywords: (await keywords.current) ?? []
            });
    }
    
    function basicFields() {
        return (
            <>
                <FloatingLabelInput label={"Title"} props={register("title", {required: true})}></FloatingLabelInput>
                <FloatingLabelTextarea label={"Description"}
                                       props={register("description", {required: true})}></FloatingLabelTextarea>
                
                <div className={"mb-2"}>
                    <SearchSelect onChange={(o: any) => setValue("lang", o.value)} placeholder={"Language"}
                                  options={Languages.map(o => ({label: o.name, value: o.name}))}/>
                </div>
                
                <div className={"mb-2"}>
                    <DynamicKeywords title={title} description={description}></DynamicKeywords>
                </div>
            </>
        );
    }
    
    function editor() {
        return (
            <div className={"mb-3 h-full"}>
                <h5 className={"monospace text-sm pl-2"}>Write your code below</h5>
                <CodeEditor textareaProps={register("code", {deps: ["lang"]})}
                            language={findLanguageByName(lang)}></CodeEditor>
            </div>
        )
    }
    
    function buttons() {
        return (
            <div>
                <BtnPrimary type={"submit"}>Post</BtnPrimary>
            </div>
        )
    }
    
    if (!context.loggedIn) {
        return (<MustBeLoggedIn action={"post snippets"}></MustBeLoggedIn>);
    }
    
    return (
        <>
            <form onSubmit={handleSubmit(submit)}>
                <AboveLg>
                    <div className={"flex gap-2 items-stretch"}>
                        <div className={"self-stretch flex-grow"}>
                            <Card className={"h-full"}>
                                {editor()}
                            </Card>
                        </div>
                        <div className={"basis-1/4"}>
                            <Card>
                                {basicFields()}
                                {buttons()}
                            </Card>
                        </div>
                    </div>
                </AboveLg>
                <BelowXl>
                    <Card>
                        {basicFields()}
                        {editor()}
                        {buttons()}
                    </Card>
                </BelowXl>
            </form>
        </>
    );
}

export default PostForm;