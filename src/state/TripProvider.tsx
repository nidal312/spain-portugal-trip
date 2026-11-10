import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CityId } from "@/data/cities";
import { days } from "@/data/days";
import { scrollToId, TripContext } from "./contexts";

function dayIndexFromHash(): number {
  const id = window.location.hash.replace(/^#/, "");
  const index = days.findIndex((d) => d.id === id);
  return index >= 0 ? index : 0;
}

export function TripProvider({ children }: { children: ReactNode }) {
  const [dayIndex, setDayIndex] = useState(dayIndexFromHash);
  const [city, setCity] = useState<CityId>("barcelona");

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      const index = days.findIndex((d) => d.id === id);
      if (index >= 0) setDayIndex(index);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goToDay = useCallback((dayId: string) => {
    const index = days.findIndex((d) => d.id === dayId);
    if (index < 0) return;
    setDayIndex(index);
    scrollToId("days");
  }, []);

  const value = useMemo(() => ({ dayIndex, setDayIndex, goToDay, city, setCity }), [dayIndex, goToDay, city]);
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}
