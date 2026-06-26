import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "www.plamen.rs" },
      { protocol: "https", hostname: "gosi.rs" },
      { protocol: "https", hostname: "www.gosi.rs" },
      { protocol: "https", hostname: "fmt.rs" },
      { protocol: "https", hostname: "vatrosprem.rs" },
      { protocol: "https", hostname: "www.lemi-trafo.com" },
    ],
  },
}

export default nextConfig
