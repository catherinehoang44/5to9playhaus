import type { Metadata } from "next";
import { SiteContainer } from "@/components/SiteContainer";

export const metadata: Metadata = {
  title: "Privacy & Refund Policy | 5-9 PLAY HAUS",
  description: "Privacy and refund policy for 5-9 PLAY HAUS polymer clay workshops.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-grid min-h-[60vh]">
      <SiteContainer className="px-4 py-12 sm:px-6 sm:py-16">
        <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-terracotta sm:text-4xl">
          Privacy &amp; Refund Policy
        </h1>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold text-terracotta">
            Privacy Policy
          </h2>
          <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-brown-dark sm:text-base">
            <p>
              This section will contain the full privacy policy for 5-9 PLAY
              HAUS. Content to be added when final copy is provided.
            </p>
            <p>
              We respect your privacy and are committed to protecting any
              personal information you share with us when booking or inquiring
              about workshops.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold text-terracotta">
            Refund Policy
          </h2>
          <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-brown-dark sm:text-base">
            <p>
              This section will contain the full refund and cancellation policy
              for workshop bookings. Content to be added when final copy is
              provided.
            </p>
            <p>
              Details on ticket refunds, rescheduling, and cancellation windows
              will be listed here.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold text-terracotta">
            Contact
          </h2>
          <div className="mt-4 font-body text-sm leading-relaxed text-brown-dark sm:text-base">
            <p>
              For questions about this policy, please reach out via the contact
              link in the footer. Contact details to be added.
            </p>
          </div>
        </section>
        </article>
      </SiteContainer>
    </div>
  );
}
