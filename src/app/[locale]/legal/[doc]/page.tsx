import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

// Sprint 30 US-224 — Terms / Privacy / Refund policy. Required for Paddle's
// production website approval (a checkout domain must present terms, privacy
// and refund policy). Deliberately English-only: legal text should not be
// machine-translated into 13 locales; the page chrome (header/footer) still
// follows the visitor's locale.

type DocId = "terms" | "privacy" | "refunds";

interface Section {
  heading: string;
  body: string[];
}

const DOCS: Record<DocId, { title: string; updated: string; sections: Section[] }> = {
  terms: {
    title: "Terms of Service",
    updated: "July 6, 2026",
    sections: [
      {
        heading: "1. Agreement",
        body: [
          "By downloading or using the Screen Studio desktop application (the “App”) or this website, you agree to these Terms of Service. If you do not agree, do not use the App.",
        ],
      },
      {
        heading: "2. The service",
        body: [
          "Screen Studio is a macOS screen-recording and editing application. The Free plan works fully offline and does not require an account. The Pro subscription unlocks additional features including exports above 720p, webcam and audio recording, on-device transcripts, and unlimited recording length.",
          "Your recordings and projects are stored locally on your device. We never receive or store your video content.",
        ],
      },
      {
        heading: "3. Accounts",
        body: [
          "A Pro subscription requires an account (email and password, or Google/GitHub sign-in). You are responsible for keeping your credentials secure. We may suspend accounts that abuse the service or violate these terms.",
        ],
      },
      {
        heading: "4. Subscriptions & billing",
        body: [
          "Paid subscriptions are sold by Paddle.com, which acts as Merchant of Record. Paddle handles payment processing, applicable taxes (VAT/sales tax) and invoicing. Subscriptions renew automatically each billing period until canceled.",
          "You can cancel anytime from the Account panel in the App (“Manage billing”), which opens Paddle's customer portal. After cancellation, Pro features remain active until the end of the paid period.",
          "Refunds are handled per our Refund Policy (see /legal/refunds).",
        ],
      },
      {
        heading: "5. Acceptable use",
        body: [
          "You must not use the App to record people without consent where consent is required by law, infringe third-party rights, or attempt to circumvent feature restrictions or license enforcement.",
        ],
      },
      {
        heading: "6. Intellectual property",
        body: [
          "The App, website and branding are our property. Content you record belongs to you; we claim no rights over your recordings.",
        ],
      },
      {
        heading: "7. Disclaimer & limitation of liability",
        body: [
          "The App is provided “as is” without warranties of any kind. To the maximum extent permitted by law, we are not liable for indirect, incidental or consequential damages, or for loss of data. Our total liability is limited to the amount you paid in the 12 months preceding the claim.",
        ],
      },
      {
        heading: "8. Changes",
        body: [
          "We may update these terms; material changes will be announced on this page with an updated date. Continued use after changes constitutes acceptance.",
        ],
      },
      {
        heading: "9. Contact",
        body: ["Questions about these terms: hello@screenstudio.example."],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "July 6, 2026",
    sections: [
      {
        heading: "1. The short version",
        body: [
          "Your recordings never leave your Mac unless you explicitly export and share them. We collect the minimum needed to run accounts and billing, plus strictly opt-in anonymous usage analytics.",
        ],
      },
      {
        heading: "2. What we collect",
        body: [
          "Account data (only if you sign in): email address, display name, and authentication identifiers, stored with Supabase (our authentication and database provider).",
          "Billing data (only if you subscribe): subscription status, plan, and billing period, linked to your account. Payment details (card numbers, billing address) are collected and stored by Paddle, our Merchant of Record — we never see them.",
          "Usage analytics (opt-in only): anonymous feature-usage events (e.g. “export started”, format chosen). No file paths, no recording content, no personal data. You can decline or withdraw consent in the App at any time.",
        ],
      },
      {
        heading: "3. What we do NOT collect",
        body: [
          "Your screen recordings, webcam footage, microphone audio, transcripts, and edit projects are stored only on your device. Transcription runs on-device using Apple's speech framework — audio is not sent to any server.",
        ],
      },
      {
        heading: "4. Third parties",
        body: [
          "Supabase (authentication & database, hosted in Singapore region), Paddle (payments, Merchant of Record), Vercel (hosting of this website). Each processes data under their own privacy terms as our processors.",
        ],
      },
      {
        heading: "5. Data retention & your rights",
        body: [
          "Account and subscription data are kept while your account exists. You may request access, correction, export, or deletion of your data at any time by emailing hello@screenstudio.example. Deleting your account removes your profile and subscription records.",
        ],
      },
      {
        heading: "6. Contact",
        body: ["Privacy questions: hello@screenstudio.example."],
      },
    ],
  },
  refunds: {
    title: "Refund Policy",
    updated: "July 6, 2026",
    sections: [
      {
        heading: "14-day money-back guarantee",
        body: [
          "If Screen Studio Pro isn't working out, contact us within 14 days of your first purchase and we'll refund it in full — no questions asked.",
        ],
      },
      {
        heading: "How to request a refund",
        body: [
          "Email hello@screenstudio.example from the address on your account, or reply to your Paddle receipt email. Refunds are processed by Paddle (our Merchant of Record) back to the original payment method, typically within 5–10 business days.",
        ],
      },
      {
        heading: "Renewals",
        body: [
          "Renewal charges can be refunded if requested within 14 days of the renewal date and the service was not substantially used in the new period. To avoid unwanted renewals, cancel anytime via “Manage billing” in the App — Pro stays active until the end of the paid period.",
        ],
      },
      {
        heading: "Statutory rights",
        body: [
          "Nothing in this policy limits statutory rights you may have under local consumer law (e.g. the EU 14-day withdrawal right).",
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    (Object.keys(DOCS) as DocId[]).map((doc) => ({ locale, doc }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const entry = DOCS[doc as DocId];
  return { title: entry ? `${entry.title} — Screen Studio` : "Legal — Screen Studio" };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale, doc } = await params;
  setRequestLocale(locale);
  const entry = DOCS[doc as DocId];
  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{entry.title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {entry.updated}</p>

      <div className="mt-12 space-y-10">
        {entry.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-medium">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
