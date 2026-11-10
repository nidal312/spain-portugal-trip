import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { CityId } from "@/data/cities";
import { days } from "@/data/days";
import { scrollToId, TripContext } from "./contexts";

export function TripProvider({ children }: { children: ReactNode }) {
  const [dayIndex, setDayIndex] = useState(0);
  const [city, setCity] = useState<CityId>("barcelona");

  const goToDay = useCallback((dayId: string) => {
    const index = days.findIndex((d) => d.id === dayId);
    if (index < 0) return;
    setDayIndex(index);
    scrollToId("days");
  }, []);

  const value = useMemo(() => ({ dayIndex, setDayIndex, goToDay, city, setCity }), [dayIndex, goToDay, city]);
  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}
