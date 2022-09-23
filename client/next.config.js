const {i18n} = require("./next-i18next.config");

const withPWA = require("next-pwa")

/** @type {import("next").NextConfig} */
var nextConfig = {
    i18n,
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    images: {
        domains: [
            "ckqwtaorsntwgqmcfsmi.supabase.co",
            "avatars.dicebear.com",
            "dummyimage.com"
        ]
    },
    async rewrites() {
        return [
            {
                source: "/api/convert_image",
                destination: "https://code-share-image-service.livelybay-b5b6ca38.brazilsouth.azurecontainerapps.io/convert"
            },
            {
                source: "/api/extract_keywords",
                destination: "https://code-share-key-terms-extractor.livelybay-b5b6ca38.brazilsouth.azurecontainerapps.io/extract"
            }
        ]
    }
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
