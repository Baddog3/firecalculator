/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.agents/**",
          "**/.npm-cache/**"
        ]
      };
    }

    return config;
  }
};

export default nextConfig;
