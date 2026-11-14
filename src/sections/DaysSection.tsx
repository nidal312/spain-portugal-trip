import AutoHeight from "embla-carousel-auto-height";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { PlaceBlurbList } from "@/components/ui/PlaceBlurb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ZoomablePhoto } from "@/components/ui/ZoomablePhoto";
import { cityBgClass, cityTextClass, type CityId } from "@/data/cities";
import { type Day, type DayBlock } from "@/data/days";
import { cn } from "@/lib/cn";
import { RichText } from "@/lib/rich";
import { usePlan, useTrip } from "@/state/contexts";

function CityDot({ cities }: { cities: CityId[] }) {
  const first = cities[0];
  const second = cities[1];
  if (!first) return null;
  if (!second) {
    return <span aria-hidden="true" className={cn("block size-2.5 rounded-full", cityBgClass[first])} />;
  }
  return (
    <span aria-hidden="true" className="relative block size-2.5 overflow-hidden rounded-full">
      <span className={cn("absolute inset-y-0 left-0 w-1/2", cityBgClass[first])} />
      <span className={cn("absolute inset-y-0 right-0 w-1/2", cityBgClass[second])} />
    </span>
  );
}

function DayBlocks({ blocks }: { blocks: DayBlock[] }) {
  const timeBlocks = blocks.filter((b): b is Extract<DayBlock, { kind: "time" }> => b.kind === "time");

  return (
    <div className="mt-5 space-y-4">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "intro":
            return (
              <p key={i} className="text-[1.05rem] leading-relaxed text-ink-soft">
                <RichText>{block.text}</RichText>
              </p>
            );
          case "unverified":
            return (
              <aside
                key={i}
                className="rounded-xl border-l-[3px] border-terra bg-terra/8 px-4 py-3 text-sm leading-relaxed text-ink-soft"
              >
                <p className="kicker mb-1 text-terra">Not verified</p>
                <RichText>{block.text}</RichText>
              </aside>
            );
          case "notice":
            return (
              <aside
                key={i}
                className="rounded-xl border-l-[3px] border-saffron bg-saffron/10 px-4 py-3 text-sm leading-relaxed text-ink-soft"
              >
                <p className="kicker mb-1 text-saffron-deep">Heads-up</p>
                <RichText>{block.text}</RichText>
              </aside>
            );
          case "alt":
            return (
              <aside
                key={i}
                className="rounded-xl border border-dashed border-line bg-sand/50 px-4 py-4 text-[0.98rem] leading-relaxed text-ink-soft"
              >
                <p className="kicker mb-2 text-olive">{block.title}</p>
                <RichText>{block.text}</RichText>
                {block.places && <PlaceBlurbList ids={block.places} />}
              </aside>
            );
          case "time": {
            const timeIndex = timeBlocks.indexOf(block);
            const isLast = timeIndex === timeBlocks.length - 1;
            return (
              <div key={i} className="grid grid-cols-[auto_1fr] gap-x-4">
                <div className="flex flex-col items-center">
                  <span aria-hidden="true" className="mt-1.5 size-2.5 rounded-full bg-olive" />
                  {!isLast && <span aria-hidden="true" className="w-px flex-1 bg-line" />}
                </div>
                <div className={cn("min-w-0", !isLast && "pb-4")}>
                  <strong className="kicker block text-olive">{block.label}</strong>
                  <p className="mt-1 text-[0.98rem] leading-relaxed text-ink-soft">
                    <RichText>{block.text}</RichText>
                  </p>
                  {block.places && <PlaceBlurbList ids={block.places} />}
                </div>
              </div>
            );
          }
          default: {
            const _never: never = block;
            return _never;
          }
        }
      })}
    </div>
  );
}

