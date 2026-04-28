import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jeremiahdaws.vercel.app";
  const now = new Date();
  return [
    { url: base, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/work`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/maker`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/apps`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/teach`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
  ];
}
