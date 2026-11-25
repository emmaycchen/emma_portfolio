import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const challenges = [
  {
    title: "Not enough time or tech skills",
    body: "You’re busy running your business and tech stuff feels overwhelming.",
    icon: "/img/clock-24.svg",
  },
  {
    title: "Limited budget",
    body: "Agencies charge too much. DIY takes forever.",
    icon: "/img/saving-piggy.svg",
  },
  {
    title: "No online visibility",
    body: "Your site isn’t converting, or worse - doesn’t exist.",
    icon: "/img/globe-search.svg",
  },
  {
    title: "Outdated tools",
    body: "Unsure which platforms or automations to use.",
    icon: "/img/tools.svg",
  },
  {
    title: "No marketing strategy",
    body: "Unsure why some posts or ads get popular, and which content is worth spending money on.",
    icon: "/img/money-idea.svg",
  },
];

export default function Challenges() {
  return (
    <section aria-labelledby="challenges-title" className="bg-cream">
      <div className="mx-auto grid max-w-[1440px] gap-5 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:gap-x-[21px] lg:gap-y-[37px] lg:px-[70px] lg:pb-[143px] lg:pt-[100px]">
        <Reveal className="md:col-span-2 lg:col-span-1 lg:pr-8">
          <SectionLabel>Your Challenges</SectionLabel>
          <h2 id="challenges-title" className="mt-[28px] text-4xl leading-tight text-navy md:text-[45px] md:leading-[normal]">
            What’s Holding You Back Online?
          </h2>
          <p className="mt-[15px] text-base leading-6 text-black">
            Small and growing businesses face real roadblocks when going digital. You might be struggling with:
          </p>
        </Reveal>

        {challenges.map((c, i) => (
          <Reveal key={c.title} delay={0.08 * i} className={i < 2 ? "lg:mt-10" : undefined}>
            <article className="relative h-full min-h-[234px] rounded-[10px] bg-sage px-[27px] pb-8 pt-[80px] text-black transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Image
                src={c.icon}
                alt=""
                width={50}
                height={50}
                className="absolute right-[38px] top-[22px] size-[50px]"
              />
              <h3 className="max-w-[302px] text-2xl leading-6">{c.title}</h3>
              <p className="mt-3 max-w-[303px] text-base leading-6">{c.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
