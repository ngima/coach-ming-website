import { isDemo } from "@/config/demo";

/** Visible while demo mode is on: makes clear nothing here is live or official. */
export function DemoBanner() {
  if (!isDemo) return null;
  return (
    <div role="note" className="border-b border-lime/40 bg-lime/10 px-4 py-2 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-lime">
      Demo preview · not a live site · names, contact details and programmes are placeholders
    </div>
  );
}
