import {FC, memo} from "react";
import {Snippet} from "./SnippetsFeed";
import Card from "../Card";
import CodeEditorDisplay from "../post/CodeEditorDisplay";
import {findLanguageByName, OtherLanguage} from "../../src/code/Languages";
import CodeEditorLineNumbers from "../post/CodeEditorLineNumbers";
import {countOccurrences} from "../../src/text";
import ProfilePicture from "../basic/ProfilePicture";

type Props = Snippet;

const SnippetPost: FC<Props> = (props) => {
    let date = new Date(props.created_at);
    
    return (
        <article className={"mb-3"}>
            <Card>
                {/* TODO: style */}
                <header>
                    <p className={"float-right monospace"}>{props.lang}</p>
                    <div className={"flex gap-1 mb-1"}>
                        <div className={"h-12 w-12"}>
                            <ProfilePicture id={props.author.id}></ProfilePicture>
                        </div>
                        <div>
                            <p className={""}>{props.author.name}</p>
                            <p className={"text-font-2 text-sm"}>@{props.author.username}</p>
                        </div>
                    </div>
                    <h4>{props.title}</h4>
                    <h5 className={"text-font-2"}>{props.description}</h5>
                </header>
                
                <div className={"mt-2 mb-1 flex rounded border-back-1 border-2 overflow-auto monospace"}>
                    <CodeEditorLineNumbers lineCount={countOccurrences(props.code, "\n") + 1}></CodeEditorLineNumbers>
                    <CodeEditorDisplay text={props.code}
                                       language={findLanguageByName(props.lang) ?? OtherLanguage}></CodeEditorDisplay>
                </div>
                
                <p className={"text-right text-xs"}>{date.toLocaleString()}</p>
            </Card>
        </article>
    );
}

export default memo(SnippetPost, (prev, next) => prev.id === next.id);