"use client";

import Image from "next/image";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Reveal from "@/components/ui/Reveal";
import StackingScroll from "@/components/ui/StackingScroll";
import StackedDeck from "@/components/ui/StackedDeck";

// Bottom → top. The last one (yoga.jpg) ends on top of the pile.
const photos = [
  { src: "/img/market_JP.jpg", alt: "A busy street market in Japan" },
  { src: "/img/market_FR.jpg", alt: "A French market stall stacked with asparagus, strawberries and watermelon" },
  { src: "/img/bar_SH.jpg", alt: "A bar in Shanghai" },
  { src: "/img/flower_bike.jpg", alt: "A bicycle loaded with flowers" },
  { src: "/img/foodstand.jpg", alt: "A street food stand" },
  { src: "/img/yoga.jpg", alt: "A woman sitting cross-legged on a rug, finishing yoga exercise" },
];

/**
 * Resting tilt (deg) per photo, bottom → top. The top 4 use Figma's rotations
 * (bar_SH picture-4, flower_bike picture-3, foodstand picture-2, yoga picture-1);
 * the 2 extra photos at the bottom follow the same alternating style.
 */
const tilts = [-8, 6, -4.71, 2.59, -10.34, 4.39];

const clients = [
  { title: "Small B2B firms", body: "Suppliers and agencies that need a clear route for enquiries." },
  {
    title: "Entrepreneurs",
    body: "Individuals who want to test out their business idea with cost-efficient and quick online presence",
  },
  { title: "Service owners", body: "Clinics, studios, tutors and consultants who want more booked calls." },
  {
    title: "SME brand e-commerce",
    body: "Retailers targeting overseas markets and looking for a growth strategy built on data-driven experiments.",
  },
];

function ClientList({ className }: { className: string }) {
  return (
    <ul className={`${className} gap-x-[75px] desk:gap-x-[calc(75*var(--px))] gap-y-10 desk:grid-cols-[calc(255*var(--px))_calc(305*var(--px))] desk:gap-y-[calc(80*var(--px))]`}>
      {clients.map((c, i) => (
        <li key={c.title} className={i % 2 === 1 ? "desk:col-start-2" : ""}>
          <Reveal delay={0.08 * i}>
            <div className="w-full max-w-[255px] desk:max-w-[calc(255*var(--px))] border-t-[3px] border-navy" />
            <div className={`pt-[19px] desk:pt-[calc(19*var(--px))] ${i % 2 === 1 ? "desk:pl-[calc(18*var(--px))]" : ""}`}>
              <h3 className="text-2xl leading-[normal] text-black desk:text-[length:var(--fs-24)]">{c.title}</h3>
              <p className="mt-[13px] max-w-[287px] text-base leading-[normal] text-black desk:text-[length:var(--fs-16)] desk:mt-[calc(13*var(--px))] desk:max-w-[calc(287*var(--px))]">{c.body}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[30px] shadow-[0_18px_40px_-18px_rgba(5,61,94,0.45)]">
      <Image src={src} alt={alt} fill sizes="(min-width: 1440px) 542px, (min-width: 1024px) 38vw, 80vw" className="object-cover" />
    </div>
  );
}

export default function WhoIWorkWith() {
  const reduced = !!useReducedMotion();

  return (
    <>
      <StackingScroll
        id="who-i-work-with"
        labelledBy="who-title"
        heightVh={500}
        className="bg-cream"
        stageClassName="@container mx-auto max-w-[1440px]"
      >
        {(progress, isReduced) => (
          <div
            className={`grid items-center gap-8 px-6 md:px-10 desk:grid-cols-2 desk:gap-0 desk:px-0 ${
              isReduced ? "py-16 desk:py-[calc(100*var(--px))]" : "h-full content-center desk:content-normal"
            }`}
          >
            {/* Photos: bottom of the page flow on mobile, left column on desktop */}
            <div className="order-2 desk:order-1 desk:pl-[calc(68*var(--px))]">
              {isReduced ? (
                <ul className="grid grid-cols-2 gap-4 desk:max-w-[calc(600*var(--px))]">
                  {photos.map((p) => (
                    <li key={p.src} className="relative aspect-[542/616]">
                      <Photo {...p} />
                    </li>
                  ))}
                </ul>
              ) : (
                <StackedDeck
                  progress={progress}
                  tilts={tilts}
                  cards={photos.map((p) => (
                    <Photo key={p.src} {...p} />
                  ))}
                  className="mx-auto h-[min(60vh,420px)] w-[min(78vw,calc(60vh*542/616),370px)] desk:mx-0 desk:h-[min(calc(616*var(--px)),74vh)] desk:w-[min(calc(542*var(--px)),calc(74vh*542/616))]"
                />
              )}
            </div>

            <div className="order-1 desk:order-2 desk:pl-[calc(13*var(--px))]">
              <Reveal>
                <h2 id="who-title" className="text-4xl leading-[normal] text-navy md:text-[45px] desk:text-[length:var(--fs-45)]">
                  Who I Work With
                </h2>
              </Reveal>
              {/* Desktop: next to the pinned photos. Mobile: shown below the section instead. */}
              <ClientList className={`mt-[64px] desk:mt-[calc(64*var(--px))] ${isReduced ? "grid sm:grid-cols-2" : "hidden desk:grid"}`} />
            </div>
          </div>
        )}
      </StackingScroll>

      {!reduced && (
        <div className="bg-cream px-6 pb-16 pt-8 md:px-10 desk:hidden">
          <ClientList className="grid sm:grid-cols-2" />
        </div>
      )}
    </>
  );
}
