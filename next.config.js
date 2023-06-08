/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: "res.cloudinary.com",
              pathname: '/dx1cp4cj9/image/upload/**',
            },
          ],
    }
}

module.exports = nextConfig
