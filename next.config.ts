import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: { serverActions: { bodySizeLimit: "64kb" } },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        ...securityHeaders,
        ...(process.env.VERCEL === "1" && process.env.NODE_ENV === "production"
          ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
          : []),
      ],
    }];
  },
};

export default nextConfig;
