import * as Collapsible from "@radix-ui/react-collapsible";
import { CalendarDays, ChevronDown, Ticket } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import {
  availabilityLabel,
  slotsIntro,
  venueSlots,
  type Availability,
  type VenueSlots,
} from "@/data/slots";
import { cn } from "@/lib/cn";
import { RichText } from "@/lib/rich";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useTrip } from "@/state/contexts";

type SlotFilter = "all" | "last-few" | "good";

const EMPTY_CODES: Record<string, string> = {};

const badgeClass: Record<Availability, string> = {
  "last-few": "bg-avail-last text-paper",
  limited: "bg-avail-limited text-paper",
  good: "bg-avail-good text-paper",
};

const chipClass: Record<Availability, string> = {
  "last-few": "border-avail-last/30 bg-avail-last/12 text-avail-last",
  limited: "border-avail-limited/30 bg-avail-limited/12 text-avail-limited",
  good: "border-avail-good/30 bg-avail-good/12 text-avail-good",
};

function AvailabilityBadge({ value }: { value: Availability }) {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.1em] uppercase", badgeClass[value])}>
      {availabilityLabel[value]}
    </span>
  );
}

function SlotCard({ venue, codes, onCode }: { venue: VenueSlots; codes: Record<string, string>; onCode: (id: string, value: string) => void }) {
  const { goToDay } = useTrip();
  const [open, setOpen] = useState(false);
  const code = codes[venue.id] ?? "";

  return (
    <article
      id={venue.id}
      className="overflow-hidden rounded-[1.75rem] border border-line bg-paper-2 shadow-card"
    >
      <div className="flex items-start gap-4 p-5 sm:p-6">
        <Photo
          id={venue.photo}
          sizes="96px"
          className="size-16 shrink-0 overflow-hidden rounded-xl sm:size-20"
          imgClassName="size-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-2xl font-medium tracking-tight">{venue.venue}</h3>
            <AvailabilityBadge value={venue.availability} />
          </div>
          <p className="mt-1 text-sm text-ink-soft">{venue.when}</p>
        </div>
      </div>

      <div className="border-t border-dashed border-line px-5 py-4 sm:px-6">
        <p className="kicker mb-3 text-ink-soft">{venue.gridCaption}</p>
        <ul className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-8">
          {venue.times.map((slot) => (
            <li key={slot.time}>
              <span
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center rounded-lg border px-1 py-1 text-center",
                  chipClass[slot.availability],
                  slot.suggested && "ring-2 ring-olive ring-offset-1 ring-offset-paper-2",
                )}
              >
                <span className="tabular text-[0.78rem] font-semibold leading-none">{slot.time}</span>
                {slot.note && <span className="mt-0.5 text-[0.58rem] leading-none opacity-80">{slot.note}</span>}
                {slot.suggested && <span className="sr-only">Suggested</span>}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          <RichText>{venue.timeNote}</RichText>
        </p>
      </div>

      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger className="flex w-full items-center justify-between gap-2 border-t border-line px-5 py-3 text-left text-sm font-medium text-ink-soft hover:bg-sand/40 sm:px-6">
          Details
          <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", open && "rotate-180")} />
        </Collapsible.Trigger>
        <Collapsible.Content forceMount className="collapse-content">
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-4 border-t border-line px-5 pt-4 pb-5 sm:px-6">
              {venue.fields.map((field) => (
                <div key={field.label}>
                  <p className="kicker text-ink-soft">{field.label}</p>
                  <p className="mt-1 text-sm leading-relaxed">
                    <RichText>{field.value}</RichText>
                  </p>
                </div>
              ))}
              <div>
                <label htmlFor={`${venue.id}-code`} className="kicker text-ink-soft">
                  Confirmation
                </label>
                <input
                  id={`${venue.id}-code`}
                  type="text"
                  value={code}
                  placeholder="—"
                  autoComplete="off"
                  onChange={(e) => onCode(venue.id, e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none placeholder:text-ink-soft/70"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <ExternalLink
                  href={venue.bookHref}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-paper !no-underline transition hover:bg-ink-soft"
                >
                  <Ticket aria-hidden="true" className="size-3.5" />
                  Book · {venue.bookLabel}
                </ExternalLink>
                <button
                  type="button"
                  onClick={() => goToDay(venue.dayId)}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition hover:border-ink"
                >
                  <CalendarDays aria-hidden="true" className="size-3.5" />
                  See in day plan
                </button>
              </div>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </article>
  );
}

export function SlotsSection() {
  const [filter, setFilter] = useState<SlotFilter>("all");
  const [codes, setCodes] = useLocalStorage("slot-confirmations", EMPTY_CODES);

  const counts = useMemo(
    () => ({
      all: venueSlots.length,
      "last-few": venueSlots.filter((v) => v.availability === "last-few").length,
      good: venueSlots.filter((v) => v.availability === "good").length,
    }),
    [],
  );

  const visible = filter === "all" ? venueSlots : venueSlots.filter((v) => v.availability === filter);

  return (
    <section id="slots" aria-labelledby="slots-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="04" kicker={slotsIntro.kicker} title={slotsIntro.title} id="slots-title">
          <p className="text-base italic">{slotsIntro.asOf}</p>
        </SectionHeading>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Segmented
            label="Availability"
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "All", count: counts.all },
              { value: "last-few", label: "Last few", count: counts["last-few"] },
              { value: "good", label: "Good", count: counts.good },
            ]}
          />
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] text-ink-soft">
            <li className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-avail-last" aria-hidden="true" /> Last few
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-avail-limited" aria-hidden="true" /> Limited
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-avail-good" aria-hidden="true" /> Good
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm ring-2 ring-olive" aria-hidden="true" /> Suggested
            </li>
          </ul>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((venue) => (
              <motion.div
                key={venue.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <SlotCard
                  venue={venue}
                  codes={codes}
                  onCode={(id, value) => setCodes({ ...codes, [id]: value })}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
