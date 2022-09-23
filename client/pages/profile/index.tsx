import {NextPage} from "next";
import {useContext} from "react";
import {AuthContext} from "../../components/AuthContext";
import Profile from "../../components/profile/Profile";
import {AppName} from "../../src/styling";
import Head from "next/head";
import MustBeLoggedIn from "../../components/basic/MustBeLoggedIn";
import {getStaticCommonTranslations} from "../../src/i18n_server";

const ProfilePage: NextPage = () => {
    const context = useContext(AuthContext);
    
    if (!context.loggedIn) {
        return (<MustBeLoggedIn actionKey={"accessOwnProfile"}></MustBeLoggedIn>);
    }
    
    return (
        <>
            <Head>
                <title>Profile {AppName}</title>
            </Head>
            <Profile {...context.profileData} id={context.loggedIn ? context.id : null!}></Profile>
        </>
    );
}

export const getStaticProps = getStaticCommonTranslations();

export default ProfilePage;