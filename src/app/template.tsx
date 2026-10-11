"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition: a short crossfade gives continuity between pages. No
 * vertical movement, so it can never be mistaken for scrolling.
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
      initial={animateIn ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
