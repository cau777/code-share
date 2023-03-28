import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

function getStaticTranslations(namespaces: string[]): GetStaticProps {
    return async ({locale}) => ({
        props: {
            ...(await serverSideTranslations(locale!, namespaces)),
        }
    });
}

// Get static translations in the common namespace
// Meant to be called in getStaticProps
export function getStaticCommonTranslations() {
    return getStaticTranslations(["common"]);
}
