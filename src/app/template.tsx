"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition: a short fade + 12px rise gives continuity between pages
 * without making navigation feel slower. Disabled for reduced-motion users.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
