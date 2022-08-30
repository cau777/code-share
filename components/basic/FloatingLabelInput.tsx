import {FC, HTMLProps} from "react";
import SmallError from "./SmallError";

type Props = {
    label: string;
    inputType?: "text" | "password";
    props?: HTMLProps<HTMLInputElement>;
    error?: string;
};

const FloatingLabelInput: FC<Props> = (props) => {
    let id = props.label.replace(" ", "_") + "_input";
    
    return (
        <div className={"mb-2"}>
            <div className={"floating-label-input relative pt-5 w-full bg-back-1 rounded rounded-b-none"}>
                <input type={props.inputType ?? "text"} id={id} placeholder={" "} {...props.props}
                       className={"px-2 bg-transparent border-b-2 border-font-2 focus:border-primary-400 rounded-4xl peer w-full duration-200 transition-color"}/>
                <label htmlFor={id}
                       className={"px-2 text-font-2 absolute bottom-1 left-0 duration-300 font-light peer-focus:text-accent-1 group-focus:text-accent"}>{props.label}</label>
            </div>
            <SmallError message={props.error}></SmallError>
        </div>
    )
}

export default FloatingLabelInput;


// <div className={"mb-1"}>
//     <div className={"floating-label-input relative pt-3 mt-1 w-full border-2 border-w"}>
//         <input type={props.inputType ?? "text"} id={id} placeholder={" "} {...props.props}
//                className={"px-0 bg-transparent border-b-2 border-font-2 focus:border-primary-400 rounded-4xl peer w-full duration-200 transition-color"}/>
//         <label htmlFor={id}
//                className={"bg-transparent px-0 text-font-2 absolute bottom-1 left-0 duration-300 font-light peer-focus:text-accent-1 group-focus:text-accent"}>{props.label}</label>
//     </div>
//     <SmallError message={props.error}></SmallError>
// </div>