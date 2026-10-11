import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.brand} · Personal Trainer ${site.city}`,
    short_name: site.brand,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0c0a",
    theme_color: "#0a0c0a",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
