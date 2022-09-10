import {FC, memo} from "react";
import {Snippet} from "./SnippetsFeed";
import Card from "../Card";
import CodeDisplay from "../code_snippet/CodeDisplay";
import {findLanguageByName, OtherLanguage} from "../../src/code/Languages";
import CodeEditorLineNumbers from "../code_snippet/CodeLineNumbers";
import {countOccurrences} from "../../src/text";
import ProfilePicture from "../basic/ProfilePicture";
import KeywordList from "../basic/KeywordsList";

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
                    <p className={"text-font-2 text-sm"}>{props.description}</p>
                </header>
                
                <div className={"mt-2 mb-2 flex rounded border-back-1 border-2 overflow-auto monospace"}>
                    <CodeEditorLineNumbers lineCount={countOccurrences(props.code, "\n") + 1}></CodeEditorLineNumbers>
                    <CodeDisplay text={props.code}
                                 language={findLanguageByName(props.lang) ?? OtherLanguage}></CodeDisplay>
                </div>
                
                <footer className={"flex justify-between align-middle"}>
                    <KeywordList keywords={props.keywords}></KeywordList>
                    <div>
                        <span className={"text-xs inline-block align-middle"}>{date.toLocaleString()}</span>
                    </div>
                </footer>
            </Card>
        </article>
    );
}

export default memo(SnippetPost, (prev, next) => prev.id === next.id);