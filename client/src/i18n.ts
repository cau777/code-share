import {GetServerSideProps, GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export function getStaticTranslations(namespaces: string[]): GetStaticProps {
    return async ({locale}) => ({
        props: {
            ...(await serverSideTranslations(locale!, namespaces)),
        }
    });
}

export function getStaticCommonTranslations() {
    return getStaticTranslations(["common"]);
}

export function getServerTranslations(namespaces: string[]): GetServerSideProps {
    return async ({locale}) => ({
        props: {
            ...(await serverSideTranslations(locale!, namespaces)),
        }
    });
}

export function getServerCommonTranslations() {
    return getStaticTranslations(["common"]);
}