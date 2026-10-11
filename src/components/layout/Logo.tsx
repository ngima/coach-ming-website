import Link from "next/link";
import { site } from "@/config/site";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-3">
      <span className="chamfer grid size-9 place-items-center bg-lime font-display text-lg font-bold italic text-ink transition-transform duration-300 ease-out-expo group-hover:-rotate-6">
        {site.name[0]}
      </span>
      <span className="font-display text-base font-bold italic uppercase tracking-[0.06em] text-fg">
        {site.brand}
      </span>
    </Link>
  );
}
