/** @type {import('next').NextConfig} */
//const nextConfig = {}

module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 800,
            aggregateTimeout: 300,
        }
        return config
    },
    experimental: {
        serverActions: true,
      },
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    },
}

