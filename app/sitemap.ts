import { articles } from "@/content/blog";
import { siteUrl } from "@/content/config";
import type { MetadataRoute } from "next";
import { sectors } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    ...sectors.map((s) => `/${s.slug}`),
    "/chi-siamo",
    "/contatti",
    "/blog",
    ...articles.map((a) => `/blog/${a.slug}`),
  ].map((path) => ({
    url: new URL(path || "/", siteUrl).href,
    changeFrequency: "monthly",
    priority: path ? 0.7 : 1,
  }));
}
