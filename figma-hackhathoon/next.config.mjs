import "dotenv/config";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
        },
      ],
    },
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_EDITOR_TOKEN: process.env.SANITY_EDITOR_TOKEN,
      // SANITY_API_TOKEN: process.env.SANITY_API_TOKEN, // Expose to server-side
    },
  };
  
  export default nextConfig;
  