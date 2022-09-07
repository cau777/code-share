import {NextPage} from "next";
import {useContext} from "react";
import {AuthContext} from "../../components/AuthContext";
import Profile from "../../components/profile/Profile";
import {AppName} from "../../src/styling";
import Head from "next/head";
import MustBeLoggedIn from "../../components/basic/MustBeLoggedIn";

const ProfilePage: NextPage = () => {
    let context = useContext(AuthContext);
    
    if (!context.loggedIn) {
        return (<MustBeLoggedIn action={"access your own profile"}></MustBeLoggedIn>);
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

export default ProfilePage;