import { cafes, cafesIntro } from "./cafes";
import { checklist } from "./checklist";
import { cities } from "./cities";
import { days, daysIntro } from "./days";
import {
  airportOrder,
  airports,
  defaultSelection,
  flightSearchLinks,
  flights,
  flightsIntro,
  legs,
} from "./flights";
import type { Plan, PlanId, PlanMeta } from "./plan";
import { planSix } from "./planSix";
import { route } from "./route";
import { slotsIntro, venueSlots } from "./slots";
import { spots, spotsIntro } from "./spots";
import { stayIntro, stays } from "./stay";
import { about, trip } from "./trip";
import { weather, weatherIntro } from "./weather";

export const planSeven: Plan = {
  meta: {
    id: "7",
    nights: 7,
    fromLabel: "from 22 Nov",
    switcherLabel: "7 nights · from 22 Nov",
    rangeLabel: "22–29 Nov 2026",
    departure: trip.departure,
    returnDate: trip.returnDate,
  },
  trip: {
    title: trip.title,
    kicker: trip.kicker,
    lead: trip.lead,
    pills: trip.pills,
  },
  about,
  cities,
  route,
  legs,
  flights,
  defaultSelection,
  flightsIntro,
  flightSearchLinks,
  airports: airportOrder.map((code) => airports[code]),
  checklist,
  slotsIntro,
  venueSlots,
  daysIntro,
  days,
  cafes,
  cafesIntro,
  stays,
  stayIntro,
  spotsIntro,
  spots,
  weather,
  weatherIntro,
};

export const plans: Record<PlanId, Plan> = {
  "6": planSix,
  "7": planSeven,
};

export const planMetas: PlanMeta[] = [plans["6"].meta, plans["7"].meta];
