import {FC, HTMLProps} from "react";
import WarningIcon from "../icons/WarningIcon";

type Props = {
    label: string;
    inputType?: "text" | "password";
    props?: HTMLProps<HTMLInputElement>;
    error?: string;
};

const FloatingLabelInput: FC<Props> = (props) => {
    let id = props.label.replace(" ", "_") + "_input";
    
    return (
        <div className={"mb-1"}>
            <div className={"floating-label-input relative pt-5 w-full"}>
                <input type={props.inputType ?? "text"} id={id} placeholder={" "} {...props.props}
                       className={"px-0 bg-transparent border-b-2 border-font-2 focus:border-primary-400 rounded-4xl peer w-full duration-200 transition-color"}/>
                <label htmlFor={id}
                       className={"px-0 text-font-2 absolute bottom-1 left-0 duration-300 font-light peer-focus:text-accent-1 group-focus:text-accent"}>{props.label}</label>
            </div>
            {props.error &&
                <p className={"font-light text-sm text-error-300 flex items-center mt-0.5 w-full gap-2"}>
                    <WarningIcon width={"1rem"}></WarningIcon>
                    {props.error}
                </p>
            }
        </div>
    )
}

export default FloatingLabelInput;