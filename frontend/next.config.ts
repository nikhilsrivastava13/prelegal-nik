import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  // Static export for production (served by FastAPI). Not used in dev so
  // that Next.js rewrites can proxy API calls to the backend on port 8000.
  ...(!isDev && { output: "export" }),

  // In dev, proxy /api/* to the FastAPI backend running on port 8000.
  ...(isDev && {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:8000/api/:path*",
        },
      ];
    },
  }),
};

export default nextConfig;
