/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "images.pexels.com" },
            { hostname: "media.istockphoto.com" },
            { hostname: "res.cloudinary.com" },
        ],
    },  
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;