import Reveal from "@/components/ui/Reveal";

const pills = [
  "Decisions Tied to Measures",
  "Built for Agility",
  "Small Budget, Big Impact",
  "Fast Results, Zero Guesswork",
];

export default function GrowthHacking() {
  return (
    <section aria-labelledby="growth-title" className="@container bg-cream">
      <div className="px-4 py-8 md:px-6 desk:px-[calc(70*var(--px))] desk:py-[calc(31*var(--px))]">
        <div className="mx-auto grid max-w-[1300px] desk:max-w-[calc(1300*var(--px))] gap-10 rounded-[50px] border-[3px] border-orange px-6 py-12 desk:min-h-[calc(530*var(--px))] desk:grid-cols-[calc(677*var(--px))_1fr] desk:gap-x-[calc(93*var(--px))] desk:px-0 desk:py-0 desk:pl-[calc(76*var(--px))]">
          <Reveal className="order-2 space-y-6 text-base leading-6 text-black desk:text-[length:var(--fs-16)] desk:order-1 desk:pt-[calc(94*var(--px))] desk:pb-[calc(40*var(--px))]">
            <p>
              Growth hacking is a data and experiment-driven approach to growth.
              The difference from traditional marketing isn’t just about budget
              - it’s about scope. Traditional marketing brings people in. Growth
              hacking maps the entire customer journey: from first contact
              through purchase, retention, and referral, finding exactly where
              customers drop off.
            </p>
            <p>
              My process starts with customer journey mapping and customer
              profiles to pinpoint the real friction points. I then work on the
              website&apos;s interface, architecture, and interaction flows —
              reducing the gaps that stop visitors from becoming customers.
            </p>
            <p>
              From there, I apply{" "}
              <strong className="font-bold">Lean Analytics</strong>: one or two
              genuinely meaningful metrics, small-scale experiments to test what
              works, and fast iteration. The changes that move the needle get
              amplified. The ones that don&apos;t get cut immediately.
            </p>
            <p>
              The result: a growth engine built for your brand — at a fraction
              of the time and cost of traditional advertising.
            </p>
          </Reveal>

          <div className="order-1 desk:order-2 desk:pt-[calc(53*var(--px))]">
            <Reveal>
              <p className="text-xs font-bold leading-4 text-orange-ink">
                Methodology
              </p>
              <h2
                id="growth-title"
                className="mt-5 max-w-[412px] desk:max-w-[calc(412*var(--px))] text-4xl font-medium leading-[1.1] text-navy md:text-[50px] md:leading-[54px] desk:text-[length:var(--fs-50)] desk:leading-[calc(54*var(--px))]"
              >
                What is Growth Hacking?
              </h2>
            </Reveal>
            <ul className="mt-10 desk:mt-[calc(40*var(--px))] flex flex-col items-start gap-[23px] desk:gap-[calc(23*var(--px))]">
              {pills.map((p, i) => (
                <li key={p}>
                  <Reveal delay={0.1 * i}>
                    <span className="inline-flex h-[33px] items-center rounded-full border border-navy-deep bg-navy-deep px-[22px] text-sm leading-6 text-cream">
                      {p}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
