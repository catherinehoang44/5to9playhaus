import { CrispFillImage } from "@/components/CrispImage";
import { CtaLink } from "@/components/CtaLink";
import { WaveDivider } from "@/components/ScallopEdge";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";
import { BOOK_NOW_URL, CONTACT_MAILTO } from "@/lib/contact";

/** Figma workshop image frame at 1242px: 642 × 390 */
const WORKSHOP_IMAGE_ASPECT = 642 / 390;

const workshops: WorkshopTemplateProps[] = [
  {
    title: ["Cozy", "Workshops"],
    description:
      "These are reoccurring ticketed events! Come alone or with a friend for warm lighting, a cup of something hot, and everything you need to make your own clay figurine in 3 hours!",
    cta: { href: BOOK_NOW_URL, label: "Book Now", icon: "calendar" },
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
    cta: { href: CONTACT_MAILTO, label: "Inquire", icon: "mail" },
    image: assets.workshopCorporate,
    alt: "Corporate team at a workshop",
  },
  {
    title: ["Private", "Bookings"],
    description:
      "Birthday parties, weddings, just-for-funzies, you name it! If you want a private clay figurine workshop for your group or event, please reach out!",
    cta: { href: CONTACT_MAILTO, label: "Inquire", icon: "mail" },
    image: assets.workshopPrivate,
    alt: "Large group posing together at a private workshop",
  },
];

const workshopTitleLines = [
  ...new Set(workshops.flatMap((workshop) => workshop.title)),
];

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
    <article className="flex w-full flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-[210px]">
      <div className="flex w-full flex-col items-start gap-6 lg:max-w-[390px] lg:shrink-0">
        <div className="flex w-fit max-w-full flex-col items-stretch gap-6">
          <div>
            <div
              className="h-0 overflow-hidden whitespace-nowrap font-nav-title text-[length:var(--heading-workshop-title-size)] font-bold uppercase leading-none md:text-[58px]"
              aria-hidden
            >
              {workshopTitleLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            <h3 className="text-left font-nav-title text-[length:var(--heading-workshop-title-size)] font-bold uppercase leading-none text-nav-brown md:text-[58px]">
              <span className="block">{title[0]}</span>
              <span className="block">{title[1]}</span>
            </h3>
          </div>
          <WaveDivider className="w-full" color="#563529" />
        </div>

        <div className="w-full text-left font-workshop-body text-description font-medium leading-[1.2] tracking-[0.36px] text-nav-brown">
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

export function Workshops() {
  return (
    <section className="bg-grid pb-12 md:pb-16 lg:pb-0">
      <SiteContainer className="flex flex-col gap-16 px-4 sm:px-6 lg:gap-24">
        {workshops.map((workshop) => (
          <WorkshopTemplate key={workshop.title.join("-")} {...workshop} />
        ))}
      </SiteContainer>
    </section>
  );
}
