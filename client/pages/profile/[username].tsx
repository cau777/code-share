import {GetServerSideProps, NextPage} from "next";
import Profile from "../../components/profile/Profile";
import {useRouter} from "next/router";
import {useContext, useEffect} from "react";
import {fromTable, supabase} from "../../src/supabase_client";
import {AuthContext} from "../../components/AuthContext";
import {UserData} from "../../src/db_types";
import BlockError from "../../components/basic/BlockError";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {AppName} from "../../src/styling";
import {useTranslation} from "next-i18next";

type Props = { found: false; } | ({ found: true; } & UserData);

const ProfileByUsernamePage: NextPage<Props> = (props) => {
    let router = useRouter();
    let context = useContext(AuthContext);
    let {t} = useTranslation();
    
    useEffect(() => {
        if (props.found && context.loggedIn && context.profileData.username === props.username)
            router.push("/profile").then();
        // @ts-ignore
    }, [context.loggedIn, context.profileData?.username, props.found, props.username, router]);
    
    if (!props.found)
        return (
            <BlockError>{t("errorProfileNotFound")}</BlockError>
        )
    
    return (
        <>
            <Head>
                <title>{props.name + " " + AppName}</title>
            </Head>
            <Profile name={props.name} bio={props.bio} username={props.username} id={props.id} key={props.username}></Profile>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({locale, query}) => {
    let {username} = query;
    
    let {data} = await fromTable(supabase, "UserPublicInfo")
        .select("*")
        .match({username})
        .single();
    
    let translations = await serverSideTranslations(locale!, ["common"]);
    
    return data === null ? {
        props: {
            ...translations,
            found: false
        }
    } : {
        props: {
            ...translations,
            found: true,
            username: data.username,
            id: data.id,
            bio: data.bio,
            name: data.name
        }
    };
}

export default ProfileByUsernamePage;