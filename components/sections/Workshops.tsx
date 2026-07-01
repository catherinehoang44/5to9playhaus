import { CrispFillImage, CrispImage } from "@/components/CrispImage";
import { CtaLink } from "@/components/CtaLink";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";

/** Figma workshop image frame at 1242px: 642 × 390 */
const WORKSHOP_IMAGE_ASPECT = 642 / 390;

type WorkshopTemplateProps = {
  title: [string, string];
  description: React.ReactNode;
  cta: { href: string; label: string; icon: "calendar" | "mail" };
  image: string;
  alt: string;
};

function WorkshopTemplate({
  title,
  description,
  cta,
  image,
  alt,
}: WorkshopTemplateProps) {
  return (
    <article className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-[210px]">
      <div className="flex w-full max-w-[390px] shrink-0 flex-col gap-6">
        <h3 className="font-nav-title text-[42px] leading-none text-nav-brown">
          <span className="block">{title[0]}</span>
          <span className="block">{title[1]}</span>
        </h3>

        <CrispImage
          src={assets.workshopDivider}
          alt=""
          width={390}
          height={1}
          className="h-px w-full"
          aria-hidden
        />

        <div className="font-workshop-body text-[24px] font-medium leading-[1.2] tracking-[0.48px] text-nav-brown">
          {description}
        </div>

        <CtaLink {...cta} />
      </div>

      <div className="w-full min-w-0 flex-1">
        <div
          className="relative w-full overflow-hidden rounded-lg"
          style={{ aspectRatio: `${WORKSHOP_IMAGE_ASPECT}` }}
        >
          <CrispFillImage src={image} alt={alt} className="object-cover" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_0_0_5px_#7fa691]"
          />
        </div>
      </div>
    </article>
  );
}

const workshops: WorkshopTemplateProps[] = [
  {
    title: ["Cozy", "Workshops"],
    description:
      "These are reoccurring ticketed events! Come alone or with a friend for warm lighting, a cup of something hot, and everything you need to make your own clay figurine in 3 hours!",
    cta: { href: "#book", label: "Book Now", icon: "calendar" },
    image: assets.workshopCozy,
    alt: "People crafting at a cozy workshop table",
  },
  {
    title: ["Corporate", "Workshops"],
    description: (
      <>
        <p>I host private sessions for teams brought to your space.</p>
        <p className="mt-3">
          Great for onsites, offsites, client appreciation, holiday parties, or
          the quarterly &ldquo;we should do something together&rdquo; moment!
        </p>
      </>
    ),
    cta: { href: "#inquire", label: "Inquire", icon: "mail" },
    image: assets.workshopCorporate,
    alt: "Corporate team at a workshop",
  },
  {
    title: ["Private", "Bookings"],
    description:
      "Birthday parties, weddings, just-for-funzies, you name it! If you want a private clay figurine workshop for your group or event, please reach out!",
    cta: { href: "#inquire", label: "Inquire", icon: "mail" },
    image: assets.workshopPrivate,
    alt: "Large group posing together at a private workshop",
  },
];

export function Workshops() {
  return (
    <section className="bg-grid">
      <SiteContainer className="flex flex-col gap-16 px-4 sm:px-6 lg:gap-24">
        {workshops.map((workshop) => (
          <WorkshopTemplate key={workshop.title.join("-")} {...workshop} />
        ))}
      </SiteContainer>
    </section>
  );
}
