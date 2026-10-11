import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, text, align = "left", as: Tag = "h2", className }: Props) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>
      <Tag className="display mt-4 text-[2.1rem] text-fg md:text-[3rem]">{title}</Tag>
      {text && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{text}</p>}
    </Reveal>
  );
}
