import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { planPath } from "@/data/plan";
import { planMetas } from "@/data/plans";
import { navItems } from "@/data/trip";
import { cn } from "@/lib/cn";
import { useTrip } from "@/state/contexts";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        const first = ids.find((id) => visible.has(id));
        setActive(first ?? null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const ids = navItems.map((n) => n.id);

function PlanSwitcher() {
  const { planId, setPlanId } = useTrip();
  return (
    <nav aria-label="Trip length" className="w-full min-w-0 sm:w-auto sm:shrink-0">
      <ul className="flex gap-1 rounded-full border border-line bg-paper-2 p-1">
        {planMetas.map((meta) => {
          const active = planId === meta.id;
          return (
            <li key={meta.id} className="min-w-0 flex-1 sm:flex-none">
              <a
                href={planPath(meta.id)}
                aria-current={active ? "page" : undefined}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                  event.preventDefault();
                  if (meta.id !== planId) setPlanId(meta.id);
                }}
                className={cn(
                  "relative block rounded-full px-2 py-1.5 text-center text-[0.68rem] font-medium tracking-wide whitespace-nowrap no-underline sm:px-3 sm:text-[0.78rem]",
                  active ? "bg-ink text-paper" : "text-ink-soft hover:text-ink",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="plan-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                {meta.switcherLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Header() {
  const active = useActiveSection(ids);
  const { plan } = useTrip();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const stripRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!active || !stripRef.current) return;
    const link = stripRef.current.querySelector<HTMLElement>(`[data-nav="${active}"]`);
    const strip = stripRef.current;
    if (link && strip.scrollWidth > strip.clientWidth) {
      strip.scrollTo({ left: link.offsetLeft - strip.clientWidth / 2 + link.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/95 backdrop-blur-md supports-[backdrop-filter]:bg-paper/90">
      <div className="mx-auto flex max-w-7xl flex-col px-5 sm:px-8">
        <div className="flex flex-col gap-3 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-2">
          <a
            href="#top"
            className="flex items-baseline gap-1.5 font-display text-[1.15rem] font-semibold tracking-tight text-ink no-underline"
          >
            Spain <span className="font-normal text-terra italic">&amp;</span> Portugal
            <span className="ml-2 hidden text-xs font-normal tracking-[0.18em] text-ink-soft uppercase sm:inline">
              {plan.meta.rangeLabel}
            </span>
          </a>
          <PlanSwitcher />
        </div>
        <nav aria-label="Sections" className="-mx-5 sm:-mx-8 lg:mx-0">
          <ul ref={stripRef} className="no-scrollbar flex gap-1 overflow-x-auto px-4 pb-2.5 sm:px-7 lg:px-0">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    data-nav={item.id}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium tracking-wide whitespace-nowrap no-underline transition-colors",
                      isActive ? "text-paper" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-terra"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
