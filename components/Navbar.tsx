"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLenisRef } from "@/components/SmoothScroll";
import { contactHref, homeHref, pageLinks } from "@/lib/links";

const MENU_ID = "mobile-menu";
const SHOW_AT_TOP = 80; // px: always visible above this scroll position
const NAV_HEIGHT = 100; // px: must be scrolled past the bar before it can hide
const DIRECTION_THRESHOLD = 9; // px of movement needed to count as a direction change

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  // New page: always start visible (state reset during render, keyed on the route).
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setHidden(false);
  }
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lenisRef = useLenisRef();
  const reduced = !!useReducedMotion();

  // Soft shadow once the hero (or, on pages without one, a few px) is scrolled past.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const hero = document.getElementById("top");
    const threshold = hero ? Math.max(hero.offsetHeight - 120, 0) : 8;
    setScrolled(y > threshold);

    // Hide on scroll down, show on scroll up. Direction only flips after a few px (no jitter).
    if (y < SHOW_AT_TOP) {
      setHidden(false);
      lastY.current = y;
      return;
    }
    const delta = y - lastY.current;
    if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
    lastY.current = y;
    setHidden(delta > 0 && y > NAV_HEIGHT);
  });



  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Pause Lenis while the menu is open.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (open) lenis?.stop();
    return () => lenis?.start();
  }, [open, lenisRef]);

  // Esc, click outside, and leaving the mobile breakpoint all close the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close(true);
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close();
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && close();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  const bar = "absolute left-0 h-0.5 w-full rounded bg-navy transition-all duration-300 motion-reduce:transition-none";

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-4 top-4 z-50 transition-transform duration-300 motion-reduce:transition-none md:top-6 lg:inset-x-[70px] lg:top-[41px] ${
        hidden && !open && !reduced
          ? "-translate-y-[calc(100%+100px)] has-[:focus-visible]:translate-y-0"
          : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Main"
        className={`flex h-[54px] items-center justify-between rounded-full bg-white pl-5 pr-2 transition-shadow duration-300 motion-reduce:transition-none lg:pr-6 ${
          scrolled || open ? "shadow-[0_6px_20px_rgba(1,28,37,0.18)]" : "shadow-none"
        }`}
      >
        <Link href={homeHref} aria-label="Emma Chen | Design × Growth — home" className="rounded-full">
          <Image
            src="/img/logo_trans.png"
            alt="Emma Chen | Design × Growth"
            width={532}
            height={90}
            sizes="254px"
            priority
            className="h-8 w-[190px] object-contain object-left sm:h-[45px] sm:w-[254px]"
          />
        </Link>

        <div className="flex items-center gap-10 font-afacad text-xl text-black">
          <ul className="hidden items-center gap-8 lg:flex">
            {pageLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-opacity hover:opacity-60">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={contactHref}
            className="hidden h-[34px] w-[137px] items-center justify-center rounded-full bg-orange font-bold text-white transition-transform hover:-translate-y-0.5 lg:flex"
          >
            Contact
          </Link>

          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((o) => !o)}
            className="relative size-11 rounded-full lg:hidden"
          >
            <span aria-hidden="true" className="absolute left-3 top-1/2 block h-5 w-5 -translate-y-1/2">
              <span className={`${bar} ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"}`} />
              <span className={`${bar} top-1/2 -translate-y-1/2 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`${bar} ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id={MENU_ID}
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
            transition={reduced ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
            className="mt-2 rounded-[30px] bg-white p-6 shadow-[0_10px_30px_rgba(1,28,37,0.2)] lg:hidden"
          >
            <ul className="flex flex-col gap-1 font-afacad text-xl text-black">
              {pageLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={() => close()} className="block rounded-xl px-2 py-3">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={contactHref}
              onClick={() => close()}
              className="mt-4 flex h-[44px] w-full items-center justify-center rounded-full bg-orange font-afacad text-xl font-bold text-white"
            >
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
