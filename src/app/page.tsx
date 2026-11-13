import { About } from "@/components/sections/About";
import { CallToAction } from "@/components/sections/CallToAction";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedWork />
      <Process />
      <CallToAction className="pt-24 md:pt-32" />
    </>
  );
}