function DaySlide({ day, index, active, total }: { day: Day; index: number; active: boolean; total: number }) {
  const accent = day.cities[0] ?? "barcelona";
  return (
    <article
      id={day.id}
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${day.title}`}
      inert={!active}
      className="grid gap-6 lg:grid-cols-12 lg:gap-10"
    >
      <div className={cn("grid gap-3", day.photos.length > 1 ? "sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1" : "lg:col-span-5")}>
        {day.photos.map((id) => (
          <figure key={id} className="min-w-0">
            <ZoomablePhoto
              id={id}
              gallery={day.photos}
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-[3/2] rounded-2xl"
            />
            <figcaption className="mt-1.5">
              <PhotoCredit id={id} />
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="lg:col-span-7">
        <p className={cn("kicker", cityTextClass[accent])}>{day.dateLine}</p>
        <h3 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">{day.title}</h3>
        <DayBlocks blocks={day.blocks} />
      </div>
    </article>
  );
}

export function DaysSection() {
  const { dayIndex, setDayIndex } = useTrip();
  const { days, daysIntro, meta } = usePlan();
  const reduce = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start", duration: reduce ? 0 : 22, watchDrag: true },
    [AutoHeight()],
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setDayIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, setDayIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    if (emblaApi.selectedScrollSnap() !== dayIndex) emblaApi.scrollTo(dayIndex);
  }, [dayIndex, emblaApi]);

  const selectDay = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(days.length - 1, index));
      setDayIndex(next);
      tabRefs.current[next]?.focus();
    },
    [days.length, setDayIndex],
  );

  const onPickerKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        selectDay(dayIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        selectDay(dayIndex - 1);
        break;
      case "Home":
        e.preventDefault();
        selectDay(0);
        break;
      case "End":
        e.preventDefault();
        selectDay(days.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <section id="days" aria-labelledby="days-title" className="bg-sand/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="05" kicker={daysIntro.kicker} title={daysIntro.title} id="days-title">
          <p>{daysIntro.lead}</p>
        </SectionHeading>

        <div className="mt-10 flex items-center gap-2 sm:mt-12">
          <button
            type="button"
            onClick={() => selectDay(dayIndex - 1)}
            disabled={dayIndex === 0}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-paper-2 text-ink transition hover:border-ink disabled:opacity-30"
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
            <span className="sr-only">Previous day</span>
          </button>

          <div className="relative min-w-0 flex-1">
            <div aria-hidden="true" className="absolute top-5 right-4 left-4 h-px bg-line sm:top-6" />
            <div role="group" aria-label="Days of the trip" className="relative flex justify-between gap-1">
              {days.map((day, i) => {
                const active = i === dayIndex;
                return (
                  <button
                    key={day.id}
                    type="button"
                    id={`day-tab-${day.id}`}
                    aria-controls={day.id}
                    aria-pressed={active}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    onClick={() => selectDay(i)}
                    onKeyDown={onPickerKey}
                    className={cn(
                      "relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-center sm:px-2",
                      active ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="day-pill"
                        className="absolute inset-0 -z-10 rounded-2xl bg-paper shadow-card ring-1 ring-line"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    <CityDot cities={day.cities} />
                    <span className="text-[0.62rem] font-semibold tracking-[0.12em] uppercase sm:text-[0.7rem]">
                      {day.weekday}
                    </span>
                    <span className="tabular font-display text-lg leading-none sm:text-2xl">{day.dayOfMonth}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => selectDay(dayIndex + 1)}
            disabled={dayIndex === days.length - 1}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-paper-2 text-ink transition hover:border-ink disabled:opacity-30"
          >
            <ChevronRight aria-hidden="true" className="size-4" />
            <span className="sr-only">Next day</span>
          </button>
        </div>

        <div
          className="mt-8 overflow-hidden rounded-[1.75rem] border border-line bg-paper-2 shadow-card"
          ref={emblaRef}
          aria-roledescription="carousel"
          aria-label="Day by day plan"
        >
          <div key={meta.id} className="flex items-start">
            {days.map((day, i) => (
              <div key={day.id} className="min-w-0 shrink-0 basis-full p-5 sm:p-8">
                <DaySlide day={day} index={i} active={i === dayIndex} total={days.length} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
