import {FC, useContext} from "react";
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
import {fetchPostKeywords} from "../../src/keywords";
import {useTranslation} from "next-i18next";

type Form = {
    title: string;
    description: string;
    lang: string;
    code: string;
    keywords: string[];
}

const PostForm: FC = () => {
    let {register, handleSubmit, setValue, watch, reset} = useForm<Form>({
        defaultValues: {
            title: "",
            description: "",
            code: ""
        }
    });
    let title = watch("title");
    let description = watch("description");
    let lang = watch("lang");
    
    let {t} = useTranslation();
    let context = useContext(AuthContext);
    
    async function submit(data: Form) {
        if (!context.loggedIn) return;
        
        await fromTable(supabase, "Posts")
            .insert({
                author: context.id,
                title: data.title,
                description: data.description,
                code: data.code,
                lang: data.lang,
                keywords: await fetchPostKeywords(data.title, data.description)
            });
        
        reset();
    }
    
    function basicFields() {
        return (
            <>
                {/*TODO: wrap*/}
                <FloatingLabelInput label={t("postTitle")} props={register("title", {required: true, maxLength: 120})}></FloatingLabelInput>
                <FloatingLabelTextarea label={t("postDescription")}
                                       props={register("description", {required: true, maxLength: 500})}></FloatingLabelTextarea>
                
                <div className={"mb-2"}>
                    <SearchSelect onChange={(o: any) => setValue("lang", o.value)} placeholder={t("postLanguage")}
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
                <h5 className={"monospace text-sm pl-2"}>{t("writeCodeBelow")}</h5>
                <CodeEditor text={watch("code")} onChange={o => setValue("code", o)}
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
        return (<MustBeLoggedIn actionKey={"postSnippet"}></MustBeLoggedIn>);
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