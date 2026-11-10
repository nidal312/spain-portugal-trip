import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cityBorderClass, cityTextClass } from "@/data/cities";
import { stayIntro, stays } from "@/data/stay";
import { cn } from "@/lib/cn";
import { RichText } from "@/lib/rich";

export function StaySection() {
  return (
    <section id="stay" aria-labelledby="stay-title" className="bg-sand/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="09" kicker={stayIntro.kicker} title={stayIntro.title} id="stay-title" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stays.map((stay, i) => (
            <Reveal key={stay.city} delay={i * 0.06}>
              <article
                className={cn(
                  "h-full rounded-[1.75rem] border border-line border-t-4 bg-paper-2 p-6 shadow-card sm:p-7",
                  cityBorderClass[stay.city],
                )}
              >
                <h3 className={cn("text-2xl font-medium", cityTextClass[stay.city])}>{stay.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  <strong className="font-semibold text-ink">{stay.base}</strong>
                  {stay.body.startsWith(",") ? "" : " "}
                  <RichText>{stay.body}</RichText>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
