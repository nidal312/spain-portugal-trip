import type { Rich } from "@/lib/rich";
import type { Cafe } from "./cafes";
import type { ChecklistItem } from "./checklist";
import type { City } from "./cities";
import type { Day } from "./days";
import type { AirportInfo, Flight, Leg, LegId } from "./flights";
import type { Reason } from "./route";
import type { VenueSlots } from "./slots";
import type { Spot } from "./spots";
import type { Stay } from "./stay";
import type { CityWeather } from "./weather";

export type PlanId = "6" | "7";

export const DEFAULT_PLAN_ID: PlanId = "6";
export const PLAN_QUERY = "plan";

export interface PlanMeta {
  id: PlanId;
  nights: number;
  fromLabel: string;
  switcherLabel: string;
  rangeLabel: string;
  departure: string;
  returnDate: string;
}

export interface Plan {
  meta: PlanMeta;
  trip: {
    title: string;
    kicker: string;
    lead: string;
    pills: readonly string[];
  };
  about: { kicker: string; title: string; body: string; otherSources: string };
  cities: City[];
  route: {
    kicker: string;
    title: string;
    lead: string;
    reasons: Reason[];
    map: {
      title: string;
      subtitle: string;
      trainLabel: string;
      flightLabel: string;
      legend: { train: string; flight: string };
      ariaLabel: string;
    };
  };
  legs: Leg[];
  flights: Flight[];
  defaultSelection: Record<LegId, string>;
  flightsIntro: Rich;
  flightSearchLinks: { label: string; href: string }[];
  rejectedNote?: Rich;
  airports: AirportInfo[];
  checklist: { kicker: string; title: string; intro: string; items: ChecklistItem[] };
  slotsIntro: { kicker: string; title: string; asOf: string };
  venueSlots: VenueSlots[];
  daysIntro: { kicker: string; title: string; lead: string };
  days: Day[];
  cafes: Cafe[];
  cafesIntro: { kicker: string; title: string; intro: string };
  stays: Stay[];
  stayIntro: { kicker: string; title: string };
  spotsIntro: { kicker: string; title: string; intro: string; footnote: string };
  spots: Spot[];
  weather: CityWeather[];
  weatherIntro: { kicker: string; title: string; intro: string };
}

export function isPlanId(value: string | null | undefined): value is PlanId {
  return value === "6" || value === "7";
}

export function readPlanIdFromLocation(search = window.location.search, hash = window.location.hash): PlanId {
  const query = new URLSearchParams(search).get(PLAN_QUERY);
  if (isPlanId(query)) return query;
  const hashQuery = new URLSearchParams(hash.replace(/^#/, ""));
  const fromHash = hashQuery.get(PLAN_QUERY);
  if (isPlanId(fromHash)) return fromHash;
  return DEFAULT_PLAN_ID;
}

export function planPath(id: PlanId): string {
  const url = new URL(window.location.href);
  url.searchParams.set(PLAN_QUERY, id);
  url.hash = "";
  return `${url.pathname}?${url.searchParams.toString()}`;
}
