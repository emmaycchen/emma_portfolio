"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "next/image";
import Link from "next/link";
import { contactHref, worksHref } from "@/lib/links";
import { motion, useScroll, useTransform } from "framer-motion";

const skills = ["Growth Hack", "UX Design", "Front-end Web Development"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Video only on wider screens and when motion is allowed; otherwise the poster alone is shown.
  const [playVideo, setPlayVideo] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPlayVideo(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-svh min-h-[640px] items-center overflow-hidden text-white lg:h-[1024px]"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 scale-125"
        style={reduced ? undefined : { y }}
      >
        <Image
          src="/img/hero_poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {playVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/img/hero_poster.jpg"
          >
            <source src="/img/tree_sky.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/*
        DEVIATION FROM FIGMA (intentional, requested by Emma): the design has no overlay on the hero.
        This subtle dark gradient only improves legibility of the subtitle over bright video areas.
        To remove: delete this div.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-black/10"
      />

      <div className="relative z-10 px-6 md:px-16 lg:pl-[116px]">
        <h1 className="text-6xl font-medium leading-[0.9] md:text-8xl lg:text-[130px]">
          <span className="block">DESIGN</span>
          <span className="block">x GROWTH</span>
        </h1>

        <ul className="mt-5 flex flex-col items-start gap-1 text-base sm:flex-row sm:flex-wrap sm:items-center sm:gap-0 md:text-xl">
          {skills.map((s, i) => (
            <li key={s} className="flex items-center">
              {i > 0 && (
                <Image src="/img/dot.svg" alt="" width={24} height={24} className="mx-2 hidden sm:block" />
              )}
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-[88px] flex flex-wrap gap-4 font-afacad text-xl lg:pl-4">
          <Link
            href={contactHref}
            className="flex h-[46px] w-[137px] items-center justify-center rounded-[10px] bg-orange font-bold transition-transform hover:-translate-y-0.5"
          >
            Contact
          </Link>
          <Link
            href={worksHref}
            className="flex h-[46px] w-[149px] items-center justify-center rounded-[10px] border border-orange transition-transform hover:-translate-y-0.5"
          >
            My Works
          </Link>
        </div>
      </div>
    </section>
  );
}
