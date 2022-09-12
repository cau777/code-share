import {NextPage} from "next";
import {supabase} from "../src/supabase_client";
import {useAsyncEffect} from "../src/hooks";
import {useRouter} from "next/router";

const Login: NextPage = () => {
    let router = useRouter();
    
    useAsyncEffect(async () => {
        await supabase.auth.signOut();
        await router.push("/profile");
    }, []);
    return (
        <div>
            Logging out
        </div>
    )
}

export default Login;