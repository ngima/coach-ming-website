import { describe, expect, it } from "vitest";
import { businessSchema, faqSchema, graph, personSchema, servicesSchema } from "../seo";
import { faqs, services } from "@/config/site";

describe("seo schemas", () => {
  it("links person and employer by @id", () => {
    const p = personSchema();
    const b = businessSchema();
    expect(p.worksFor["@id"]).toBe(b["@id"]);
    expect(b.employee["@id"]).toBe(p["@id"]);
  });
  it("emits one service per programme with no prices", () => {
    const s = servicesSchema();
    expect(s.itemListElement).toHaveLength(services.length);
    expect(JSON.stringify(s)).not.toMatch(/price/i);
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
