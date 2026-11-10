import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { checklist } from "@/data/checklist";
import { cn } from "@/lib/cn";
import { RichText } from "@/lib/rich";
import { useLocalStorage } from "@/lib/useLocalStorage";

const EMPTY: Record<string, boolean> = {};

function ProgressRing({ done, total }: { done: number; total: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const ratio = total ? done / total : 0;
  return (
    <div className="relative size-36 shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="6" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--color-saffron)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          animate={{ strokeDashoffset: c * (1 - ratio) }}
          initial={false}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <p className="tabular font-display text-4xl leading-none">
          {done}
          <span className="text-paper/50">/{total}</span>
        </p>
        <p className="mt-1 text-[0.65rem] tracking-[0.16em] text-paper/70 uppercase">booked</p>
      </div>
    </div>
  );
}

export function ChecklistSection() {
  const [booked, setBooked, reset] = useLocalStorage("checklist", EMPTY);
  const done = checklist.items.filter((i) => booked[i.id]).length;
  const total = checklist.items.length;

  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden bg-ink py-20 text-paper sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[34rem] rounded-full bg-terra/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="03" kicker={checklist.kicker} title={checklist.title} id="book-title" tone="dark">
          <p>{checklist.intro}</p>
        </SectionHeading>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex items-center gap-6 lg:col-span-3 lg:flex-col lg:items-start">
            <ProgressRing done={done} total={total} />
            <div>
              <p className="text-sm text-paper/75" aria-live="polite">
                {done === total
                  ? "Everything on the list is booked."
                  : `${total - done} still to book. Ticks are saved on this device only.`}
              </p>
              {done > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-saffron underline-offset-4 hover:underline"
                >
                  <RotateCcw aria-hidden="true" className="size-3.5" /> Reset
                </button>
              )}
            </div>
          </Reveal>

          <ul className="grid gap-3 lg:col-span-9">
            {checklist.items.map((item, i) => {
              const isDone = Boolean(booked[item.id]);
              const inputId = `book-${item.id}`;
              return (
                <Reveal key={item.id} delay={i * 0.04}>
                  <li
                    className={cn(
                      "flex gap-4 rounded-2xl border p-4 transition-colors sm:p-5",
                      isDone ? "border-saffron/40 bg-saffron/10" : "border-paper/12 bg-paper/[0.04]",
                    )}
                  >
                    <Checkbox.Root
                      id={inputId}
                      checked={isDone}
                      onCheckedChange={(v) => setBooked({ ...booked, [item.id]: v === true })}
                      className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border-2 border-paper/40 transition data-[state=checked]:border-saffron data-[state=checked]:bg-saffron"
                    >
                      <Checkbox.Indicator forceMount>
                        <motion.span
                          initial={false}
                          animate={{ scale: isDone ? 1 : 0, opacity: isDone ? 1 : 0 }}
                          className="block text-ink"
                        >
                          <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                        </motion.span>
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                        <label htmlFor={inputId} className="cursor-pointer">
                          <h3
                            className={cn(
                              "text-xl font-medium transition-colors",
                              isDone && "text-paper/60 line-through decoration-saffron/70 decoration-2",
                            )}
                          >
                            {item.title}
                          </h3>
                        </label>
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.1em] uppercase",
                            isDone ? "bg-saffron text-ink" : "bg-paper/10 text-paper/80",
                          )}
                        >
                          {isDone ? "Booked" : "Not booked"}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[0.95rem] text-paper/75 [&_.prose-link]:text-saffron [&_.prose-link]:decoration-saffron/40">
                        <RichText>{item.body}</RichText>
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
