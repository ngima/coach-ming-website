"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { nav, site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  const close = () => setOpen(false);

  // Start every new page at the very top. Next scrolls the changed segment into
  // view, which lands just under the sticky header; anchors (#id) are left alone.
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color] duration-300",
          scrolled || open ? "border-line bg-ink/85 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:h-[72px] md:px-8">
        <Logo />

        <DesktopNav pathname={pathname} />

        <div className="hidden md:block">
          <Button href={whatsappUrl()} external size="md">
            Free consult
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative grid size-11 place-items-center md:hidden"
        >
          <span className="relative block h-3.5 w-6">
            <span className={cn("absolute left-0 top-0 h-0.5 w-6 bg-fg transition-transform duration-300 ease-out-expo", open && "top-[6px] rotate-45")} />
            <span className={cn("absolute left-0 top-[6px] h-0.5 w-6 bg-fg transition-opacity duration-200", open && "opacity-0")} />
            <span className={cn("absolute left-0 top-3 h-0.5 w-6 bg-fg transition-transform duration-300 ease-out-expo", open && "top-[6px] -rotate-45")} />
          </span>
        </button>
      </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between bg-ink px-6 pb-8 pt-6 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {nav.map((item, i) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={cn("display flex items-center justify-between border-b border-line py-4 text-[2rem]", active ? "text-lime" : "text-fg")}
                      >
                        {item.label}
                        <span className="font-mono text-xs not-italic text-muted-2">0{i + 1}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            <div className="space-y-4">
              <Button href={whatsappUrl()} external size="lg" className="w-full" onClick={close}>
                Book a free consult
              </Button>
              <p className="eyebrow text-center">
                {site.gym} · {site.city}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
