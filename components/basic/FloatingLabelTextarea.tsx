import {ChangeEvent, FC, HTMLProps} from "react";
import SmallError from "./SmallError";

type Props = {
    label: string;
    inputType?: "text" | "password";
    props?: HTMLProps<HTMLTextAreaElement>;
    error?: string;
};

const FloatingLabelInput: FC<Props> = (props) => {
    let id = props.label.replace(" ", "_") + "_input";
    
    function change(event: ChangeEvent<HTMLTextAreaElement>) {
        let element = event.currentTarget;
        element.rows = (element.value.match(/\n/g) || []).length + 2;
        props.props?.onChange?.(event);
    }
    
    return (
        <div className={"mb-2"}>
            {/* Needs to be flex to avoid a black line below the border */}
            <div className={"floating-label-textarea relative pt-5 w-full bg-back-1 rounded rounded-b-none flex flex-col"}>
                <textarea id={id} placeholder={" "} {...props.props} onChange={change}
                       className={"px-2 bg-transparent border-b-2 border-font-2 focus:border-primary-400 rounded-4xl peer w-full duration-200 transition-color resize-none"}>
                </textarea>
                
                <label htmlFor={id}
                       className={"px-2 text-font-2 absolute top-4 left-0 duration-300 font-light peer-focus:text-accent-1 group-focus:text-accent"}>{props.label}</label>
            </div>
            <SmallError message={props.error}></SmallError>
        </div>
    )
}

export default FloatingLabelInput;