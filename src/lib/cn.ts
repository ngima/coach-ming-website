/** Tiny class joiner — avoids a dependency for a marketing site. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
