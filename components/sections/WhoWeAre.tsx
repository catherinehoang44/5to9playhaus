"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedFigurine } from "@/components/AnimatedFigurine";
import { CrispFillImage, CrispImage } from "@/components/CrispImage";
import { SiteContainer } from "@/components/SiteContainer";
import { assets } from "@/lib/assets";

const BADGE_W = 776;
const BADGE_H = 913;

/** ID card content area — Figma 720.4 × 452 (6px border ⇒ 708.4 × 440 inner content). */
const CARD_W = 720.4;
const CARD_H = 452;
const CARD_BORDER = 6;
const CARD_INNER_W = CARD_W - CARD_BORDER * 2;
const CARD_INNER_H = CARD_H - CARD_BORDER * 2;
/** Text block max height within card (368.3px in Figma) */
const TEXT_MAX_HEIGHT_CARD = ((452 - (516 - 432.3)) / CARD_H) * 100;

/**
 * Figurine collage — Figma nodes 94:2420 (bg), 94:2421 (hand), 94:2431 (figurine).
 * Positions expressed as % of the card's inner content box (708.4 × 440) so the hand
 * lines up flush with the inner border on the left + bottom, the bg is a locked-ratio
 * rectangle, and the figurine sits centered in the bg (which puts it on the palm).
 */
const HAND_W = 302;
const HAND_H = 131.77;
const BG_LEFT = 38.4;
const BG_TOP = 54.18;
const BG_W = 286.38;
const BG_H = 335.99;
const BG_ASPECT = BG_W / BG_H;
/**
 * Figurine rotation container — frames are 417×640 transparent PNGs whose
 * yellow platforms are already padded to the horizontal center. The container
 * is centered on the Figma palm/bg center (~182), so the platform stays locked
 * on the hand as the silhouette rotates around it.
 */
const FIG_TOP = 87.82;
const FIG_H = 266;
const FIG_ASPECT = 440 / 640;
const FIG_W = FIG_H * FIG_ASPECT;
/** Palm / bg center from Figma (figurine + bg share this x). */
const FIG_CENTER_X = BG_LEFT + BG_W / 2;
const FIG_LEFT = FIG_CENTER_X - FIG_W / 2;

const STRAP_W = 127.4;
const STRAP_H = 268.5;
/** Strap texture (image 127) — 740 × 493 */
const STRAP_TEXTURE_W = 740;
const STRAP_TEXTURE_H = 493;

/** Figma badge frame layers — 94:2404 (accent) / 94:2409 (base), 8px apart */
const BADGE_FRAME_TOP = 324.6;
const BADGE_FRAME_H = 588.4;
const BADGE_BG_LAYER_OFFSET = 8;

type BadgePhase = "waiting" | "dropping" | "rest";

const DROP_FROM_Y = -54;
const DROP_FROM_ROT = -6.5;
const DROP_CATCH_AT = 0.4;
const DROP_DURATION_MS = 1420;

/** Gravity drop, then a damped lanyard spring + pendulum (sampled, like CSS linear() bounce kits). */
function hangingBadgeDropKeyframes(): Keyframe[] {
  const steps = 56;
  const frames: Keyframe[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let y: number;
    let rot: number;

    if (t <= DROP_CATCH_AT) {
      const u = t / DROP_CATCH_AT;
      const fall = u * u;
      y = DROP_FROM_Y * (1 - fall);
      rot = DROP_FROM_ROT + (1.2 - DROP_FROM_ROT) * fall;
    } else {
      const u = (t - DROP_CATCH_AT) / (1 - DROP_CATCH_AT);
      const dampY = Math.exp(-4.2 * u);
      const dampR = Math.exp(-1.75 * u);
      y = 0.62 * dampY * Math.sin(Math.PI * 2 * 1.48 * u);
      rot =
        dampR *
        (1.2 * Math.cos(Math.PI * 2 * 1.05 * u) +
          6.4 * Math.sin(Math.PI * 2 * 1.05 * u));
    }

    frames.push({
      offset: Math.round(t * 1000) / 1000,
      opacity: t <= DROP_CATCH_AT ? Math.min(1, t / DROP_CATCH_AT / 0.85) : 1,
      transform: `translate3d(0, ${y.toFixed(3)}%, 0) rotate(${rot.toFixed(3)}deg)`,
    });
  }

  return frames;
}

