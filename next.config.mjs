/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pub-38ebf40d52a54447b925c72399dcfe8f.r2.dev",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
