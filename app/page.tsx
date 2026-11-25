import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import GrowthHacking from "@/components/GrowthHacking";
import Challenges from "@/components/Challenges";
import Services from "@/components/Services";
import WhoIWorkWith from "@/components/WhoIWorkWith";
import Process from "@/components/Process";

export default function Home() {
  return (
    <main>
      <Hero />
      <Welcome />
      <GrowthHacking />
      <Challenges />
      <Services />
      <WhoIWorkWith />
      <Process />
    </main>
  );
}
