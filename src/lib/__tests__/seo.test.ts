import { describe, expect, it } from "vitest";
import { businessSchema, faqSchema, graph, personSchema, servicesSchema } from "../seo";
import { faqs, services } from "@/config/site";

describe("seo schemas", () => {
  it("links person and business by @id", () => {
    const p = personSchema();
    const b = businessSchema();
    expect(p.worksFor["@id"]).toBe(b["@id"]);
    expect(b.founder["@id"]).toBe(p["@id"]);
  });
  it("emits one offer per service with a numeric price", () => {
    const s = servicesSchema();
    expect(s.itemListElement).toHaveLength(services.length);
    for (const o of s.itemListElement) expect(Number(o.price)).toBeGreaterThan(0);
  });
  it("emits every FAQ", () => {
    expect(faqSchema().mainEntity).toHaveLength(faqs.length);
  });
  it("graph wraps nodes with a schema context", () => {
    const g = graph(personSchema());
    expect(g["@context"]).toBe("https://schema.org");
    expect(g["@graph"]).toHaveLength(1);
    expect(() => JSON.stringify(g)).not.toThrow();
  });
});
