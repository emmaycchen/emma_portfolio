import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

type Step = {
  number: string;
  title: string;
  body: string;
  /** Card colours. */
  tone: string;
  /** Desktop stagger from Figma: horizontal overlap with the previous card and vertical offset. */
  stagger: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "DISCOVERY",
    body: "A call to learn what you sell, who buys it and what goals matter. You get a short written brief.",
    tone: "bg-orange text-navy-deep",
    stagger: "desk:mt-[calc(130*var(--px))]",
  },
  {
    number: "02",
    title: "AUDIT",
    body: "I review your site, analytics and funnel to find the biggest leaks.",
    tone: "bg-navy text-cream",
    stagger: "desk:-ml-[calc(65*var(--px))]",
  },
  {
    number: "03",
    title: "DESIGN & BUILD",
    body: "Wireframes first, then a tested design built in clean front-end code.",
    tone: "bg-orange text-navy-deep",
    stagger: "desk:-ml-[calc(194*var(--px))] desk:mt-[calc(244*var(--px))]",
  },
  {
    number: "04",
    title: "MEASURE & ITERATE",
    body: "Track the metric that matters, cut what doesn’t move it, and double down on what does.",
    tone: "bg-navy text-cream",
    stagger: "desk:-ml-[calc(88*var(--px))] desk:mt-[calc(74*var(--px))]",
  },
];

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="@container bg-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 desk:flex desk:px-[calc(72*var(--px))] desk:pb-[calc(140*var(--px))] desk:pt-[calc(198*var(--px))]">
        <Reveal className="desk:w-[calc(365*var(--px))] desk:shrink-0 desk:pt-[calc(98*var(--px))]">
          <SectionLabel>Process</SectionLabel>
          <h2 id="process-title" className="mt-8 text-4xl leading-[normal] text-navy md:text-[45px] desk:text-[length:var(--fs-45)]">
            How it works
          </h2>
          <p className="mt-3 max-w-[260px] text-base leading-6 text-navy desk:text-[length:var(--fs-16)] desk:max-w-[calc(260*var(--px))]">
            Here’s a quick look at how the simple and effective process guides you from start to success
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 desk:mt-0 desk:flex desk:items-start desk:gap-0">
          {steps.map((s, i) => (
            <li key={s.number} className={`desk:w-[calc(320*var(--px))] desk:shrink-0 ${s.stagger}`}>
              <Reveal delay={0.1 * i} className="h-full">
                <article
                  className={`rounded-[30px] px-[34px] pb-8 pt-[25px] desk:px-[calc(34*var(--px))] desk:pt-[calc(25*var(--px))] transition duration-300 hover:-translate-y-1 hover:shadow-xl desk:min-h-[calc(260*var(--px))] desk:pb-0 ${s.tone}`}
                >
                  <p className="font-afacad text-5xl leading-[64px] desk:text-[length:var(--fs-48)] desk:leading-[calc(64*var(--px))]">{s.number}</p>
                  <h3 className="mt-[5px] text-2xl font-normal leading-[28px] desk:text-[length:var(--fs-24)]">{s.title}</h3>
                  <p className="mt-3 max-w-[245px] text-lg leading-[21px] desk:text-[length:var(--fs-18)] desk:max-w-[calc(245*var(--px))]">{s.body}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
