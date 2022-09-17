const {i18n} = require("./next-i18next.config");

/** @type {import("next").NextConfig} */
const nextConfig = {
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
            }
        ]
    }
}

module.exports = nextConfig
