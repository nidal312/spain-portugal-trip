import { Check, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import {
  airportNames,
  airportOrder,
  airports,
  defaultSelection,
  flightSearchLinks,
  flights,
  flightsIntro,
  legs,
  type Flight,
  type LegId,
} from "@/data/flights";
import { cn } from "@/lib/cn";
import { RichText } from "@/lib/rich";
import { useLocalStorage } from "@/lib/useLocalStorage";

type ReturnFilter = "all" | "EIN" | "AMS";

const DAY_START = 5 * 60;
const DAY_END = 24 * 60;
const toMin = (t: string) => {
  const [h = 0, m = 0] = t.split(":").map(Number);
  return h * 60 + m;
};
const pos = (t: string) => ((toMin(t) - DAY_START) / (DAY_END - DAY_START)) * 100;

function TimeBar({ flight }: { flight: Flight }) {
  const left = pos(flight.depart);
  const width = Math.max(2, pos(flight.arrive) - left);
  return (
    <div aria-hidden="true" className="mt-4">
      <div className="relative h-1.5 rounded-full bg-sand">
        <div className="absolute inset-y-0 rounded-full bg-current opacity-80" style={{ left: `${left}%`, width: `${width}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[0.6rem] tracking-wider text-ink-soft/80 uppercase">
        <span>05:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
}

function FlightOption({ flight, checked, name, onSelect }: { flight: Flight; checked: boolean; name: string; onSelect: () => void }) {
  return (
    <motion.label
      layout="position"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "stub relative block cursor-pointer rounded-2xl border bg-paper-2 p-4 pr-5 pl-5 transition-[border-color] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-azulejo",
        checked ? "border-ink ring-1 ring-ink" : "border-line hover:border-ink-soft/50",
        flight.leg === "outbound" ? "text-terra" : flight.leg === "transfer" ? "text-city-valencia" : "text-azulejo",
      )}
      style={{ ["--notch-y" as string]: "62%" }}
    >
      <input type="radio" name={name} checked={checked} onChange={onSelect} className="sr-only" />
      <div className="flex items-start justify-between gap-3 text-ink">
        <div>
          <p className="text-sm font-semibold">
            {flight.airline}
            {flight.tag && (
              <span className="ml-2 inline-block rounded-full bg-olive px-2 py-0.5 align-[0.1em] text-[0.62rem] font-semibold tracking-[0.08em] text-paper uppercase">
                {flight.tag}
              </span>
            )}
          </p>
          <p className="tabular mt-1 font-display text-[1.65rem] leading-none tracking-tight">
            {flight.depart}
            <span className="mx-1.5 text-ink-soft/60" aria-label="to">→</span>
            {flight.arrive}
          </p>
          <p className="mt-1.5 text-xs tracking-wide text-ink-soft">
            {flight.from} → {flight.to}
            {flight.nonstop && " · nonstop"}
            <span className="sr-only">, from {airportNames[flight.from]} to {airportNames[flight.to]}, local times</span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="tabular font-display text-2xl font-medium">€{flight.fare}</p>
          <span
            aria-hidden="true"
            className={cn(
              "grid size-6 place-items-center rounded-full border transition",
              checked ? "border-ink bg-ink text-paper" : "border-line text-transparent",
            )}
          >
            <Check className="size-3.5" strokeWidth={3} />
          </span>
        </div>
      </div>
      <TimeBar flight={flight} />
      {flight.notes && <p className="mt-3 border-t border-dashed border-line pt-3 text-sm leading-snug text-ink-soft">{flight.notes}</p>}
      <span className="sr-only">€{flight.fare} per person.</span>
    </motion.label>
  );
}

export function FlightsSection() {
  const [selection, setSelection] = useLocalStorage<Record<LegId, string>>("flights", defaultSelection);
  const [returnFilter, setReturnFilter] = useState<ReturnFilter>("all");

  const byLeg = useMemo(() => {
    const out: Record<LegId, Flight[]> = { outbound: [], transfer: [], return: [] };
    for (const f of flights) out[f.leg].push(f);
    return out;
  }, []);

  const visible = (leg: LegId) =>
    leg === "return" && returnFilter !== "all" ? byLeg.return.filter((f) => f.to === returnFilter) : byLeg[leg];

  const chosen = legs.map((l) => flights.find((f) => f.id === selection[l.id]) ?? byLeg[l.id][0]);
  const total = chosen.reduce((sum, f) => sum + (f?.fare ?? 0), 0);

  const changeReturnFilter = (next: ReturnFilter) => {
    setReturnFilter(next);
    if (next === "all") return;
    const current = flights.find((f) => f.id === selection.return);
    if (current?.to !== next) {
      const pick = byLeg.return.filter((f) => f.to === next).sort((a, b) => a.fare - b.fare)[0];
      if (pick) setSelection({ ...selection, return: pick.id });
    }
  };

  return (
    <section id="flights" aria-labelledby="flights-title" className="bg-sand/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="02" kicker="Getting there" title="Flights, per person" id="flights-title">
          <p className="text-base">
            <RichText>{flightsIntro}</RichText>
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {legs.map((leg, i) => (
            <Reveal key={leg.id} delay={i * 0.06}>
              <fieldset>
                <legend className="mb-4 w-full">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="kicker text-terra">
                      {String(i + 1).padStart(2, "0")} · {leg.step}
                    </span>
                    <span className="text-sm text-ink-soft">{leg.date}</span>
                  </span>
                  <span className="mt-1 block font-display text-2xl font-medium">{leg.route}</span>
                </legend>
                {leg.id === "return" && (
                  <Segmented
                    label="Home airport"
                    className="mb-4"
                    value={returnFilter}
                    onChange={changeReturnFilter}
                    options={[
                      { value: "all", label: "Both", count: byLeg.return.length },
                      { value: "EIN", label: "Eindhoven", count: byLeg.return.filter((f) => f.to === "EIN").length },
                      { value: "AMS", label: "Amsterdam", count: byLeg.return.filter((f) => f.to === "AMS").length },
                    ]}
                  />
                )}
                <div className="grid gap-3">
                  <AnimatePresence initial={false} mode="popLayout">
                    {visible(leg.id).map((f) => (
                      <FlightOption
                        key={f.id}
                        flight={f}
                        name={`leg-${leg.id}`}
                        checked={selection[leg.id] === f.id}
                        onSelect={() => setSelection({ ...selection, [leg.id]: f.id })}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </fieldset>
            </Reveal>
          ))}
        </div>

        <div className="sticky bottom-4 z-20 mt-10">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl bg-ink px-5 py-4 text-paper shadow-lift sm:px-7">
            <div className="min-w-0">
              <p className="kicker text-paper/60">Your combination</p>
              <p className="tabular mt-1 truncate text-sm text-paper/85">
                {chosen.map((f) => (f ? `${f.airline} €${f.fare}` : "")).join("  ·  ")}
              </p>
            </div>
            <p className="tabular font-display text-3xl" aria-live="polite">
              €{total}
              <span className="ml-1.5 text-sm text-paper/60 font-sans">pp</span>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
          <span className="mr-2 flex items-center gap-2 text-ink-soft">
            <Search aria-hidden="true" className="size-4" /> Search links:
          </span>
          {flightSearchLinks.map((l) => (
            <ExternalLink
              key={l.href}
              href={l.href}
              className="rounded-full border border-line bg-paper-2 px-3.5 py-1.5 !no-underline transition hover:border-ink"
            >
              {l.label}
            </ExternalLink>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {airportOrder.map((code) => {
            const airport = airports[code];
            return (
              <article key={code} className="rounded-2xl border border-line bg-paper-2 p-4">
                <p className="kicker text-ink-soft">{airport.code}</p>
                <h3 className="mt-1 font-display text-lg font-medium">{airport.name}</h3>
                <p className="mt-2 text-sm leading-snug text-ink-soft">{airport.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
