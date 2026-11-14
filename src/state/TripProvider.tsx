import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CityId } from "@/data/cities";
import { planPath, readPlanIdFromLocation, type PlanId } from "@/data/plan";
import { plans } from "@/data/plans";
import { scrollToId, TripContext } from "./contexts";

function dayIndexForPlan(planId: PlanId, hash = window.location.hash): number {
  const id = hash.replace(/^#/, "");
  const index = plans[planId].days.findIndex((d) => d.id === id);
  return index >= 0 ? index : 0;
}

export function TripProvider({ children }: { children: ReactNode }) {
  const [planId, setPlanIdState] = useState<PlanId>(() => readPlanIdFromLocation());
  const plan = plans[planId];
  const [dayIndex, setDayIndex] = useState(() => dayIndexForPlan(planId));
  const [city, setCity] = useState<CityId>("barcelona");

  const setPlanId = useCallback((id: PlanId) => {
    setPlanIdState(id);
    const nextDays = plans[id].days;
    setDayIndex((current) => {
      const currentId = plans[planId].days[current]?.id;
      const kept = currentId ? nextDays.findIndex((d) => d.id === currentId) : -1;
      return kept >= 0 ? kept : 0;
    });
    const url = planPath(id);
    window.history.pushState({ plan: id }, "", url);
    document.title = `Spain & Portugal, ${plans[id].meta.rangeLabel}`;
  }, [planId]);

  useEffect(() => {
    document.title = `Spain & Portugal, ${plan.meta.rangeLabel}`;
  }, [plan.meta.rangeLabel]);

  useEffect(() => {
    const onPop = () => {
      const next = readPlanIdFromLocation();
      setPlanIdState(next);
      setDayIndex(dayIndexForPlan(next));
    };
    const onHash = () => {
      const index = dayIndexForPlan(planId);
      setDayIndex(index);
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onHash);
    };
  }, [planId]);

  const goToDay = useCallback(
    (dayId: string) => {
      const index = plan.days.findIndex((d) => d.id === dayId);
      if (index < 0) return;
      setDayIndex(index);
      scrollToId("days");
    },
    [plan.days],
  );

  const value = useMemo(
    () => ({ planId, setPlanId, plan, dayIndex, setDayIndex, goToDay, city, setCity }),
    [planId, setPlanId, plan, dayIndex, goToDay, city],
  );
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}
