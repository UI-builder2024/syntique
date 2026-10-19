import {
  siDocker,
  siGooglecloud,
  siNextdotjs,
  siPayloadcms,
  siPostgresql,
  siRazorpay,
  siStrapi,
  siStripe,
  siVercel,
  siWhatsapp,
  siZoho,
} from "simple-icons";

type Icon = { path: string; hex: string; title: string };

// Salesforce isn't in Simple Icons (trademark); a plain cloud glyph stands in, always labelled.
const CLOUD: Icon = {
  title: "Salesforce",
  hex: "00A1E0",
  path: "M10.006 5.415a4.195 4.195 0 0 1 3.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.16 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 0 1-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 0 1 8.88 20.4a4.302 4.302 0 0 1-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8",
};

// Integration name (as written in src/lib/work.ts) -> logo.
const BY_NAME: Record<string, Icon> = {
  "Payload CMS": siPayloadcms,
  "WhatsApp (WATI)": siWhatsapp,
  WhatsApp: siWhatsapp,
  Razorpay: siRazorpay,
  "Zoho CRM & Zoho Books": siZoho,
  Zoho: siZoho,
  "Strapi CMS": siStrapi,
  Strapi: siStrapi,
  Salesforce: CLOUD,
  Stripe: siStripe,
  "Next.js": siNextdotjs,
  PostgreSQL: siPostgresql,
  "Google Cloud": siGooglecloud,
  Vercel: siVercel,
  Docker: siDocker,
};

export const hasLogo = (name: string) => name in BY_NAME;

// Brand colours that would vanish on our dark ink background fall back to paper.
const DARK = new Set(["000000", "0C2451"]);

export function BrandLogo({
  name,
  size = 20,
  mono = false,
  className = "",
}: {
  name: string;
  size?: number;
  mono?: boolean;
  className?: string;
}) {
  const icon = BY_NAME[name];
  if (!icon) return null;
  const fill = mono ? "currentColor" : DARK.has(icon.hex) ? "var(--paper)" : `#${icon.hex}`;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-label={icon.title} role="img">
      <path d={icon.path} fill={fill} />
    </svg>
  );
}

// The integrations we have shipped in production, for "works with" rows.
export const SHIPPED_INTEGRATIONS = ["Payload CMS", "Strapi", "WhatsApp", "Razorpay", "Stripe", "Zoho", "Salesforce", "PostgreSQL", "Google Cloud", "Vercel"];
