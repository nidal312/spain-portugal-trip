import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: string;
  id?: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({ index, kicker, title, id, children, tone = "light", className }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      <div className="flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-2">
        <span
          aria-hidden="true"
          className={cn(
            "font-display text-5xl leading-none font-light italic lg:text-7xl",
            dark ? "text-saffron" : "text-terra",
          )}
        >
          {index}
        </span>
        <p className={cn("kicker", dark ? "text-paper/70" : "text-ink-soft")}>{kicker}</p>
      </div>
      <div className="lg:col-span-9">
        <h2
          id={id}
          className={cn(
            "text-[2.1rem] leading-[1.05] font-medium tracking-[-0.015em] sm:text-5xl lg:text-[3.6rem]",
            dark ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
        {children && (
          <div className={cn("mt-5 max-w-2xl text-lg leading-relaxed", dark ? "text-paper/80" : "text-ink-soft")}>
            {children}
          </div>
        )}
      </div>
    </Reveal>
  );
}
