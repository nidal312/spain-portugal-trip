import { createContext, useContext } from "react";
import type { CityId } from "@/data/cities";
import type { Plan, PlanId } from "@/data/plan";
import type { PhotoId } from "@/data/photos";

export interface LightboxApi {
  open: (gallery: PhotoId[], index?: number) => void;
}

export const LightboxContext = createContext<LightboxApi | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used inside <LightboxProvider>");
  return ctx;
}

export interface TripApi {
  planId: PlanId;
  setPlanId: (id: PlanId) => void;
  plan: Plan;
  dayIndex: number;
  setDayIndex: (index: number) => void;
  /** Select a day and scroll the day planner into view. */
  goToDay: (dayId: string) => void;
  city: CityId;
  setCity: (city: CityId) => void;
}

export const TripContext = createContext<TripApi | null>(null);

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used inside <TripProvider>");
  return ctx;
}

export function usePlan(): Plan {
  return useTrip().plan;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
