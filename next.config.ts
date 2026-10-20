import { articles } from "./content/blog.ts";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the LAN preview connected to development updates.
  allowedDevOrigins: ["192.168.1.7", "192.168.1.49", "172.20.96.1"],
  redirects() {
    return [
      {
        source: "/consigli-manutenzione-piscina-blog",
        destination: "/blog",
        permanent: true,
      },
      { source: "/approfondimenti", destination: "/blog", permanent: true },
      {
        source: "/cookie-policy-ue",
        destination: "/cookie-policy",
        permanent: true,
      },
      ...articles.map((article) => ({
        source: `/${article.slug}`,
        destination: `/blog/${article.slug}`,
        permanent: true,
      })),
      {
        source: "/prodotti-per-piscine-lecce",
        destination: "/piscine-e-ricambi",
        permanent: true,
      },
      {
        source: "/attrezzature-giardinaggio-lecce",
        destination: "/giardinaggio-e-irrigazione",
        permanent: true,
      },
      {
        source: "/prodotti-depurazione-acqua-e-filtri",
        destination: "/filtrazione-e-depurazione",
        permanent: true,
      },
      {
        source: "/contatti-idrosud-srls-lecce",
        destination: "/contatti",
        permanent: true,
      },
    ];
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
