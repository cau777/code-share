import {UseFormRegisterReturn} from "react-hook-form";
import {FC, HTMLProps} from "react";

type Props = {
    onKeyDown: HTMLProps<HTMLTextAreaElement>["onKeyDown"];
    onScroll: HTMLProps<HTMLTextAreaElement>["onScroll"],
    onSelect: HTMLProps<HTMLTextAreaElement>["onSelect"],
    onChange: HTMLProps<HTMLTextAreaElement>["onChange"],
    textareaProps: UseFormRegisterReturn;
}

const CodeEditorTextArea: FC<Props> = (props) => {
    return (
        <textarea autoCorrect={"none"} spellCheck={false}
                  className={"resize-none top-0 left-0 absolute bg-transparent text-transparent leading-[23px] caret-font-1 w-full word-wrap-normal overflow-hidden pl-1"}
                  onKeyDown={props.onKeyDown} onScroll={props.onScroll}
                  onSelect={props.onSelect} autoCapitalize={"off"}
                  rows={1} {...props.textareaProps} onChange={props.onChange}></textarea>
    );
}

export default CodeEditorTextArea;