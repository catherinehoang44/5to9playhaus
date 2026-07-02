import { CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";

/** Figma step image frame */
const STEP_IMAGE_ASPECT = 280 / 390;

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
    <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
      <p className="font-nav-cta text-description font-bold leading-none text-[#d8c648]">
        {number}. {label}
      </p>
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{ aspectRatio: STEP_IMAGE_ASPECT }}
      >
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
    <section className="overflow-x-clip bg-[#cb513c]">
      <SiteContainer className="flex min-w-0 items-end justify-start gap-6 px-4 py-16 sm:gap-10 sm:px-6 sm:py-20">
        <h2 className="vertical-label shrink-0 font-nav-title text-heading-easy-steps font-bold leading-[0.84] tracking-[0.04em] text-[#fffaee] [-webkit-text-stroke:4px_#e57c62] [paint-order:stroke_fill]">
          <span className="block">EASY</span>
          <span className="block">STEPS</span>
        </h2>

        <div className="flex min-w-0 flex-1 flex-col items-stretch gap-8 sm:gap-10 md:flex-row md:items-start">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
