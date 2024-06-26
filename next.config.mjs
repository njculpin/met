/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.metmuseum.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
