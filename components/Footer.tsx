import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { contactHref, homeHref, pageLinks, socialLinks } from "@/lib/links";

const icons: Record<(typeof socialLinks)[number]["label"], string> = {
  Email: "/img/email.svg",
  LinkedIn: "/img/linkedin.svg",
  GitHub: "/img/github.svg",
  WhatsApp: "/img/whatsapp.svg",
};

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-cream">
      <div className="mx-auto flex min-h-[560px] max-w-[1440px] flex-col justify-between gap-16 px-6 pb-12 pt-16 md:px-10 lg:min-h-[652px] lg:px-[66px] lg:pb-[53px] lg:pt-[116px]">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
          <Reveal>
            <h2 className="max-w-[900px] text-5xl leading-[normal] md:text-8xl lg:text-8xl desk:text-[120px]">
              READY TO GET STARTED?
            </h2>
          </Reveal>
          <Link
            href={contactHref}
            className="flex h-[34px] w-[137px] shrink-0 items-center justify-center rounded-full bg-orange font-afacad text-xl font-bold text-white transition-transform hover:-translate-y-0.5 lg:mt-[29px]"
          >
            Contact
          </Link>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end">
          <ul className="flex gap-3 lg:gap-[17px]">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.external ? `${s.label} (opens in a new tab)` : s.label}
                  {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex size-16 items-center justify-center rounded-[24px] border border-cream transition duration-300 hover:-translate-y-1 hover:bg-cream/10 lg:size-20 lg:rounded-[30px]"
                >
                  {/* currentColor svgs: paint them cream through a mask so the files stay untouched */}
                  <span
                    aria-hidden="true"
                    className="size-8 bg-cream lg:size-10"
                    style={{
                      mask: `url(${icons[s.label]}) center / contain no-repeat`,
                      WebkitMask: `url(${icons[s.label]}) center / contain no-repeat`,
                    }}
                  />
                </a>
              </li>
            ))}
          </ul>

          <nav aria-label="Footer" className="flex items-center gap-6 text-lg lg:ml-[178px] lg:pb-[2px]">
            <span className="text-orange">PAGES</span>
            <ul className="flex gap-8">
              {pageLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white transition-opacity hover:opacity-60">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href={homeHref} aria-label="Emma Chen | Design × Growth — home" className="lg:ml-auto lg:-mr-[17px]">
            {/* logo_trans.png is dark artwork; invert it to read on the dark footer */}
            <Image
              src="/img/logo_trans.png"
              alt="Emma Chen | Design × Growth"
              width={532}
              height={90}
              sizes="248px"
              className="h-[47px] w-[248px] object-contain object-left brightness-0 invert"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
