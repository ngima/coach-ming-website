/**
 * Demo mode is ON unless NEXT_PUBLIC_DEMO is exactly "false". While on, the site
 * shows a demo ribbon and asks search engines not to index it. Set
 * NEXT_PUBLIC_DEMO=false in Vercel when the real details are in and it goes live.
 */
export const isDemo = process.env.NEXT_PUBLIC_DEMO !== "false";
