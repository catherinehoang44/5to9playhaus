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
      <SiteContainer className="flex min-w-0 flex-col gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-20 lg:flex-row lg:items-end lg:justify-start">
        <h2 className="font-nav-title text-heading-easy-steps font-bold uppercase leading-[0.9] text-[#fffaee] [-webkit-text-stroke:4px_#e57c62] [paint-order:stroke_fill] lg:vertical-label lg:shrink-0 lg:leading-[0.84]">
          <span className="lg:block">EASY </span>
          <span className="lg:block">STEPS</span>
        </h2>

        <div className="grid min-w-0 flex-1 grid-cols-3 items-start gap-3 sm:gap-6 md:gap-10">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
