/** @type {import('next').NextConfig} */
//const nextConfig = {}

module.exports = {
    experimental: {
        serverActions: true,
      },
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    },
}

