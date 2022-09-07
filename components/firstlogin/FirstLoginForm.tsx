import {FC} from "react";
import TextWriteAnimation from "../animated/TextWriteAnimation";
import Card from "../Card";
import {useForm} from "react-hook-form";

type Form = {}

const FirstLoginForm: FC = () => {
    let {handleSubmit, register} = useForm<Form>();
    
    function submit(data: Form) {
        console.log(data);
    }
    
    return (
        <Card>
            <div className={"mb-3"}>
                <h1 className={"monospace text-primary-200 flex justify-center"}>
                    <TextWriteAnimation text={"A little about you"} triggerView={true}></TextWriteAnimation>
                </h1>
            </div>
            <form className={"w-[20rem]"} onSubmit={handleSubmit(submit)}>
            {/*TODO*/}
            </form>
        </Card>
    );
}

export default FirstLoginForm;