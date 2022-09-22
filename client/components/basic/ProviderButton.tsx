import {FC} from "react";
import GitHubLogoIcon from "../icons/GitHubLogoIcon";
import BtnPrimary from "./BtnPrimary";
import {supabase} from "../../src/supabase_client";

type Props = {
    provider: "github";
    disabled?: boolean;
    callback?: () => void;
}

const ProviderButton: FC<Props> = (props) => {
    async function loginProvider() {
        props.callback?.();
        await supabase.auth.signIn({provider: props.provider});
    }
    
    return (
        <BtnPrimary disabled={props.disabled} type={"button"} title={"GitHub"} onClick={()=>loginProvider()}>
            <GitHubLogoIcon height={"1.6rem"}></GitHubLogoIcon>
        </BtnPrimary>
    )
}

export default ProviderButton;