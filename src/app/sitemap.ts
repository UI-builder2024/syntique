import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { SOLUTIONS } from "@/lib/solutions";
import { PROJECTS } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${SITE.url}${p}`;
  return [
    { url: u("/"), changeFrequency: "monthly", priority: 1 },
    { url: u("/work"), changeFrequency: "monthly", priority: 0.9 },
    { url: u("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: u("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: u("/solutions"), changeFrequency: "monthly", priority: 0.95 },
    ...SOLUTIONS.map((s) => ({ url: u(`/solutions/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...PROJECTS.map((p) => ({ url: u(`/work/${p.slug}`), changeFrequency: "yearly" as const, priority: 0.8 })),
    ...SERVICES.map((s) => ({ url: u(`/services/${s.slug}`), changeFrequency: "yearly" as const, priority: 0.8 })),
  ];
}
