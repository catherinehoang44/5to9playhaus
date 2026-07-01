import { CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";
import { privacyBlocks, type PrivacyBlock } from "@/lib/privacy-policy";

function PolicyDivider() {
  return (
    <CrispImage
      src={assets.privacyDivider}
      alt=""
      width={1180}
      height={1}
      className="h-px w-full"
      aria-hidden
    />
  );
}

function PolicyBlock({ block, isFirst }: { block: PrivacyBlock; isFirst: boolean }) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          className={`font-workshop-body text-[36px] font-medium leading-none text-black ${
            isFirst ? "" : "mt-[150px]"
          }`}
        >
          {block.text}
        </h2>
      );
    case "divider":
      return (
        <div className="mt-6">
          <PolicyDivider />
        </div>
      );
    case "paragraph":
      return (
        <p className="mt-6 font-workshop-body text-[20px] font-medium leading-[1.2] tracking-[0.4px] text-black">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="mt-6 list-disc pl-9 font-workshop-body text-[20px] font-medium tracking-[0.4px] text-black">
          {block.items.map((item) => (
            <li key={item} className="leading-[1.2] [&+&]:mt-0">
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

export function PrivacyPolicy() {
  let headingIndex = 0;

  return (
    <section>
      <SiteContainer className="px-4 sm:px-6">
        <article className="mx-auto w-full max-w-[1180px]">
          {privacyBlocks.map((block, index) => {
            const isFirstHeading =
              block.type === "heading" && headingIndex++ === 0;

            return (
              <PolicyBlock
                key={`${block.type}-${index}`}
                block={block}
                isFirst={isFirstHeading}
              />
            );
          })}
        </article>
      </SiteContainer>
    </section>
  );
}
