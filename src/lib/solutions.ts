// Industry systems ("packages") and the modules they are assembled from.
// Every package is one integrated system: modules share one database, one login and one admin,
// and can also be bought on their own as add-ons.

export type ModuleId =
  | "website"
  | "cms"
  | "crm"
  | "booking"
  | "payments"
  | "whatsapp"
  | "pos"
  | "ordering"
  | "voice"
  | "loyalty"
  | "app"
  | "profiles"
  | "matching"
  | "events"
  | "analytics"
  | "content"
  | "seo"
  | "care";

export type Module = { id: ModuleId; name: string; glyph: string; desc: string };

export const MODULES: Record<ModuleId, Module> = {
  website: { id: "website", name: "Converting website", glyph: "◐", desc: "Story-led, fast, SEO-ready — built around the one action each page exists for." },
  cms: { id: "cms", name: "Custom CMS", glyph: "▤", desc: "Edit menus, events, programs and pages yourself. Shaped around how your team works." },
  crm: { id: "crm", name: "CRM", glyph: "◎", desc: "Every customer, member or guest in one profile — history, preferences, lifetime value." },
  booking: { id: "booking", name: "Booking engine", glyph: "▦", desc: "Slots, sessions, batches, tables and capacity that can never double-book." },
  payments: { id: "payments", name: "Payments", glyph: "₹", desc: "UPI, cards and payment links with verified webhooks, invoices and refunds." },
  whatsapp: { id: "whatsapp", name: "WhatsApp automations", glyph: "✆", desc: "Confirmations, reminders, renewals and win-backs on the channel people actually read." },
  pos: { id: "pos", name: "POS", glyph: "▣", desc: "Billing, tables, KOTs and live availability — the single source of truth for the floor." },
  ordering: { id: "ordering", name: "Menu & ordering app", glyph: "◫", desc: "Your menu, your ordering, your customer data — direct, commission-free." },
  voice: { id: "voice", name: "AI voice agent", glyph: "◉", desc: "Answers every call 24/7, checks live availability and books — in your brand's voice." },
  loyalty: { id: "loyalty", name: "Memberships & loyalty", glyph: "✦", desc: "Passes, plans, points and perks that bring people back." },
  app: { id: "app", name: "Member app", glyph: "▢", desc: "An installable app (PWA) for members and regulars — no app-store wait." },
  profiles: { id: "profiles", name: "Profiles & onboarding", glyph: "◍", desc: "Rich profiles and verified onboarding for every side of your platform." },
  matching: { id: "matching", name: "Matching & applications", glyph: "⇄", desc: "Connect the right people to the right gigs, mentors or roles — and track every application." },
  events: { id: "events", name: "Events & livestreams", glyph: "◈", desc: "Tournaments, workshops, webinars and live sessions with registrations built in." },
  analytics: { id: "analytics", name: "Owner dashboard", glyph: "◢", desc: "Revenue, bookings, conversion and retention on one screen, every morning." },
  content: { id: "content", name: "Content automation", glyph: "▶", desc: "On-brand reels and carousels from our in-house pipeline, every week." },
  seo: { id: "seo", name: "SEO & local search", glyph: "⌕", desc: "Technical SEO, Google Business profile and local rankings that compound." },
  care: { id: "care", name: "Managed care", glyph: "✚", desc: "Hosting, monitoring, backups, updates and a monthly improvement sprint." },
};

export type Demo = "voice" | "booking" | "matching" | "content" | "launch";

export type Solution = {
  slug: string;
  product: string; // the system's name
  industry: string; // who it is for
  short: string; // one-line for cards
  headline: string;
  headlineAccent: string;
  sub: string;
  accent: string;
  demo: Demo;
  pains: { pain: string; fix: string }[];
  core: ModuleId[];
  addons: ModuleId[];
  outcomes: string[];
  proof: string[]; // project slugs
  forWho: string[];
  faq: { q: string; a: string }[];
  keywords: string[];
};

