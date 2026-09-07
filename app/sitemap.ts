import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  "",
  "/services",
  "/work",
  "/work/triagezero",
  "/work/aec-quality-workflow",
  "/quality-audit",
  "/insights",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.7,
  }));
}
