import { describe, expect, it } from "vitest";
import { whatsappUrl } from "../whatsapp";

describe("whatsappUrl", () => {
  it("strips formatting and encodes the message", () => {
    expect(whatsappUrl("Hi there & hello", "+971 50 123 4567")).toBe(
      "https://wa.me/971501234567?text=Hi%20there%20%26%20hello",
    );
  });
});
