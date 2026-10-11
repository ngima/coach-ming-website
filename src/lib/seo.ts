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
    telephone: `+${site.whatsapp}`,
    email: site.email,
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

/** The employer. Ming is a coach at My-PT; clients book and pay there. */
export function businessSchema() {
  return {
    "@type": ["ExerciseGym", "LocalBusiness"],
    "@id": businessId,
    name: site.gym,
    url: site.url,
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
    employee: { "@id": personId },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.brand,
    about: { "@id": personId },
    publisher: { "@id": personId },
    inLanguage: "en-AE",
  };
}

/** Services Ming delivers at My-PT. No offers or prices: billing is the gym's. */
export function servicesSchema() {
  return {
    "@type": "ItemList",
    "@id": `${site.url}/services#list`,
    name: "Personal training services in Abu Dhabi",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${site.url}/services#${s.id}`,
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
