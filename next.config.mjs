/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            net: false,
            dns: false,
            child_process: false,
            tls: false
        };
        return config;
    },
    images: {
        domains: [
            "badges.razorpay.com", 
            "firebasestorage.googleapis.com", 
            "cloud.appwrite.io",
            "localhost"
        ],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost'
            },
            {
                protocol: 'https',
                hostname: 'localhost'
            }
        ]
    },
};

export default nextConfig;
