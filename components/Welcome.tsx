import Reveal from "@/components/ui/Reveal";

export default function Welcome() {
  return (
    <section aria-labelledby="welcome-title" className="bg-cream">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-16 md:px-[69px] lg:grid-cols-2 lg:gap-x-0 lg:pb-[135px] lg:pt-[164px]">
        <Reveal className="lg:pr-[124px]">
          <h2
            id="welcome-title"
            className="text-4xl font-bold leading-[1.2] text-navy md:text-[50px] md:leading-[60px]"
          >
            Welcome to your Digital Growth Partner
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 text-base leading-6 text-black lg:max-w-[657px] lg:pt-[9px]">
          <p>
            Most small businesses have a website that was built once and never looked at again. I work with owners who
            want the site to do a job: explain the offer clearly, make the next step obvious, and show what is working.
          </p>
          <p>
            I combine UX design, front-end development and growth hacking. Design decisions get tested against real
            numbers, not opinions. I help owners of service businesses, local shops and small B2B firms.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
