import { Dumbbell } from "./Dumbbell";

/**
 * Continuous strip of specialities. Pure CSS animation (no JS cost), pauses on
 * hover so it can be read, and collapses to a static list for reduced motion.
 */
export function Ticker({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      aria-label={items.join(", ")}
      className="group/ticker relative overflow-hidden border-y border-line bg-surface py-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
    >
      <ul className="flex w-max animate-ticker gap-10 whitespace-nowrap pl-10 group-hover/ticker:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        {row.map((t, i) => (
          <li
            key={`${t}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 font-display text-sm font-bold uppercase italic tracking-[0.14em] text-muted"
          >
            {t}
            <Dumbbell size={10} />
          </li>
        ))}
      </ul>
    </div>
  );
}
