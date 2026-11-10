import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cityBorderClass, cityById, cityTextClass } from "@/data/cities";
import { mosques, mosquesIntro } from "@/data/food";
import { cn } from "@/lib/cn";
import { RichText } from "@/lib/rich";

export function MosquesSection() {
  return (
    <section id="pray" aria-labelledby="pray-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="09" kicker={mosquesIntro.kicker} title={mosquesIntro.title} id="pray-title" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {mosques.map((group, i) => {
            const city = cityById(group.city);
            return (
              <Reveal key={group.city} delay={i * 0.06}>
                <article
                  className={cn(
                    "h-full rounded-[1.75rem] border border-line border-t-4 bg-paper-2 p-6 shadow-card",
                    cityBorderClass[group.city],
                  )}
                >
                  <h3 className={cn("text-3xl font-medium", cityTextClass[group.city])}>{city.name}</h3>
                  <ul className="mt-5 space-y-5">
                    {group.places.map((place) => (
                      <li key={place.name}>
                        <p className="font-display text-xl font-medium">{place.name}</p>
                        <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-soft">{place.description}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                          <RichText>{place.text}</RichText>
                        </p>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
