import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { EasySteps } from "@/components/sections/EasySteps";
import { Workshops } from "@/components/sections/Workshops";
import { Gallery } from "@/components/sections/Gallery";

export default function Home() {
  return (
    <div className="home-sections">
      <Hero />
      <WhoWeAre />
      <EasySteps />
      <Workshops />
      <Gallery />
    </div>
  );
}
