import { ArrowRight, BedDouble } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cityById } from "@/data/cities";
import { days } from "@/data/days";
import { route } from "@/data/route";
import { stays } from "@/data/stay";
import { RichText } from "@/lib/rich";
import { useTrip } from "@/state/contexts";
import { RouteMap } from "./RouteMap";

function CityPanel() {
  const { city: cityId, goToDay } = useTrip();
  const city = cityById(cityId);
  const cityDays = days.filter((d) => d.cities.includes(cityId));
  const stay = stays.find((s) => s.city === cityId);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={cityId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3 }}
        aria-live="polite"
      >
        <p className="kicker text-ink-soft">
          {city.country} · {city.dates}
        </p>
        <h3 className="mt-2 text-4xl font-medium tracking-tight">{city.name}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{city.description}</p>
        <p className="mt-2 font-display text-lg text-terra italic">
          {city.nights} {city.nights === 1 ? "night" : "nights"}
        </p>

        {stay && (
          <p className="mt-5 flex gap-3 text-[0.95rem] leading-snug text-ink-soft">
            <BedDouble aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-olive" />
            <span>
              Stay in <strong className="font-semibold text-ink">{stay.base}</strong>.{" "}
              <a href="#stay" className="prose-link">
                Where to stay
              </a>
            </span>
          </p>
        )}

        <ul className="mt-6 divide-y divide-line border-y border-line">
          {cityDays.map((day) => (
            <li key={day.id}>
              <button
                type="button"
                onClick={() => goToDay(day.id)}
                className="group flex w-full items-center gap-4 py-3 text-left"
              >
                <span className="w-12 shrink-0">
                  <span className="block text-[0.65rem] font-semibold tracking-[0.16em] text-ink-soft uppercase">
                    {day.weekday}
                  </span>
                  <span className="tabular font-display text-2xl leading-none">{day.dayOfMonth}</span>
                </span>
                <span className="flex-1 text-[0.95rem] leading-snug font-medium">{day.title}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-ink-soft transition group-hover:translate-x-1 group-hover:text-terra"
                />
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}

export function RouteSection() {
  const { city, setCity } = useTrip();
  return (
    <section id="route" aria-labelledby="route-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="01" kicker={route.kicker} title={route.title} id="route-title">
          <p>{route.lead}</p>
        </SectionHeading>

        <Reveal className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <figure className="overflow-hidden rounded-[1.75rem] border border-line bg-paper-2 shadow-card lg:col-span-8">
            <RouteMap selected={city} onSelect={setCity} />
            <figcaption className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-line px-5 py-4 text-sm text-ink-soft">
              <span className="flex items-center gap-2">
                <svg aria-hidden="true" width="26" height="6" className="text-terra">
                  <line x1="1" y1="3" x2="25" y2="3" stroke="currentColor" strokeWidth="3" strokeDasharray="7 5" strokeLinecap="round" />
                </svg>
                {route.map.legend.train}
              </span>
              <span className="flex items-center gap-2">
                <svg aria-hidden="true" width="26" height="6" className="text-azulejo">
                  <line x1="1" y1="3" x2="25" y2="3" stroke="currentColor" strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" />
                </svg>
                {route.map.legend.flight}
              </span>
            </figcaption>
          </figure>
          <div className="rounded-[1.75rem] border border-line bg-paper-2 p-6 shadow-card sm:p-8 lg:col-span-4">
            <p className="mb-5 text-sm text-ink-soft">Tap a city on the map to see its days.</p>
            <CityPanel />
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 md:gap-8">
          {route.reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.08} className="border-t-2 border-ink pt-5">
              <h3 className="text-2xl font-medium">{reason.title}</h3>
              <p className="mt-3 text-ink-soft">
                <RichText>{reason.body}</RichText>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
