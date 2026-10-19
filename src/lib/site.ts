// Single place for everything that is a business decision rather than code.
// Replace the values marked CONFIRM before launch.
export const SITE = {
  name: "Syntique Technologies",
  short: "Syntique",
  // CONFIRM: production domain (used for canonical URLs, sitemap and OG tags).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://syntique.tech",
  // CONFIRM: the inbox leads should reach.
  email: "hello@syntique.tech",
  // CONFIRM: WhatsApp number in international format, digits only. Empty hides the button.
  whatsapp: "",
  tagline: "Software, crafted with technique.",
  description:
    "Syntique Technologies is a software studio that designs and engineers conversion-focused websites, booking and payment platforms, legacy modernisations and AI content automation for ambitious teams in India, the US and Australia.",
  // Shown in the hero status chip. Set to "" to hide.
  availability: "Now booking new builds",
  // Promise shown after a lead submits. Keep it to something the team will actually honour.
  replyPromise: "within one business day",
  socials: {
    linkedin: "",
    instagram: "",
  },
};

export const NAV = [
  { href: "/solutions", label: "Systems" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/services", label: "Services" },
];
