import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import { cityBorderClass, cityById, cityTextClass, type CityId } from "@/data/cities";
import { cn } from "@/lib/cn";
import { usePlan, useTrip } from "@/state/contexts";

type CafeFilter = "all" | CityId;

export function CafesSection() {
  const [filter, setFilter] = useState<CafeFilter>("all");
  const { goToDay } = useTrip();
  const { cafes, cafesIntro, cities } = usePlan();
  const visible = useMemo(() => (filter === "all" ? cafes : cafes.filter((c) => c.city === filter)), [cafes, filter]);

  return (
    <section id="cafes" aria-labelledby="cafes-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="08" kicker={cafesIntro.kicker} title={cafesIntro.title} id="cafes-title">
          <p>{cafesIntro.intro}</p>
        </SectionHeading>

        <div className="mt-10">
          <Segmented
            label="City"
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "All", count: cafes.length },
              ...cities.map((city) => ({
                value: city.id,
                label: city.name,
                count: cafes.filter((c) => c.city === city.id).length,
              })),
            ]}
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((cafe) => {
              const city = cityById(cafe.city, cities);
              return (
                <motion.article
                  key={cafe.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex flex-col rounded-[1.5rem] border border-line border-t-4 bg-paper-2 p-5 shadow-card",
                    cityBorderClass[cafe.city],
                  )}
                >
                  <p className={cn("kicker", cityTextClass[cafe.city])}>{city.name}</p>
                  <h3 className="mt-2 text-2xl font-medium tracking-tight">{cafe.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{cafe.description}</p>
                  <p className="mt-3 text-sm text-ink-soft">{cafe.neighbourhood}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => goToDay(cafe.dayId)}
                      className="rounded-full border border-line px-3.5 py-1.5 text-sm transition hover:border-ink"
                    >
                      {cafe.dayLabel}
                    </button>
                    <ExternalLink
                      href={cafe.href}
                      className="rounded-full border border-line px-3.5 py-1.5 text-sm !no-underline transition hover:border-ink"
                    >
                      Site
                    </ExternalLink>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
