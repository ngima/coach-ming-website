/**
 * Single source of truth for everything that is specific to the coach.
 * Every value marked TODO is a placeholder — update it before launch.
 */

export const site = {
  name: "Migma",
  surname: "Sherpa",
  nickname: "Ming",
  brand: "Coach Ming",
  role: "Personal Trainer",
  gym: "My-PT",
  city: "Abu Dhabi",
  country: "United Arab Emirates",
  countryCode: "AE",
  url: "https://coachming.ae", // TODO: replace with the real domain once bought
  description:
    "Personal trainer in Abu Dhabi at My-PT. 1-to-1 strength, fat loss and conditioning coaching for everyone, with a ladies-only option and pre & postnatal expertise. Programmed with precision, delivered with care.",
  whatsapp: "971500000000", // TODO: coach's WhatsApp number, digits only, with country code
  whatsappMessage:
    "Hi Ming, I found your website and I'd like to book a free consultation.",
  email: "hello@coachming.ae", // TODO
  instagram: "https://instagram.com/coach.ming", // TODO
  instagramHandle: "@coach.ming", // TODO
  address: {
    street: "My-PT Studio", // TODO: street address
    area: "Al Reem Island", // TODO: area / neighbourhood
    city: "Abu Dhabi",
    mapsUrl: "https://maps.google.com/?q=My-PT+Abu+Dhabi", // TODO
    geo: { lat: 24.4539, lng: 54.3773 }, // TODO: studio coordinates
  },
  hours: [
    { days: "Sunday – Thursday", time: "06:00 – 21:00" },
    { days: "Friday – Saturday", time: "08:00 – 18:00" },
  ],
  languages: ["English", "Hindi", "Nepali"], // TODO
  credentials: [
    "Certified Personal Trainer (CPT)", // TODO: exact certifying body
    "Pre & Postnatal Exercise Specialist", // TODO
    "First Aid & CPR certified", // TODO
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  from: string; // TODO: pricing
  cadence: string;
  audience: string;
};

export const services: Service[] = [
  {
    id: "one-to-one",
    name: "1-to-1 Personal Training",
    tagline: "Your plan. Your pace. Full attention.",
    description:
      "Private 60-minute sessions at My-PT, programmed around your goal, schedule and training history. Every rep is coached and every block is progressed.",
    includes: [
      "Movement & strength assessment",
      "Periodised programme, updated every 4 weeks",
      "Technique coaching on every lift",
      "Nutrition guidance that fits your life",
      "Progress check-ins and photos (optional)",
    ],
    from: "AED 350", // TODO
    cadence: "per session · packs of 8, 12 or 24",
    audience: "Anyone who wants results with zero guesswork"
  },
  {
    id: "ladies-group",
    name: "Ladies-Only Small Group",
    tagline: "Strength in numbers. Max four women.",
    description:
      "Coached strength sessions in a private, women-only setting. The energy of a team, the attention of a coach, and a price that makes consistency easy.",
    includes: [
      "Maximum 4 women per session",
      "Structured strength & conditioning blocks",
      "Scaled to every level in the room",
      "Weekly accountability check-in",
    ],
    from: "AED 150", // TODO
    cadence: "per session · monthly memberships",
    audience: "Beginners and busy professionals who thrive with a crew",
  },
  {
    id: "online",
    name: "Online Coaching",
    tagline: "Coached anywhere. Accountable everywhere.",
    description:
      "A fully personalised programme delivered through an app, with form reviews, weekly adjustments and a coach one message away. Ideal if you travel or train at your own gym.",
    includes: [
      "Custom programme with video demos",
      "Form-check video reviews",
      "Weekly plan adjustments",
      "Habit & nutrition coaching",
      "Direct WhatsApp support",
    ],
    from: "AED 900", // TODO
    cadence: "per month",
    audience: "Self-motivated people who want expert structure"
  },
];

export const process = [
  {
    step: "01",
    title: "Free consult",
    text: "A 15-minute chat on WhatsApp or in person about your goals, injuries and schedule. No pressure, no sales script.",
  },
  {
    step: "02",
    title: "Assess & plan",
    text: "We test how you move and what you can commit to. You get a written plan within 48 hours.",
  },
  {
    step: "03",
    title: "Train, track, adjust",
    text: "Coached sessions, logged progress, and a programme that changes every four weeks as you get stronger.",
  },
];

export const differentiators = [
  {
    title: "Programmed, not improvised",
    text: "Every session belongs to a block with a purpose. You always know why you are doing what you are doing.",
  },
  {
    title: "Coaching for every body",
    text: "Every gender, every level, from first-timers to seasoned lifters. Pre and postnatal expertise when you need it, and a ladies-only option if you prefer privacy.",
  },
  {
    title: "Technique before load",
    text: "Strength that lasts is built on movement quality. We earn heavier weights, we never chase them.",
  },
  {
    title: "A coach who shows up",
    text: "Messages answered within 24 hours, sessions that start on time, and enough bad jokes to get you through the last set.",
  },
];

/** Sample reviews — replace with real client words before launch (TODO). */
export const testimonials = [
  {
    quote:
      "I came in scared of the weights area. Three months later I deadlifted 80 kg and I actually look forward to training.",
    name: "Sara M.",
    detail: "1-to-1 client · 6 months",
  },
  {
    quote:
      "Ming explains everything and somehow makes a 6 am session funny. My knees stopped hurting once she fixed my squat, and the postnatal plan was exactly what I needed.",
    name: "Aisha K.",
    detail: "Postnatal programme",
  },
  {
    quote:
      "I came for fat loss and stayed for the strength. Nine kilos down, deadlift up 60 kg, and the sessions are the best part of my week.",
    name: "Omar H.",
    detail: "1-to-1 client · 4 months",
  },
];

export const faqs = [
  {
    q: "Who do you train?",
    a: "Everyone. Any gender, any age over 16, complete beginners and experienced lifters. The programme is built around your goal and your body, not your gender.",
  },
  {
    q: "Is there a ladies-only option?",
    a: "Yes. The small-group sessions are women-only. For 1-to-1, we can book quieter hours at My-PT if you prefer privacy.",
  },
  {
    q: "I have never lifted weights. Is this for me?",
    a: "Yes. Most of my clients start as complete beginners. We begin with movement basics and bodyweight, and add load only when technique is solid.",
  },
  {
    q: "How much does personal training cost?",
    a: "1-to-1 sessions start from AED 350, ladies-only small group from AED 150 per session, and online coaching from AED 900 per month. Packs bring the per-session price down. Your first consultation is free.",
  },
  {
    q: "Can I train during pregnancy or after giving birth?",
    a: "Yes, with your doctor's clearance. I hold a pre and postnatal specialisation and programme every session around your stage and how you feel that day.",
  },
  {
    q: "Is Ming as strict as she looks?",
    a: "Only about your knees tracking over your toes. Everything else is negotiable, including the playlist. Expect hard work, clear coaching and at least one terrible pun per session.",
  },
  {
    q: "How quickly will I see results?",
    a: "Strength and energy improve within 3–4 weeks. Visible change in body composition usually shows at 8–12 weeks of consistent training and sensible eating.",
  },
];
