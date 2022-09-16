import {FC, HTMLProps} from "react";

type Props = HTMLProps<HTMLTextAreaElement>

const CodeEditorTextArea: FC<Props> = (props) => {
    return (
        <textarea autoCorrect={"none"} spellCheck={false}
                  className={"resize-none w-full h-full bg-transparent text-transparent leading-[23px] caret-font-1 top-0 left-0 absolute z-10 word-wrap-normal pl-1 whitespace-nowrap"}
                  autoCapitalize={"off"}
                  rows={1} {...props}></textarea>
    );
}

export default CodeEditorTextArea;