export type Project = {
  slug: string;
  name: string;
  client: string;
  year?: string; // CONFIRM years left blank
  region: string;
  url: string;
  urlLabel: string;
  category: string;
  services: string[];
  headline: string;
  summary: string;
  accent: string;
  accentInk: string;
  images: { hero: string; mobile: string; full?: string; extra?: string[] };
  stats: { value: string; label: string }[];
  challenge: string;
  approach: { title: string; body: string }[];
  stack: string[];
  status?: "live" | "in-progress";
  integrations?: { name: string; what: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "sisters-in-sweat",
    name: "Sisters In Sweat",
    client: "Sisters In Sweat",
    year: "2026",
    region: "India",
    url: "https://www.sistersinsweat.com",
    urlLabel: "sistersinsweat.com",
    category: "Platform rebuild · Booking & payments",
    services: ["Legacy modernisation", "Product engineering", "CMS & admin", "Payments"],
    headline: "Rebuilt India's all-women sport community from legacy code to a booking platform people love to use.",
    summary:
      "A District-style discovery and booking platform for football, run clubs, yoga, padel, workshops and tournaments — moved off a fragile ASP.NET + DynamoDB stack onto a modern core with its own CRM, a single operations dashboard, WhatsApp built into every step and Razorpay payments.",
    accent: "#F2602B",
    accentInk: "#ffffff",
    images: {
      hero: "/work/sisters-in-sweat/desktop.webp",
      mobile: "/work/sisters-in-sweat/mobile.webp",
      full: "/work/sisters-in-sweat/full.webp",
    },
    stats: [
      { value: "13,164", label: "members on one platform — 12,520 migrated, 644 new" },
      { value: "1,375", label: "bookings confirmed since go-live" },
      { value: "1,398", label: "Razorpay payments captured" },
      { value: "1,977", label: "WhatsApp OTP logins — no passwords" },
    ],
    integrations: [
      { name: "Payload CMS", what: "A custom CRM and one operations dashboard — members, bookings, payments, attendance and content in a single place." },
      { name: "WhatsApp (WATI)", what: "OTP login, booking confirmations, rescheduling and attendance — on the channel members actually read." },
      { name: "Razorpay", what: "UPI and card payments with verified webhooks and idempotent capture." },
      { name: "Zoho CRM & Zoho Books", what: "Synced automatically in the background, so the team never has to open them to see or manage data." },
    ],
    challenge:
      "The old platform worked, but it was leaking trust: phone login with no OTP, cart totals the browser could edit, bookings that could oversell a session, and an 8,500-line admin nobody wanted to touch.",
    approach: [
      {
        title: "Read the legacy before replacing it",
        body: "An eleven-phase discovery traced every business rule back to the original code, profiled production data, and kept the one great asset — the slot reservation logic — as the spec for the new engine.",
      },
      {
        title: "No login wall before intent",
        body: "Browsing is anonymous and instant. Phone-OTP only appears at the moment someone books or buys, so curiosity is never punished with a form.",
      },
      {
        title: "Bookings that cannot oversell",
        body: "Atomic, idempotent slot reservation with server-computed pricing, membership discounts and team bookings, settled through Razorpay with verified webhooks.",
      },
      {
        title: "One dashboard instead of five tools",
        body: "A custom CRM built on Payload CMS became the team's single operations dashboard — members, bookings, payments, attendance, coupons and content. Invoices and CRM records flow to Zoho Books and Zoho CRM on their own, so nobody has to log in anywhere else.",
      },
      {
        title: "WhatsApp at every step",
        body: "Members log in with a WhatsApp OTP, get booking confirmations and reschedule on WhatsApp, and attendance is confirmed there too — 1,500+ automated messages since launch.",
      },
    ],
    stack: ["Next.js 16", "Payload CMS 3", "PostgreSQL", "Razorpay", "WhatsApp (WATI)", "Zoho CRM", "Zoho Books", "Google Cloud Run"],
    status: "live",
  },
  {
    slug: "four-states",
    name: "Four States",
    client: "Four States",
    year: "2026",
    region: "India",
    url: "https://four-states.vercel.app",
    urlLabel: "four-states.vercel.app",
    category: "Brand experience · Hospitality · Launching soon",
    services: ["Experience design", "Motion & storytelling", "Website", "Automation"],
    headline: "A restaurant you walk into before you arrive.",
    summary:
      "Four states of one kitchen — Roots, Memory, Discovery and Reinvention — told as a scroll-driven room you turn the handle on, light the lanterns in, and book a table from.",
    accent: "#E3B866",
    accentInk: "#1a1410",
    images: {
      hero: "/work/four-states/hero.webp",
      mobile: "/work/four-states/mobile.webp",
      extra: [
        "/work/four-states/desktop.webp",
        "/work/four-states/section.webp",
        "/work/four-states/interior.webp",
        "/work/four-states/thali.webp",
      ],
    },
    stats: [
      { value: "4", label: "story worlds, one per state of the kitchen" },
      { value: "1", label: "menu document in, live menu out — automatically" },
      { value: "0", label: "build steps — a static site that loads instantly" },
    ],
    challenge:
      "A new vegetarian restaurant with a layered story and no room to explain it. The site had to make people feel the place — and still get them to a booking in a couple of taps.",
    approach: [
      {
        title: "Doors, not a homepage",
        body: "Four doors open on the first visit — one per state. The hero pins and dives through a four-part platter into the room, where the lanterns switch on.",
      },
      {
        title: "Story as navigation",
        body: "Each cloth runner on the table is a button to its state's wall, so exploring the story and exploring the menu are the same gesture.",
      },
      {
        title: "Menu from the client's own document",
        body: "A small tool reads the kitchen's Word menu — dish names, descriptions, dietary marks — and files every dish under its state. Update the doc, re-run, done.",
      },
      {
        title: "Fast, calm and accessible",
        body: "Smoothed scrolling with a single scroll loop, a once-per-session loader, and a reduced-motion path with no loader and no smoothing.",
      },
    ],
    stack: ["HTML/CSS/JS", "Lenis", "Python tooling", "Vercel"],
    status: "in-progress",
  },
  {
    slug: "timbuckdo",
    name: "TimBuckDo",
    client: "TimBuckDo",
    year: "2026",
    region: "India",
    url: "https://timbuckdo.com",
    urlLabel: "timbuckdo.com",
    category: "Rebrand · Two-sided marketplace",
    services: ["Brand refresh", "Website", "Landing pages", "Motion"],
    headline: "One site, two audiences: students finding gigs, and the businesses hiring them.",
    summary:
      "A rebrand and rebuild for India's student gig hub, with separate journeys for students and for employers and merchants, plus campaign landing pages that launch fast.",
    accent: "#7B3FF2",
    accentInk: "#ffffff",
    images: {
      hero: "/work/timbuckdo/desktop.webp",
      mobile: "/work/timbuckdo/mobile.webp",
      full: "/work/timbuckdo/full.webp",
    },
    stats: [
      { value: "2", label: "audience journeys — students and businesses" },
      { value: "3", label: "business paths: employers, merchants, overview" },
      { value: "∞", label: "campaign landing pages from one system" },
    ],
    challenge:
      "Students and businesses want opposite things from the same brand. One generic homepage was serving neither, and every partner campaign needed a page yesterday.",
    approach: [
      {
        title: "Split the front door",
        body: "Dedicated student and business portals, each with its own story, proof and call to action, so nobody wades through copy written for someone else.",
      },
      {
        title: "Kinetic, confident brand",
        body: "Bold oversized type, motion-led sections and a purple system that feels like a generation's brand rather than a job board.",
      },
      {
        title: "Campaigns on demand",
        body: "A landing-page pattern for partner campaigns, so a brand collaboration can ship without a redesign.",
      },
      {
        title: "Data that tells the story",
        body: "Charts and maps bring reach and earnings to life for businesses deciding whether to post their first gig.",
      },
    ],
    stack: ["React 18", "Vite", "Tailwind CSS", "Framer Motion", "Recharts", "amCharts 5", "Vercel"],
    status: "live",
  },
  {
    slug: "careerview",
    name: "CareerView",
    client: "CareerView",
    region: "Australia",
    url: "https://career-view-ui-dev.vercel.app",
    urlLabel: "CareerView platform",
    category: "EdTech · Mentoring platform",
    services: ["Product design", "Web platform", "Community UX"],
    headline: "Real careers, explained by the people living them.",
    summary:
      "A student–mentor platform where young professionals share honest career stories through 1:1 mentoring, livestreams, podcasts and e-books — built to reach students from rural and lower socio-economic backgrounds.",
    accent: "#F5B800",
    accentInk: "#151515",
    images: {
      hero: "/work/careerview/desktop.webp",
      mobile: "/work/careerview/mobile.webp",
      full: "/work/careerview/full.webp",
    },
    stats: [
      { value: "100+", label: "young professionals on the platform" },
      { value: "10+", label: "cultural backgrounds represented" },
      { value: "4", label: "ways to learn: mentoring, livestreams, podcasts, e-books" },
    ],
    challenge:
      "Career advice usually comes from job descriptions. CareerView wanted students to hear from real people — and needed a platform that made asking a stranger a question feel easy.",
    approach: [
      {
        title: "Faces first",
        body: "The hero is a living wall of mentors and their roles. Students see a pilot, a chef or a marketer before they read a single sentence.",
      },
      {
        title: "Low-stakes first step",
        body: "“Ask a Question” is always one tap away, so the first interaction is curiosity, not commitment.",
      },
      {
        title: "Three audiences, one platform",
        body: "Clear paths for students, mentors and schools, each with its own call to action and onboarding.",
      },
    ],
    stack: ["React", "Next.js", "Vercel"],
    status: "live",
  },
  {
    slug: "chitrapur-heritage-foundation",
    name: "Chitrapur Heritage Foundation",
    client: "CHF USA",
    region: "United States",
    url: "https://chfusa.org",
    urlLabel: "chfusa.org",
    category: "Non-profit · Donations & CMS",
    services: ["Website", "Custom admin", "Donations UX"],
    headline: "A donation-first home for a 501(c)(3) preserving a community's heritage.",
    summary:
      "A website, a custom Strapi CMS and a Salesforce-connected donations pipeline for a non-profit founded in 2005 — working across heritage, education and women's empowerment, and designed so giving is always one tap away.",
    accent: "#E8822A",
    accentInk: "#ffffff",
    images: {
      hero: "/work/chf/desktop.webp",
      mobile: "/work/chf/mobile.webp",
      full: "/work/chf/full.webp",
    },
    stats: [
      { value: "55", label: "projects published through the CMS" },
      { value: "171", label: "seva & donation options, managed by volunteers" },
      { value: "1 tap", label: "to donate from any screen, via Stripe" },
    ],
    integrations: [
      { name: "Strapi CMS", what: "A custom CMS for projects, sevas, events, team and pages — with bulk upload for volunteers." },
      { name: "Salesforce", what: "Every donation tracked against donor accounts, so the finance team works from one source of truth." },
      { name: "Stripe", what: "Secure card donations for a US 501(c)(3), one tap from any screen." },
    ],
    challenge:
      "Most of CHF's supporters arrive on their phones. The old experience buried projects and made giving feel like paperwork.",
    approach: [
      {
        title: "App-like on mobile",
        body: "A bottom navigation bar with a centred Home and an always-present Donate, so the site behaves like an app people already know.",
      },
      {
        title: "Projects as proof",
        body: "Projects, events and news sit up front, so donors see exactly where their money goes before they give.",
      },
      {
        title: "An admin built for volunteers",
        body: "A custom Strapi CMS with bulk upload, so a small volunteer team keeps 55 projects and 171 seva options current without a developer.",
      },
      {
        title: "Donations that land in Salesforce",
        body: "Stripe takes the payment; Salesforce gets the donation against the donor's account automatically, so accounts are managed in one place.",
      },
    ],
    stack: ["React", "Strapi CMS", "Salesforce", "Stripe", "Node.js"],
    status: "live",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

// Client quotes. Only entries with draft: false are rendered on the live site;
// drafts show in `next dev` so the layout can be reviewed. Replace with real, approved quotes.
export const TESTIMONIALS: { quote: string; name: string; role: string; project: string; draft: boolean }[] = [
  {
    quote: "Replace with an approved quote from the Sisters In Sweat team.",
    name: "Name Surname",
    role: "Founder, Sisters In Sweat",
    project: "sisters-in-sweat",
    draft: true,
  },
  {
    quote: "Replace with an approved quote from the TimBuckDo team.",
    name: "Name Surname",
    role: "TimBuckDo",
    project: "timbuckdo",
    draft: true,
  },
  {
    quote: "Replace with an approved quote from CHF USA.",
    name: "Name Surname",
    role: "Chitrapur Heritage Foundation",
    project: "chitrapur-heritage-foundation",
    draft: true,
  },
];
