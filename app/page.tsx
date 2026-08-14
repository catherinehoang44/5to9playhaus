import { FadeInSection } from "@/components/FadeInSection";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { EasySteps } from "@/components/sections/EasySteps";
import { Workshops } from "@/components/sections/Workshops";
import { Gallery } from "@/components/sections/Gallery";

const STAGGER_MS = 100;

export default function Home() {
  return (
    <div className="home-sections">
      <FadeInSection delay={STAGGER_MS * 0}>
        <Hero />
      </FadeInSection>
      <WhoWeAre />
      <FadeInSection delay={STAGGER_MS * 1}>
        <EasySteps />
      </FadeInSection>
      <FadeInSection delay={STAGGER_MS * 2}>
        <Workshops />
      </FadeInSection>
      <FadeInSection delay={STAGGER_MS * 3}>
        <Gallery />
      </FadeInSection>
    </div>
  );
}
