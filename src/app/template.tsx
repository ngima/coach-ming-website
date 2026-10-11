"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition: a short fade + 12px rise gives continuity between pages.
 * It must never run on the initial load: Motion would serialise `opacity: 0`
 * into the server HTML and hide the page until hydration, delaying LCP by
 * seconds on slow devices. So the first mount renders static, and only
 * client-side navigations (template remounts) animate.
 */
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animateIn = hasMounted && !reduce;

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
