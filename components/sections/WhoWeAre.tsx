import { CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";

/** Figma who-we-are frame */
const SECTION_W = 1440;
const SECTION_H = 995;

function Badge() {
  return (
    <div
      className="relative w-full max-w-[776px]"
      style={{ aspectRatio: "776 / 913" }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-[#e60000]"
        style={{
          top: 0,
          width: `${(127.4 / 776) * 100}%`,
          height: `${(268.5 / 913) * 100}%`,
        }}
      />

      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[6px] border-t-[3px] border-[#e68925] bg-[#c06300]"
        style={{
          top: `${(256.3 / 913) * 100}%`,
          width: `${(142.6 / 776) * 100}%`,
          height: `${(110.7 / 913) * 100}%`,
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[6px] bg-[#983b00]"
          style={{ bottom: "18%", width: "67%", height: "9.6%" }}
        />
      </div>

      <div
        className="absolute left-0 w-full"
        style={{
          top: `${(324.6 / 913) * 100}%`,
          height: `${(588.4 / 913) * 100}%`,
        }}
      >
        <CrispImage
          src={assets.whoWeAreBadgeFrame}
          alt=""
          width={776}
          height={588}
          className="h-full w-full"
          aria-hidden
        />
      </div>

      <div
        className="absolute overflow-hidden rounded-[6px] border-[6px] border-[#901c08] bg-[#fffaee]"
        style={{
          left: `${(27.6 / 776) * 100}%`,
          top: `${(432.3 / 913) * 100}%`,
          width: `${(720.4 / 776) * 100}%`,
          height: `${(452 / 913) * 100}%`,
        }}
      >
        <CrispImage
          src={assets.whoWeAreBadgeTexture}
          alt=""
          width={750}
          height={1143}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-multiply"
          aria-hidden
        />

        <div
          className="absolute overflow-hidden rounded-[4px] bg-[#8e1c08]"
          style={{
            left: `${((68.8 - 27.6) / 720.4) * 100}%`,
            top: `${((493.4 - 432.3) / 452) * 100}%`,
            width: `${(286.4 / 720.4) * 100}%`,
            height: `${(336 / 452) * 100}%`,
          }}
        >
          <CrispImage
            src={assets.whoWeAreFigurine}
            alt="Hand holding a finished clay figurine"
            width={150}
            height={266}
            className="absolute left-1/2 top-1/2 h-[115%] w-auto max-w-none -translate-x-1/2 -translate-y-[45%]"
          />
        </div>

        <div
          className="font-who-we-are absolute text-[#563529] tracking-[1px]"
          style={{
            left: `${((390 - 27.6) / 720.4) * 100}%`,
            top: `${((516 - 432.3) / 452) * 100}%`,
            width: `${(302 / 720.4) * 100}%`,
            fontSize: "clamp(1rem, 2.6vw, 1.625rem)",
            lineHeight: 1.05,
          }}
        >
          <p className="mb-3">
            Hi, I&apos;m your host,{" "}
            <span className="font-bold text-[#8e1c08]">Diem</span>!
          </p>
          <p className="mb-3">
            Every workshop I host is built around the feeling of slowing down
            without the pressure to make anything &ldquo;great&rdquo;.
          </p>
          <p>I hope I can make these few hours feel like yours!</p>
        </div>
      </div>
    </div>
  );
}

export function WhoWeAre() {
  return (
    <section className="bg-grid overflow-x-clip overflow-y-visible">
      <SiteContainer
        className="relative flex items-start justify-center px-4 pl-14 sm:px-6 sm:pl-16"
        style={{ aspectRatio: `${SECTION_W} / ${SECTION_H}` }}
      >
        <h2 className="vertical-label absolute top-1/2 left-4 -translate-y-1/2 font-nav-title text-[82px] font-bold leading-none tracking-[13.12px] whitespace-nowrap text-[#e57c62] sm:left-6">
          WHO WE ARE
        </h2>

        <div className="flex w-full justify-center self-start">
          <Badge />
        </div>
      </SiteContainer>
    </section>
  );
}