// Headline copy for each package's live demo.
export const DEMO_COPY: Record<Demo, { title: string; accent: string; note: string }> = {
  voice: {
    title: "A guest calls at 9:42 pm. Nobody on the floor picks up.",
    accent: "Your AI host does.",
    note: "It reads live availability from the POS, books the table, tags the guest in the CRM and confirms on WhatsApp — in seconds.",
  },
  booking: {
    title: "Bookings from everywhere.",
    accent: "One schedule.",
    note: "Website, WhatsApp and the front desk all write to the same live capacity — sessions fill, waitlists form and renewals chase themselves.",
  },
  matching: {
    title: "Both sides of the market,",
    accent: "matched and measured.",
    note: "Profiles, applications and matching in one place — with the numbers partners and investors want to see.",
  },
  content: { title: "Research to reel,", accent: "every week.", note: "" },
  launch: {
    title: "From sticky notes",
    accent: "to a live URL in 14 days.",
    note: "Strategy, design, build and launch — with a daily preview link so you watch it come together.",
  },
};

export const LAUNCH_PROMISE = "Ideation to live in as little as 2 weeks";

export const SOLUTIONS: Solution[] = [
  {
    slug: "restaurants",
    product: "Hospitality OS",
    industry: "Restaurants, cafés, bars & cloud kitchens",
    short: "Website, menu & booking app, POS, CRM and a 24/7 AI voice host — one system.",
    headline: "Every call answered. Every table filled.",
    headlineAccent: "One system runs the floor.",
    sub: "A story-led website, a direct menu and booking app, your POS, CMS and CRM — plus an AI voice host that picks up every call, checks live table availability in the POS and books it. All connected, all yours, all easy enough for the floor team on a Friday night.",
    accent: "#E3B866",
    demo: "voice",
    pains: [
      { pain: "The phone rings out during the dinner rush", fix: "An AI voice host answers every call, 24/7, and books straight into the POS." },
      { pain: "Aggregators take a big cut of every order", fix: "A direct menu & ordering app — your customers, your data, no commission." },
      { pain: "Bookings live in a notebook, a POS and three apps", fix: "One live availability shared by the website, the phone, WhatsApp and the floor." },
      { pain: "We don't know who our regulars are", fix: "A guest CRM that remembers visits, spend, allergies and the favourite table." },
      { pain: "Updating the menu means calling a developer", fix: "Change dishes, prices and photos from your phone in a minute." },
      { pain: "No-shows on our busiest nights", fix: "WhatsApp confirmations, reminders and optional deposits for big tables." },
    ],
    core: ["website", "ordering", "booking", "pos", "cms", "crm", "voice", "whatsapp"],
    addons: ["loyalty", "payments", "analytics", "content", "seo", "care"],
    outcomes: ["No missed bookings, even at 2 am", "More direct, commission-free orders", "Regulars recognised and rewarded", "One screen for the whole night"],
    proof: ["four-states"],
    forWho: ["Fine dining & casual dining", "Cafés & bars", "Cloud kitchens", "Multi-outlet groups", "New openings"],
    faq: [
      { q: "Do we have to replace our current POS?", a: "No. We can connect to the POS you use today, or set up our own POS when you'd rather have everything in one place. Either way the voice agent and booking app read the same live availability." },
      { q: "What does the AI voice host actually do?", a: "It answers calls 24/7 in your restaurant's voice, takes and changes bookings against live table availability, answers questions about the menu, timings and parking, and hands over to a human when it should. Every call is logged in the CRM." },
      { q: "Will my staff find it easy?", a: "It's designed for a Friday-night floor: big targets, one screen, no training manual. We train the team in person or on video during launch week." },
      { q: "Can we start with just the website and menu?", a: "Yes. Every part is a module. Start with the website and menu app in two weeks, then add booking, POS, CRM and the voice host when you're ready." },
    ],
    keywords: ["restaurant website development", "restaurant POS India", "AI voice agent for restaurants", "restaurant table booking system", "restaurant CRM", "direct online ordering"],
  },
  {
    slug: "sports-fitness",
    product: "Club OS",
    industry: "Sports academies, clubs, communities & studios",
    short: "Managed website, booking & memberships, CMS and CRM — customised to your club.",
    headline: "Fill every session.",
    headlineAccent: "Keep every member.",
    sub: "The system behind a community that books itself: a website that turns curiosity into first sessions, a booking engine for slots, batches and tournaments, memberships and payments, a CMS your coaches can use, and a CRM with WhatsApp automations that handle reminders, renewals and win-backs.",
    accent: "#F2602B",
    demo: "booking",
    pains: [
      { pain: "Bookings come in on WhatsApp, Instagram and phone calls", fix: "One booking engine — web, WhatsApp and front desk all write to the same schedule." },
      { pain: "Chasing fees and renewals every month", fix: "Memberships, passes and auto-reminders with UPI payment links." },
      { pain: "Sessions oversell, or run half-empty", fix: "Live capacity, waitlists and nudges to fill the last spots." },
      { pain: "Beginners bounce before booking their first session", fix: "A beginner-first website that answers 'will I belong?' before it asks for a login." },
      { pain: "Our admin is a spreadsheet nobody trusts", fix: "A CMS and CRM shaped around batches, coaches, venues and members." },
      { pain: "Expanding to a new city or venue is chaos", fix: "Multi-city, multi-venue from day one." },
    ],
    core: ["website", "booking", "loyalty", "payments", "cms", "crm", "whatsapp"],
    addons: ["app", "events", "voice", "analytics", "content", "seo", "care"],
    outcomes: ["Fuller sessions, fewer no-shows", "Renewals on autopilot", "First-timers who come back", "Admin in minutes, not evenings"],
    proof: ["sisters-in-sweat"],
    forWho: ["Sports & fitness communities", "Academies & coaching centres", "Turfs, courts & venues", "Yoga, dance & studios", "Tournaments & leagues"],
    faq: [
      { q: "We already have members in spreadsheets and an old app. Can you move them?", a: "Yes — that's exactly what we did for Sisters In Sweat: 37 legacy tables migrated into one clean system without losing history." },
      { q: "Do members need to download an app?", a: "No. Booking works on the website and WhatsApp. An installable member app is an add-on if you want one." },
      { q: "Can it handle teams, tournaments and batches?", a: "Yes — individual and team bookings, recurring batches, one-off workshops and tournaments with registrations." },
      { q: "Which payment gateways do you support?", a: "Razorpay by default in India, plus Stripe and others for international clubs." },
    ],
    keywords: ["sports academy management software", "club booking system", "fitness studio website", "membership management", "sports community platform"],
  },
  {
    slug: "careers-gigs",
    product: "Talent OS",
    industry: "Career, education & gig platforms",
    short: "A converting two-sided website and a custom CMS for students, mentors and businesses.",
    headline: "Two sides. One platform.",
    headlineAccent: "Both say yes.",
    sub: "For platforms that connect people to opportunities — gigs, mentors, internships, jobs. A website that speaks to each side separately and converts both, profiles and onboarding, matching and applications, and a custom CMS your team uses to run programs, partners and campaigns.",
    accent: "#7B3FF2",
    demo: "matching",
    pains: [
      { pain: "One homepage trying to talk to students and businesses at once", fix: "Separate journeys, proof and calls to action for every side of the market." },
      { pain: "Sign-ups that never finish onboarding", fix: "Short, staged onboarding with a reason to come back at every step." },
      { pain: "Every partner campaign needs a new page yesterday", fix: "A landing-page system in the CMS — launch a campaign page in an hour." },
      { pain: "Matching happens in someone's inbox", fix: "Profiles, applications and matching in one place, with a pipeline view." },
      { pain: "Mentors and businesses don't see the impact", fix: "Dashboards that show reach, applications and outcomes." },
    ],
    core: ["website", "cms", "profiles", "matching", "crm", "whatsapp"],
    addons: ["events", "payments", "app", "analytics", "content", "seo", "care"],
    outcomes: ["More sign-ups on both sides", "Onboarding people finish", "Campaigns live in hours", "Matches you can measure"],
    proof: ["timbuckdo", "careerview"],
    forWho: ["Gig & internship marketplaces", "Mentoring & career platforms", "EdTech & bootcamps", "Recruitment startups", "Campus programs"],
    faq: [
      { q: "Can you work with our existing backend or app?", a: "Yes. We can build the website and CMS on top of your current APIs, or build the platform end to end." },
      { q: "Do you handle payouts to gig workers?", a: "Payments and payouts are an add-on module, wired to your gateway of choice." },
      { q: "Can schools or partners get their own view?", a: "Yes — role-based access gives schools, partners and admins their own dashboards." },
    ],
    keywords: ["gig marketplace development", "mentoring platform development", "career platform website", "two-sided marketplace", "edtech website development"],
  },
  {
    slug: "content-engine",
    product: "Content Engine",
    industry: "Brands, founders & businesses on social",
    short: "Managed social & brand content from our own automation pipeline — on trend, on brand, every week.",
    headline: "Show up every week.",
    headlineAccent: "Without the content treadmill.",
    sub: "Our in-house pipeline researches what's working in your niche right now, builds a design language for your brand, writes scripts you approve, voices them, edits them with motion graphics and ships reels and carousels — at a quality bar most agencies can't hold weekly.",
    accent: "#D7FF3A",
    demo: "content",
    pains: [
      { pain: "We post in bursts, then disappear for a month", fix: "A weekly cadence that never depends on someone's free evening." },
      { pain: "Our reels look like everyone else's", fix: "A design language built for your brand from research, not a template." },
      { pain: "Agencies chase trends we don't understand", fix: "Trend research mapped to your niche — you approve every script." },
      { pain: "Founder doesn't have time to film", fix: "Voice cloning and avatar clips where they matter, motion graphics everywhere else." },
    ],
    core: ["content", "seo", "analytics"],
    addons: ["website", "crm", "whatsapp", "care"],
    outcomes: ["Consistent weekly output", "A recognisable brand look", "Hours back every week", "Reach that compounds"],
    proof: [],
    forWho: ["Founders & personal brands", "Restaurants & studios", "Clinics & services", "D2C brands", "B2B companies"],
    faq: [
      { q: "Is the content AI-generated?", a: "AI does the heavy lifting in research, voice and editing; humans approve every script and every cut. AI-generated voices and avatars are always labelled where platforms require it." },
      { q: "How many posts per month?", a: "Plans range from a few hero reels to a full weekly calendar of reels and carousels. We'll size it on the call." },
      { q: "Do you post for us?", a: "Yes — scheduling and publishing are included, with a monthly report on what worked." },
    ],
    keywords: ["social media management agency", "AI content automation", "instagram reels production", "brand content agency"],
  },
  {
    slug: "websites",
    product: "Launchpad",
    industry: "Any business that needs a site that sells",
    short: "A managed, converting website — designed, built, hosted and improved for you.",
    headline: "A website that sells.",
    headlineAccent: "Live in two weeks.",
    sub: "Not a template with your logo on it. A story-led, motion-rich website engineered around what your visitors should do next — with a CMS, SEO, analytics and lead capture wired to your inbox, CRM or WhatsApp. Then we keep improving it every month.",
    accent: "#3D3BFF",
    demo: "launch",
    pains: [
      { pain: "Our site looks fine but nobody enquires", fix: "Conversion-led structure: every section earns its place and points to one action." },
      { pain: "We can't update anything ourselves", fix: "A CMS shaped around your content — no developer needed." },
      { pain: "We don't show up on Google", fix: "Technical SEO, structured data and local search set up at launch." },
      { pain: "Leads get lost in an inbox", fix: "Leads land in your CRM, sheet or WhatsApp — with the source attached." },
    ],
    core: ["website", "cms", "seo", "analytics", "care"],
    addons: ["crm", "whatsapp", "booking", "payments", "content"],
    outcomes: ["More qualified enquiries", "Faster pages, better rankings", "A brand people remember", "A site that gets better monthly"],
    proof: ["four-states", "chitrapur-heritage-foundation", "timbuckdo"],
    forWho: ["Startups & launches", "Service businesses", "Non-profits", "Restaurants & hospitality", "Rebrands"],
    faq: [
      { q: "Is two weeks realistic?", a: "For a focused marketing website, yes — week one is strategy, structure and design; week two is build, content and launch. Larger platforms launch their first module in two weeks and grow in phases." },
      { q: "What does 'managed' include?", a: "Hosting, monitoring, backups, security updates, small changes and a monthly improvement sprint driven by your analytics." },
      { q: "Do we own it?", a: "Yes. Your domain, your code, your content and your data." },
    ],
    keywords: ["website development company", "website in 2 weeks", "managed website service", "conversion focused website design"],
  },
];

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);

// The two-week launch, used on every package page.
export const LAUNCH_PLAN = [
  { day: "Day 1–2", title: "Workshop & strategy", body: "Goals, audience, offers and the one action that matters. We leave with a signed-off plan." },
  { day: "Day 3–6", title: "Design", body: "Brand look, key screens and motion — reviewed live with you, twice." },
  { day: "Day 7–12", title: "Build & integrate", body: "Engineering, CMS, integrations and your real content. Daily preview link." },
  { day: "Day 13–14", title: "Launch & train", body: "QA, SEO, analytics, go-live and a handover session with your team." },
];
