import {ChangeEvent, FC, HTMLProps, useEffect, useRef} from "react";
import SmallError from "./SmallError";

type Props = {
    label: string;
    inputType?: "text" | "password";
    props?: HTMLProps<HTMLTextAreaElement>;
    error?: string;
};

const FloatingLabelTextarea: FC<Props> = (props) => {
    let id = props.label.replace(" ", "_") + "_input";
    let parentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        updateHeight(parentRef.current!.querySelector("textarea")!)
    }, []);
    
    function updateHeight(element: HTMLTextAreaElement) {
        // Reset the height to calculate the scroll height
        element.style.height = "0px";
        element.style.height = (element.scrollHeight + 10) + "px";
    }
    
    function change(event: ChangeEvent<HTMLTextAreaElement>) {
        updateHeight(event.currentTarget);
        props.props?.onChange?.(event);
    }
    
    return (
        <div className={"mb-2"}>
            {/* Needs to be flex to avoid a black line below the border */}
            <div ref={parentRef}
                 className={"floating-label-textarea relative pt-5 w-full bg-back-1 rounded rounded-b-none flex flex-col"}>
                <textarea id={id} placeholder={" "} {...props.props} onChange={change}
                          className={"px-2 bg-transparent border-b-2 border-font-2 focus:border-primary-400 rounded-4xl peer w-full duration-200 transition-none transition-color resize-none max-h-96"}>
                </textarea>
                
                <label htmlFor={id}
                       className={"px-2 text-font-2 absolute top-4 left-0 duration-300 font-light peer-focus:text-accent-1 group-focus:text-accent"}>{props.label}</label>
            </div>
            <SmallError message={props.error}></SmallError>
        </div>
    )
}

export default FloatingLabelTextarea;