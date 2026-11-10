import type { Rich } from "@/lib/rich";
import type { CityId } from "./cities";

export interface SunTimes {
  date: string;
  sunrise: string;
  sunset: string;
}

export interface CityWeather {
  city: CityId;
  /** Typical late-November range in °C, as quoted below. */
  high: [number, number];
  low: [number, number];
  /** Wet-day chance in percent, used for the gauge. */
  wetChance: number;
  wetLabel: string;
  summary: Rich;
  sun: SunTimes[];
  sunFootnote?: string;
}

export const weatherIntro = {
  kicker: "Late November",
  title: "Weather and daylight",
  intro:
    "Climate normals, not a forecast. Spain is on CET (UTC+1); Portugal is on WET (UTC+0), one hour behind — that is why a 20:05 Valencia departure lands at 20:45 in Lisbon. Maghrib is early; plan viewpoints for mid-afternoon. A full moon falls on 24 November 2026 (Weather Spark moon table).",
};

export const weather: CityWeather[] = [
  {
    city: "barcelona",
    high: [15, 17],
    low: [7, 9],
    wetChance: 15,
    wetLabel: "14–16%",
    summary:
      "Highs about 15–17°C, lows 7–9°C. A wet day about 14–16% of the time. Jacket weather; the sea is too cool for a swim.",
    sun: [
      { date: "22 Nov", sunrise: "7:47", sunset: "17:26" },
      { date: "25 Nov", sunrise: "7:51", sunset: "17:24" },
    ],
  },
  {
    city: "valencia",
    high: [17, 19],
    low: [9, 10],
    wetChance: 12,
    wetLabel: "about 12%",
    summary:
      "Mildest of the three: highs about 17–19°C, lows 9–10°C. Wet-day chance falling toward about 12%.",
    sun: [
      { date: "25 Nov", sunrise: "7:56", sunset: "17:40" },
      { date: "26 Nov", sunrise: "7:57", sunset: "17:39" },
    ],
  },
  {
    city: "lisbon",
    high: [16, 18],
    low: [10, 11],
    wetChance: 28,
    wetLabel: "~28%",
    summary:
      "Highs about 16–18°C, lows 10–11°C. Wettest of the three (~28% wet-day chance). Pack a rain layer for Sintra; fog is common.",
    sun: [
      { date: "26 Nov", sunrise: "7:30", sunset: "17:16" },
      { date: "28 Nov", sunrise: "7:32", sunset: "17:16" },
      { date: "29 Nov", sunrise: "7:33", sunset: "17:15" },
    ],
    sunFootnote: "(All local.)",
  },
];

export const weatherSources: Rich =
  "Sun times: [timeanddate Barcelona](https://www.timeanddate.com/sun/spain/barcelona?month=11&year=2026), [Valencia](https://www.timeanddate.com/sun/spain/valencia?month=11&year=2026), [Lisbon](https://www.timeanddate.com/sun/portugal/lisbon?month=11&year=2026). Climate: [Weather Spark Barcelona](https://weatherspark.com/m/47213/11/Average-Weather-in-November-in-Barcelona-Spain), [Valencia](https://weatherspark.com/m/42614/11/Average-Weather-in-November-in-Valencia-Spain), [Lisbon](https://weatherspark.com/m/32022/11/Average-Weather-in-November-in-Lisbon-Portugal).";
