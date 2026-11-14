import { ArrowDown, Plane, TrainFront } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Fragment, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { usePlan } from "@/state/contexts";

const DAY_MS = 86_400_000;

function countdownLabel(now: number, departure: string, returnDate: string): string | null {
  const dep = Date.parse(departure);
  const ret = Date.parse(returnDate);
  if (now < dep) {
    const days = Math.ceil((dep - now) / DAY_MS);
    return days === 1 ? "Departs tomorrow" : `Departs in ${days} days`;
  }
  if (now <= ret) return "Trip under way";
  return null;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const plan = usePlan();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const [now] = useState(() => Date.now());
  const countdown = countdownLabel(now, plan.meta.departure, plan.meta.returnDate);

  return (
    <>
      <section
        ref={ref}
        id="top"
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-night text-paper lg:min-h-[92svh]"
      >
        <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-[1.08]">
          <Photo
            id="hero"
            priority
            sizes="100vw"
            imgClassName="object-[center_40%]"
          />
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(27_26_36/0.35)_0%,rgb(27_26_36/0.05)_30%,rgb(30_24_19/0.55)_62%,rgb(30_24_19/0.92)_100%)]"
        />

        <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-8 sm:px-8 sm:pb-12 lg:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="kicker mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-saffron"
          >
            {plan.trip.kicker}
            {countdown && (
              <span className="rounded-full bg-saffron px-2.5 py-1 text-[0.65rem] tracking-[0.14em] text-ink">
                {countdown}
              </span>
            )}
          </motion.p>
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease }}
            className="font-display text-[clamp(3.4rem,15vw,9.5rem)] leading-[0.86] font-medium tracking-[-0.035em]"
          >
            Spain <span className="font-light text-saffron italic">&amp;</span>
            <br />
            Portugal
          </motion.h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="max-w-xl text-[1.08rem] leading-relaxed text-paper/88 lg:col-span-6 lg:text-xl"
            >
              {plan.trip.lead}
            </motion.p>

            <motion.ol
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease }}
              aria-label="Route overview"
              className="flex items-stretch gap-1.5 rounded-2xl border border-paper/15 bg-ink/35 p-1.5 backdrop-blur-md lg:col-span-6 lg:justify-self-end"
            >
              {plan.cities.map((city, i) => (
                <Fragment key={city.id}>
                  <li className="min-w-0 flex-1 rounded-xl bg-paper/8 px-3 py-2.5 sm:px-4">
                    <p className="font-display text-lg leading-tight sm:text-xl">{city.name}</p>
                    <p className="mt-0.5 text-[0.7rem] tracking-[0.12em] text-paper/70 uppercase">
                      {city.nights} {city.nights === 1 ? "night" : "nights"}
                    </p>
                  </li>
                  {i < plan.cities.length - 1 && (
                    <li aria-hidden="true" className="grid w-4 shrink-0 place-items-center text-saffron sm:w-6">
                      {i === 0 ? <TrainFront className="size-4" /> : <Plane className="size-4" />}
                    </li>
                  )}
                </Fragment>
              ))}
            </motion.ol>
          </div>
          <a
            href="#route"
            className="mt-10 inline-flex items-center gap-2 text-sm text-paper/80 no-underline transition hover:text-paper"
          >
            <ArrowDown aria-hidden="true" className="size-4 animate-bounce motion-reduce:animate-none" />
            Start with the route
          </a>
        </div>
      </section>
      <PhotoCredit id="hero" className="mx-auto max-w-7xl px-5 pt-2 sm:px-8" />
    </>
  );
}
