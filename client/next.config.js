const {i18n} = require("./next-i18next.config");

const withPWA = require("next-pwa")

/** @type {import("next").NextConfig} */
var nextConfig = {
    i18n,
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    basePath: "/projects/code-share",
    images: {
        domains: [
            "ckqwtaorsntwgqmcfsmi.supabase.co",
            "avatars.dicebear.com",
            "dummyimage.com"
        ]
    },
}

nextConfig = withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    runtimeCaching: [
        {
            handler: "CacheFirst",
            urlPattern: "/api/extract_keywords",
            options: {
                cacheName: "extract-keywords-api-cache",
                expiration: {
                    maxEntries: 25
                }
            }
        },
        {
            handler: "CacheFirst",
            urlPattern: "/_next/image",
            options: {
                cacheName: "next-images-cache",
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 30
                }
            }
        }
    ]
})(nextConfig);

module.exports = nextConfig
