/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["s3.bucket"],
    domains: ["plus.unsplash.com"],
    domains: ["media.istockphoto.com"], // Specifies the hostname(s) from which Next.js should allow images
  },
};

export default nextConfig;
