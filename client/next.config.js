/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: ["ckqwtaorsntwgqmcfsmi.supabase.co"]
  }
}

module.exports = nextConfig
