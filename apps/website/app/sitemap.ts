import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "/",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "/palette",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
