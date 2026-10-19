import { appendFile, mkdir } from "node:fs/promises";
import { SITE } from "@/lib/site";

// Receives a project brief and fans it out to whichever destinations are configured:
//   RESEND_API_KEY + LEAD_TO_EMAIL  → email via Resend (LEAD_FROM_EMAIL optional)
//   LEAD_WEBHOOK_URL                 → JSON POST (Slack, Zapier, Make, Google Apps Script, CRM…)
// In development every lead is also appended to .leads/leads.jsonl.

type Lead = {
  types?: string[];
  stage?: string;
  budget?: string;
  timeline?: string;
  currency?: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  website?: string;
  meta?: Record<string, string>;
};

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success.
  if (clean(body.website)) return Response.json({ ok: true });

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    company: clean(body.company, 200),
    phone: clean(body.phone, 40),
    types: Array.isArray(body.types) ? body.types.map((t) => clean(t, 60)).slice(0, 10) : [],
    stage: clean(body.stage, 80),
    budget: clean(body.budget, 80),
    timeline: clean(body.timeline, 80),
    currency: clean(body.currency, 5),
    message: clean(body.message, 4000),
    meta: Object.fromEntries(Object.entries(body.meta ?? {}).map(([k, v]) => [clean(k, 40), clean(v, 300)])),
    receivedAt: new Date().toISOString(),
  };

  if (lead.name.length < 2 || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return Response.json({ error: "Please add your name and a valid email." }, { status: 422 });
  }

  const text = [
    `New project brief — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    "",
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "—"}`,
    `Building: ${lead.types.join(", ") || "—"}`,
    `Stage: ${lead.stage || "—"}`,
    `Budget: ${lead.budget || "—"}`,
    `Timeline: ${lead.timeline || "—"}`,
    "",
    lead.message || "(no message)",
    "",
    `Source: ${JSON.stringify(lead.meta)}`,
  ].join("\n");

  const jobs: Promise<unknown>[] = [];

  if (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL) {
    jobs.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? `${SITE.short} <onboarding@resend.dev>`,
          to: process.env.LEAD_TO_EMAIL.split(","),
          reply_to: lead.email,
          subject: `New brief: ${lead.types[0] ?? "Project"} — ${lead.name}`,
          text,
        }),
      }).then((r) => {
        if (!r.ok) throw new Error(`Resend ${r.status}`);
      }),
    );
  }

  if (process.env.LEAD_WEBHOOK_URL) {
    jobs.push(
      fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lead }),
      }).then((r) => {
        if (!r.ok) throw new Error(`Webhook ${r.status}`);
      }),
    );
  }

  if (process.env.NODE_ENV !== "production") {
    jobs.push(mkdir(".leads", { recursive: true }).then(() => appendFile(".leads/leads.jsonl", JSON.stringify(lead) + "\n")));
  }

  const results = await Promise.allSettled(jobs);
  const failed = results.filter((r) => r.status === "rejected");
  failed.forEach((f) => console.error("[lead] delivery failed:", (f as PromiseRejectedResult).reason));
  console.log("[lead]", lead.email, lead.types.join("|"));

  // If destinations are configured and every one of them failed, tell the visitor so they can email instead.
  if (jobs.length > 0 && failed.length === jobs.length) {
    return Response.json({ error: "We couldn't send your brief just now." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