function BadgeHanging() {
  return (
    <>
      {/* Badge bg — FF9B8A accent (8px higher) under CB513C base */}
      <div
        className="absolute left-0 z-0 w-full"
        style={{
          top: `${((BADGE_FRAME_TOP - BADGE_BG_LAYER_OFFSET) / BADGE_H) * 100}%`,
          height: `${(BADGE_FRAME_H / BADGE_H) * 100}%`,
        }}
      >
        <CrispImage
          src={assets.whoWeAreBadgeFrameAccent}
          alt=""
          width={776}
          height={588}
          className="h-full w-full"
          aria-hidden
        />
      </div>
      <div
        className="absolute left-0 z-[1] w-full"
        style={{
          top: `${(BADGE_FRAME_TOP / BADGE_H) * 100}%`,
          height: `${(BADGE_FRAME_H / BADGE_H) * 100}%`,
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
        className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-[6px] border-t-[3px] border-[#e68925] bg-[#c06300]"
        style={{
          top: `${(256.3 / 913) * 100}%`,
          width: `${(142.6 / 776) * 100}%`,
          height: `${(110.7 / 913) * 100}%`,
        }}
      >
        <div
          className="rounded-[6px] bg-[#983b00]"
          style={{ width: "67%", height: "9.6%" }}
        />
      </div>

      {/* ID card content */}
      <div
        className="badge-card-glaze absolute z-20 overflow-hidden rounded-[6px] border-[6px] border-[#901c08] bg-[#E6BA8C]"
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
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-multiply"
          aria-hidden
        />
        <div className="badge-card-grain" aria-hidden />

        <div
          className="absolute overflow-hidden rounded-[6px] bg-[#8e1c08]"
          style={{
            left: `${(BG_LEFT / CARD_INNER_W) * 100}%`,
            top: `${(BG_TOP / CARD_INNER_H) * 100}%`,
            width: `${(BG_W / CARD_INNER_W) * 100}%`,
            aspectRatio: `${BG_ASPECT}`,
          }}
          aria-hidden
        >
          <CrispImage
            src={assets.whoWeAreBadgeTexture}
            alt=""
            width={750}
            height={1143}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-multiply"
          />
          <div className="badge-card-grain" />
        </div>

        <CrispImage
          src={assets.whoWeAreHand}
          alt=""
          width={906}
          height={396}
          className="pointer-events-none absolute left-0 bottom-0 max-w-none"
          style={{
            width: `${(HAND_W / CARD_INNER_W) * 100}%`,
            height: `${(HAND_H / CARD_INNER_H) * 100}%`,
          }}
          aria-hidden
        />

        <AnimatedFigurine
          style={{
            left: `${(FIG_LEFT / CARD_INNER_W) * 100}%`,
            top: `${(FIG_TOP / CARD_INNER_H) * 100}%`,
            width: `${(FIG_W / CARD_INNER_W) * 100}%`,
            height: `${(FIG_H / CARD_INNER_H) * 100}%`,
          }}
        />

        <div
          className="absolute top-1/2 flex -translate-y-1/2 flex-col overflow-hidden text-[#563529]"
          style={{
            left: `${((390 - 27.6) / CARD_W) * 100}%`,
            width: `${(302 / CARD_W) * 100}%`,
            maxHeight: `${TEXT_MAX_HEIGHT_CARD}%`,
            fontSize:
              "calc(var(--badge-bio-font-size) / var(--badge-bio-badge-height) * 100cqh)",
          }}
        >
          <p className="font-nav-title text-[0.48em] uppercase leading-none tracking-[0.22em] text-[#8e1c08]">
            Host
          </p>
          <p className="font-nav-title mt-[0.08em] text-[2.35em] uppercase leading-[0.8] tracking-[0.02em] text-[#8e1c08]">
            Diem
          </p>
          <p className="mt-[0.28em] font-nav-cta text-description font-bold italic leading-[1.2] tracking-[-0.04em]">
            Curator of clay &amp; whimsy
          </p>
          <div
            className="my-[0.45em] w-[2.6em] rounded-full bg-[#8e1c08]/40"
            style={{ height: "var(--divider-thickness)" }}
            aria-hidden
          />
          <div className="flex flex-col gap-[0.45em] font-workshop-body text-description font-medium leading-[1.2] tracking-[0.36px]">
            <p>
              Every workshop I host is built around the feeling of slowing down
              without the pressure to make anything &ldquo;great&rdquo;.
            </p>
            <p>I hope I can make these few hours feel like yours!</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Badge() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<BadgePhase>("waiting");

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let played = false;
    let animation: Animation | null = null;

    const play = () => {
      if (played) return;
      played = true;

      if (reduced) {
        setPhase("rest");
        return;
      }

      setPhase("dropping");
      animation = track.animate(hangingBadgeDropKeyframes(), {
        duration: DROP_DURATION_MS,
        easing: "linear",
        fill: "forwards",
      });

      animation.finished
        .then(() => {
          animation?.commitStyles();
          animation?.cancel();
          track.style.transform = "none";
          track.style.opacity = "1";
          setPhase("rest");
        })
        .catch(() => {
          setPhase("rest");
        });
    };

    const shouldReveal = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const inStage = rect.top < vh * 0.72 && rect.bottom > vh * 0.12;
      if (!inStage) return false;
      // Sitting at the top of the page: wait until the user actually scrolls
      // so the drop isn't already finished off-screen / below the hero.
      if (window.scrollY < 8 && rect.top > 96) return false;
      return true;
    };

    const check = () => {
      if (shouldReveal()) play();
    };

    const observer = new IntersectionObserver(check, {
      threshold: [0, 0.08, 0.16, 0.28, 0.4, 0.55, 0.7],
    });
    observer.observe(root);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      animation?.cancel();
    };
  }, []);

  const waiting = phase === "waiting";
  const dropping = phase === "dropping";

  return (
    <div
      ref={rootRef}
      className={`relative -mt-[10px] w-full max-w-[776px] overflow-visible${
        waiting ? " badge-is-waiting" : ""
      }${waiting || dropping ? " pointer-events-none" : ""}`}
      style={{ aspectRatio: "776 / 913" }}
    >
      <div
        ref={trackRef}
        className="badge-drop-track absolute inset-0"
        aria-hidden={waiting || dropping}
      >
        <div className="badge-tilt absolute inset-0">
          <div
            className="absolute left-1/2 z-10 -translate-x-1/2 overflow-hidden bg-[#e60000]"
            style={{
              top: "-40%",
              width: `${(STRAP_W / BADGE_W) * 100}%`,
              height: `${((STRAP_H / BADGE_H) * 100) + 40}%`,
            }}
          >
            <CrispFillImage
              src={assets.whoWeAreStrapTexture}
              alt=""
              width={STRAP_TEXTURE_W}
              height={STRAP_TEXTURE_H}
              className="pointer-events-none max-w-none object-cover mix-blend-color-burn opacity-20"
              aria-hidden
            />
          </div>
          <BadgeHanging />
        </div>
      </div>
    </div>
  );
}

export function WhoWeAre() {
  return (
    <section className="bg-grid -mt-[var(--section-gap)] overflow-visible [clip-path:inset(0_-100vw_-100vh_-100vw)]">
      <SiteContainer className="relative px-4 pb-[var(--who-we-are-section-padding)] sm:px-6">
        <h2 className="sr-only">WHO WE ARE</h2>

        <div className="flex w-full justify-center">
          <Badge />
        </div>
      </SiteContainer>
    </section>
  );
}
