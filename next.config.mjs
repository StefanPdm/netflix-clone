/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uhdtv.io',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'mango.blender.org',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'download.blender.org',
        pathname: '/**',
      },
    ],
    // domains: ['avatars.githubusercontent.com', 'upload.wikimedia.org', 'uhdtv.io', 'mango.blender.org', 'download.blender.org'],
  },
};

export default nextConfig;
