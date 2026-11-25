import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

type Service = {
  title: string;
  body: string;
  pills: string[];
  /** Figma aligns each card's pills differently; keep that per card on desktop. */
  pillsAlign: string;
  size: string;
};

const ux: Service = {
  title: "User Experience Design",
  body: "Creating intuitive, user-friendly app and website interfaces tailored to your audience, backed by data-driven UX metrics to ensure every interaction delivers value",
  pills: ["Design System", "UX Research", "Prototype"],
  pillsAlign: "desk:justify-start desk:pl-[calc(17*var(--px))]",
  size: "desk:min-h-[calc(244*var(--px))] desk:max-w-[calc(392*var(--px))]",
};
const ai: Service = {
  title: "AI Automation",
  body: "Get your time back. I find the repetitive tasks eating your day, like replies, bookings, and invoices, and automate them with affordable AI tools, no tech skills needed, so you can focus on serving customers and growing your business.",
  pills: ["Workflow", "Chatbots", "Claude"],
  pillsAlign: "desk:justify-end desk:pr-[calc(12*var(--px))]",
  size: "desk:min-h-[calc(242*var(--px))]",
};
const growth: Service = {
  title: "Growth Consulting",
  body: "Not sure why visitors and followers aren't becoming customers?  I help small businesses find the gaps in their website and social media, testing small, low-cost improvements that turn followers and visitors into steady customers.",
  pills: ["Growth strategy", "Funnel audit", "Experiments"],
  pillsAlign: "desk:justify-end desk:pr-[calc(45*var(--px))]",
  size: "desk:min-h-[calc(238*var(--px))]",
};
const frontend: Service = {
  title: "Front-end Web Development",
  body: "A great website makes it effortless for customers to understand what you do and buy from you. I build custom, user-friendly websites matched to your budget and business stage—so you get a site that looks professional, loads fast, and actually drives sales.",
  pills: ["HTML/CSS/JS", "Next.js", "React", "WordPress"],
  pillsAlign: "desk:justify-end desk:pr-[calc(33*var(--px))]",
  size: "desk:min-h-[calc(239*var(--px))]",
};

function ServiceCard({ s, delay = 0 }: { s: Service; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`flex h-full flex-col rounded-[10px] border-[3px] border-orange px-[31px] pb-[23px] pt-7 desk:px-[calc(31*var(--px))] desk:pb-[calc(23*var(--px))] desk:pt-[calc(28*var(--px))] text-cream shadow-[2px_4px_5.8px_3px_rgba(255,90,52,0.4)] transition duration-300 hover:-translate-y-1 hover:shadow-[2px_8px_14px_4px_rgba(255,90,52,0.55)] ${s.size}`}
      >
        <h3 className="text-2xl leading-6 desk:text-[length:var(--fs-24)]">{s.title}</h3>
        <p className="mt-4 max-w-[529px] text-base leading-6 desk:text-[length:var(--fs-16)] desk:max-w-[calc(529*var(--px))]">{s.body}</p>
        <ul className={`mt-6 flex flex-wrap gap-x-3 gap-y-2 pt-0 desk:mt-auto desk:pt-[clamp(0px,calc(1440px_-_100cqw),16px)] ${s.pillsAlign}`}>
          {s.pills.map((p) => (
            <li key={p} className="inline-flex h-[26px] items-center rounded-full bg-navy-deep px-[14px] text-xs text-white">
              {p}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="@container bg-navy">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 desk:px-[calc(66*var(--px))] desk:pb-[calc(129*var(--px))] desk:pt-[calc(116*var(--px))]">
        <div className="grid gap-6 md:grid-cols-2 desk:grid-cols-[calc(392*var(--px))_1fr_calc(426*var(--px))] desk:gap-x-0">
          <Reveal className="md:col-span-2 desk:order-2 desk:col-span-1 desk:px-[calc(59*var(--px))] desk:pt-[calc(9*var(--px))]">
            <SectionLabel onDark>Services</SectionLabel>
            <h2 id="services-title" className="mt-[37px] desk:mt-[calc(37*var(--px))] text-4xl leading-[normal] text-cream md:text-[45px] desk:text-[length:var(--fs-45)]">
              How I Can Help
            </h2>
            <p className="mt-[18px] max-w-[440px] text-base leading-6 text-cream desk:text-[length:var(--fs-16)] desk:mt-[calc(18*var(--px))] desk:max-w-[calc(440*var(--px))]">
              I offer flexible, affordable services designed to help you overcome these hurdles and grow your business
              online:
            </p>
          </Reveal>
          <div className="desk:order-1">
            <ServiceCard s={ux} />
          </div>
          <div className="desk:order-3">
            <ServiceCard s={ai} delay={0.1} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 desk:mt-[calc(38*var(--px))] desk:grid-cols-[calc(625*var(--px))_calc(608*var(--px))] desk:justify-between">
          <ServiceCard s={growth} delay={0.05} />
          <ServiceCard s={frontend} delay={0.15} />
        </div>
      </div>
    </section>
  );
}
