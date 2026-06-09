import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname:"images.pexels.com"},{hostname: "media.istockphoto.com"},{hostname:"res.cloudinary.com"},
        ],
    }
};

export default nextConfig;
