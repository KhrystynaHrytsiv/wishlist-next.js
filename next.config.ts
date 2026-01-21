import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     async redirects() {
          return [
               {
                    source: '/',
                    destination: '/wishes',
                    permanent: true,
               },
          ];
     },
     reactCompiler: true,
};

export default nextConfig;

