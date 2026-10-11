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
  "All levels welcome",
  "Postnatal coaching",
  "Ladies-only sessions",
  "Mobility",
  "Online coaching",
  "Beginner friendly",
  "Terrible puns, free of charge",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="hidden md:block">
        <Ticker items={specialities} />
      </div>
      <Services />
      <Why />
      <Process />
      <Testimonials />
      <FAQ />
      <CTABand />
    </>
  );
}
