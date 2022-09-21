import {FC, useState} from "react";
import {useAsyncEffect} from "../../src/hooks";
import {fromTable, supabase} from "../../src/supabase_client";
import BlockError from "../basic/BlockError";
import Loading from "../basic/Loading";
import ProfilePicture from "../basic/ProfilePicture";
import Link from "next/link";

type Props = {
    query?: string;
}

type User = {
    id: string;
    username: string;
    name: string;
}

type State = {
    data: User[];
}

const UsersList: FC<Props> = (props) => {
    let [state, setState] = useState<State>();
    let [error, setError] = useState<string>();
    
    useAsyncEffect(async () => {
        let query = fromTable(supabase, "UserPublicInfo")
            .select("*")
        
        if (props.query)
            query = query.or(`or(username.fts.%${props.query}%), or(name.fts.%${props.query}%)`);
        
        let records = await query;
        
        if (records.data === null) {
            setError(records.error.message);
            return;
        }
        
        setState({data: records.data});
    });
    
    if (error !== undefined)
        return (<BlockError>{error}</BlockError>);
    
    if (state === undefined)
        return (<Loading></Loading>);
    
    return (
        <div className={"rounded-lg bg-back-2 p-3 pb-1"}>
            <div className={"max-h-[60vh] overflow-y-auto"}>
                {state.data.map(o => (
                    <Link key={o.username} href={"/profile/" + o.username}>
                        <div className={"flex gap-2 align-middle mb-3 cursor-pointer"}>
                            <div className={"h-full w-12"}>
                                <ProfilePicture id={o.id}></ProfilePicture>
                            </div>
                            <div className={"my-auto"}>
                                <h4 className={"leading-tight"}>{o.name}</h4>
                                <h5 className={"text-font-2"}>@{o.username}</h5>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default UsersList;