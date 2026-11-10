import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import { cities, cityBorderClass, cityById, cityTextClass, type CityId } from "@/data/cities";
import { food, foodIntro } from "@/data/food";
import { cn } from "@/lib/cn";
import { RichText } from "@/lib/rich";

type FoodFilter = "all" | CityId;

function CityNote({ note }: { note: { tone: "info" | "unverified"; text: string } }) {
  switch (note.tone) {
    case "unverified":
      return (
        <aside className="mt-5 rounded-xl border-l-[3px] border-terra bg-terra/8 px-4 py-3 text-sm leading-relaxed text-ink-soft">
          <p className="kicker mb-1 text-terra">Not verified</p>
          <RichText>{note.text}</RichText>
        </aside>
      );
    case "info":
      return (
        <p className="mt-5 text-sm leading-relaxed text-ink-soft">
          <RichText>{note.text}</RichText>
        </p>
      );
    default: {
      const _never: never = note.tone;
      return _never;
    }
  }
}

export function FoodSection() {
  const [filter, setFilter] = useState<FoodFilter>("all");
  const visible = useMemo(() => (filter === "all" ? food : food.filter((c) => c.city === filter)), [filter]);

  return (
    <section id="food" aria-labelledby="food-title" className="bg-sand/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="07" kicker={foodIntro.kicker} title={foodIntro.title} id="food-title">
          <p>{foodIntro.intro}</p>
        </SectionHeading>

        <div className="mt-10">
          <Segmented
            label="City"
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "All", count: food.reduce((n, c) => n + c.places.length, 0) },
              ...cities.map((city) => ({
                value: city.id,
                label: city.name,
                count: food.find((c) => c.city === city.id)?.places.length ?? 0,
              })),
            ]}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((group) => {
              const city = cityById(group.city);
              return (
                <motion.article
                  key={group.city}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className={cn("rounded-[1.75rem] border border-line border-t-4 bg-paper-2 p-6 shadow-card", cityBorderClass[group.city])}
                >
                  <h3 className={cn("text-3xl font-medium", cityTextClass[group.city])}>{city.name}</h3>
                  <ul className="mt-5 space-y-4">
                    {group.places.map((place, i) => (
                      <motion.li
                        key={`${group.city}-${place.name}-${i}`}
                        layout="position"
                        className="text-[0.98rem] leading-relaxed text-ink-soft"
                      >
                        <strong className="font-display text-lg font-medium text-ink">{place.name}</strong>
                        <p className="mt-1">{place.description}</p>
                        <p className="mt-1 text-sm">
                          <RichText>{place.text}</RichText>
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                  {group.note && <CityNote note={group.note} />}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
