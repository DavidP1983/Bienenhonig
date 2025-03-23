
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dmrsemgsn/**'
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'my.hdistore.com',
                pathname: '/img/**'
            },
            {
                protocol: 'https',
                hostname: 'images.squarespace-cdn.com',
                pathname: '/content/**'
            },
            {
                protocol: 'https',
                hostname: 'www.breitsamer.de',
                pathname: '/wp-content/**'
            },
            {
                protocol: 'https',
                hostname: 'europafoodxb.com',
                pathname: '/media/**'
            },
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                pathname: '/images/**'
            },
            {
                protocol: 'https',
                hostname: 'natoora.com.au',
                pathname: '/wp-content/**'
            },
            {
                protocol: 'https',
                hostname: 'buonitalia.com',
                pathname: '/wp-content/**'
            },
            {
                protocol: 'https',
                hostname: 'www.thehoneybeestore.ca',
                pathname: '/v/**'
            },
            {
                protocol: 'https',
                hostname: 'ayushclub.com',
                pathname: '/wp-content/**'
            },
            {
                protocol: 'https',
                hostname: 'www.sansilfarma.com.br',
                pathname: '/BACKOFFICE/**'
            },
            {
                protocol: 'https',
                hostname: 'pchelosila.ru',
                pathname: '/wa-data/**'
            },
            {
                protocol: 'https',
                hostname: 'pchelosila.ru',
                pathname: '/wa-data/**'
            },
            {
                protocol: 'https',
                hostname: 'image.jimcdn.com',
                pathname: '/app/**'
            },
        ],
    },
    // swcMinify: true,
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
};

export default nextConfig;