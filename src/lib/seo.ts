import { faqs, services, site } from "@/config/site";

const fullName = [site.name, site.surname].filter(Boolean).join(" ");
export const personId = `${site.url}/#person`;
export const businessId = `${site.url}/#business`;

export function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: fullName,
    alternateName: [site.brand, `${site.nickname} ${site.surname}`],
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    sameAs: [site.instagram],
    worksFor: { "@id": businessId },
    knowsLanguage: site.languages,
    hasCredential: site.credentials.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.countryCode,
    },
  };
}

export function businessSchema() {
  return {
    "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
    "@id": businessId,
    name: `${site.brand} · Personal Trainer at ${site.gym}`,
    description: site.description,
    url: site.url,
    telephone: `+${site.whatsapp}`,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    priceRange: "AED 150 – AED 900",
    address: {
      "@type": "PostalAddress",
      streetAddress: [site.address.street, site.address.area].filter(Boolean).join(", "),
      addressLocality: site.address.city,
      addressCountry: site.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    areaServed: { "@type": "City", name: site.city },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "06:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    founder: { "@id": personId },
    employee: { "@id": personId },
    sameAs: [site.instagram],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.brand,
    publisher: { "@id": businessId },
    inLanguage: "en-AE",
  };
}

export function servicesSchema() {
  return {
    "@type": "OfferCatalog",
    "@id": `${site.url}/services#catalog`,
    name: "Personal training services in Abu Dhabi",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      url: `${site.url}/services#${s.id}`,
      priceCurrency: "AED",
      price: s.from.replace(/[^\d.]/g, ""),
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        serviceType: "Personal training",
        provider: { "@id": businessId },
        areaServed: { "@type": "City", name: site.city },
      },
    })),
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

/** Wrap one or more schema nodes into a single JSON-LD graph. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
