import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { isDemo } from "@/config/demo";

export default function robots(): MetadataRoute.Robots {
  if (isDemo) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
