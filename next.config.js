/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */

if (!process.env.AWS_HOSTNAME) {
  throw new Error("AWS_HOSTNAME environment variable is not set.");
}

const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com"
      },
      {
        protocol: "https",
        hostname: process.env.AWS_HOSTNAME
      },
    ],
  },
};

export default config;
