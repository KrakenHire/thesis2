/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    basePath: process.env.NODE_ENV === 'production' ? '/admin' : '',
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '/admin' : '',
        uploadPath: process.env.NODE_ENV === 'production' ? '/admin/upload.php' : '/api/upload'
    }
};

module.exports = nextConfig;
