export type Service = {
  slug: string;
  name: string;
  short: string;
  pitch: string;
  body: string;
  deliverables: string[];
  outcomes: string[];
  proof: string[]; // project slugs
  image: string;
  keywords: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "conversion-websites",
    name: "Websites that convert",
    short: "Marketing sites & landing pages",
    pitch: "Your website is your best salesperson. We make sure it closes.",
    body: "We design and build fast, story-led websites around one question: what should this visitor do next? Every section earns its place, every call to action is placed where intent peaks, and every page ships SEO-ready.",
    deliverables: [
      "Positioning & messaging workshop",
      "Conversion-led information architecture",
      "Custom design & motion",
      "Next.js build with technical SEO",
      "Lead capture wired to your inbox, CRM or WhatsApp",
      "Analytics & event tracking",
    ],
    outcomes: ["More qualified enquiries", "Faster pages, better rankings", "A brand people remember"],
    proof: ["four-states", "timbuckdo", "chitrapur-heritage-foundation"],
    image: "/work/four-states/hero.webp",
    keywords: ["website development", "landing page design", "conversion rate optimisation", "Next.js agency"],
  },
  {
    slug: "platform-engineering",
    name: "Product & platform engineering",
    short: "Booking, marketplaces, dashboards",
    pitch: "Booking engines, marketplaces and portals that hold up on launch day — and on day 1,000.",
    body: "From discovery to deployment, we build the whole system around how you operate: domain models, booking and capacity logic, payments, auth, a custom CRM and operations dashboard, and the integrations your business runs on — Razorpay, Stripe, WhatsApp, Zoho, Salesforce — with the runbooks your team needs to own it.",
    deliverables: [
      "Product discovery & technical architecture",
      "Booking, capacity & payment flows",
      "Phone-OTP and role-based auth",
      "Admin & CMS (Payload, Strapi)",
      "Integrations: Razorpay, Stripe, WhatsApp, Zoho, Salesforce & more",
      "Deployment runbooks & handover docs",
    ],
    outcomes: ["Fewer support tickets", "No double bookings", "A codebase your team can own"],
    proof: ["sisters-in-sweat", "careerview"],
    image: "/work/sisters-in-sweat/desktop.webp",
    keywords: ["custom software development", "booking platform development", "marketplace development", "SaaS development"],
  },
  {
    slug: "legacy-modernisation",
    name: "Legacy modernisation",
    short: "Migrations without the drama",
    pitch: "Move off the old stack without losing the business rules hiding inside it.",
    body: "We read your legacy system before we replace it — tracing business rules to source, profiling production data and keeping what works. Then we migrate in phases, so the business never stops.",
    deliverables: [
      "Legacy code & data audit",
      "Extracted, cited business rules",
      "Gap analysis & migration strategy",
      "Idempotent data import scripts",
      "Parallel-run & cutover plan",
      "Security hardening",
    ],
    outcomes: ["Zero lost business logic", "Closed security holes", "A modern stack you can hire for"],
    proof: ["sisters-in-sweat"],
    image: "/work/sisters-in-sweat/mobile.webp",
    keywords: ["legacy application modernisation", "ASP.NET to Next.js migration", "DynamoDB to PostgreSQL migration"],
  },
  {
    slug: "brand-experience-design",
    name: "Brand & experience design",
    short: "Identity, UI systems, motion",
    pitch: "Brands that feel like something — and design systems that scale it.",
    body: "Logos, identity systems, UI kits and motion languages built together, so the brand on your deck, your reels and your product is the same brand. Then we hand over a system, not a pile of screens.",
    deliverables: [
      "Logo & identity system",
      "Design tokens & UI kit",
      "Motion principles",
      "Product & marketing UI",
      "Accessibility (WCAG AA)",
      "Brand assets for social & video",
    ],
    outcomes: ["Instant recognition", "Consistency across channels", "Faster design-to-build"],
    proof: ["four-states", "timbuckdo"],
    image: "/work/four-states/section.webp",
    keywords: ["brand identity design", "UI UX design agency", "design systems", "motion design"],
  },
  {
    slug: "content-automation",
    name: "Content automation",
    short: "AI reel & carousel pipeline",
    pitch: "A content engine that researches, scripts, voices, edits and ships reels in your brand — every week.",
    body: "Our in-house pipeline turns research into on-brand short-form video and carousels. It studies your niche, builds a design language from it, writes scripts you approve, voices them with your cloned voice, edits with motion graphics and mixes to platform loudness — with approval gates at every step and AI disclosure built in.",
    deliverables: [
      "Niche & creator research",
      "A design language built for your brand",
      "Scripts with approval gates",
      "Voice cloning & avatar clips",
      "Motion-graphic edits in 9:16",
      "Carousels from the same system",
    ],
    outcomes: ["Consistent weekly output", "On-brand by default", "Hours back every week"],
    proof: [],
    image: "/brand/automation.webp",
    keywords: ["AI content automation", "Instagram reels automation", "AI video editing", "content marketing automation"],
  },
  {
    slug: "cms-and-admin",
    name: "CMS & admin systems",
    short: "Tools your team will actually use",
    pitch: "Give your team the keys. Content, events, donations and data — no developer needed.",
    body: "We build admin panels and content systems shaped around how your team works: bulk uploads, approvals, roles and the reports you check every morning.",
    deliverables: [
      "Payload or Strapi CMS setup",
      "Custom collections & workflows",
      "Bulk import & export",
      "Roles & permissions",
      "Operations guides for your team",
    ],
    outcomes: ["Content updates in minutes", "Fewer developer tickets", "Clean, trustworthy data"],
    proof: ["chitrapur-heritage-foundation", "sisters-in-sweat"],
    image: "/work/chf/desktop.webp",
    keywords: ["headless CMS development", "Payload CMS agency", "Strapi development", "custom admin panel"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const FAQS = [
  {
    q: "What does Syntique Technologies do?",
    a: "We're a software studio. We design and engineer websites that convert, booking and payment platforms, admin systems, legacy migrations and AI content automation — from the first workshop to launch and beyond.",
  },
  {
    q: "How long does a website or platform take?",
    a: "A focused marketing website typically takes 3–6 weeks. Platforms with booking, payments or migrations run 2–4 months, delivered in phases so you see working software early.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We've shipped for teams in India, the United States and Australia, and we work async-first with clear weekly demos.",
  },
  {
    q: "Can you take over or rebuild an existing system?",
    a: "That's one of our specialities. We audit the legacy code and data first, extract the business rules, then migrate in phases so nothing is lost.",
  },
  {
    q: "What is the content automation pipeline?",
    a: "An in-house system that researches your niche, builds a design language, writes scripts you approve, voices them, edits them with motion graphics and delivers platform-ready reels and carousels.",
  },
  {
    q: "What happens after I send a brief?",
    a: "We read it, reply with questions or a call slot, and follow up with a scoped proposal and timeline. No pressure, no generic decks.",
  },
];
