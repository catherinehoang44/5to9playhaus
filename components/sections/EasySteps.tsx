import { CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";

const steps = [
  {
    number: 1,
    label: "Sculpt",
    image: assets.stepSculpt,
    alt: "Hands sculpting clay with a tool",
    objectPosition: "50% 25%",
  },
  {
    number: 2,
    label: "Bake",
    image: assets.stepBake,
    alt: "Clay figurines on foil ready to bake",
    objectPosition: "40% 35%",
  },
  {
    number: 3,
    label: "Paint",
    image: assets.stepPaint,
    alt: "Hand painting a clay figurine",
    objectPosition: "50% 40%",
  },
] as const;

function StepCard({
  number,
  label,
  image,
  alt,
  objectPosition,
}: (typeof steps)[number]) {
  return (
    <div className="flex w-[280px] max-w-full shrink-0 flex-col gap-4">
      <p className="font-nav-cta text-[36px] font-bold leading-none text-[#d8c648]">
        {number}. {label}
      </p>
      <div className="relative h-[390px] w-[280px] max-w-full overflow-hidden rounded-lg">
        <CrispImage
          src={image}
          alt={alt}
          width={280}
          height={390}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_0_0_5px_#d8c648]"
        />
      </div>
    </div>
  );
}

export function EasySteps() {
  return (
    <section className="bg-[#cb513c]">
      <SiteContainer className="flex min-h-[572px] items-center justify-start gap-10 px-4 sm:gap-12 sm:px-6">
        <h2 className="vertical-label shrink-0 self-center font-nav-title text-[clamp(3rem,6.7vw,6rem)] font-bold leading-[0.84] tracking-[0.04em] text-[#fffaee] [-webkit-text-stroke:4px_#e57c62] [paint-order:stroke_fill]">
          <span className="block">EASY</span>
          <span className="block">STEPS</span>
        </h2>

        <div className="flex flex-col items-start justify-start gap-10 md:flex-row md:gap-10">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
