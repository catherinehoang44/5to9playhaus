import type { Metadata } from "next";
import { FadeInSection } from "@/components/FadeInSection";
import { Hero } from "@/components/sections/Hero";
import { PrivacyPolicy } from "@/components/sections/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy & Refund Policy | 5-9 PLAY HAUS",
  description: "Privacy and refund policy for 5-9 PLAY HAUS polymer clay workshops.",
};

export default function PrivacyPage() {
  return (
    <div className="home-sections">
      <FadeInSection>
        <Hero variant="privacy" />
      </FadeInSection>
      <FadeInSection delay={120}>
        <PrivacyPolicy />
      </FadeInSection>
    </div>
  );
}
