// Set to the new site's public origin when deploying. No dependency on the former site.
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
);
