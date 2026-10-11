import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Why } from "@/components/sections/Why";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Why />
      <Process />
      <Testimonials />
      <FAQ />
      <CTABand />
    </>
  );
}
