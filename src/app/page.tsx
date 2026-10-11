import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/ui/Ticker";
import { Services } from "@/components/sections/Services";
import { Why } from "@/components/sections/Why";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";

const specialities = [
  "Strength training",
  "Fat loss",
  "Postnatal coaching",
  "Ladies-only sessions",
  "Mobility",
  "Online coaching",
  "Beginner friendly",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker items={specialities} />
      <Services />
      <Why />
      <Process />
      <Testimonials />
      <FAQ />
      <CTABand />
    </>
  );
}
