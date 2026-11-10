export const trip = {
  title: "Spain & Portugal",
  kicker: "A seven-night plan · 22–29 November 2026",
  lead: "Barcelona, a compact night and day in Valencia, then Lisbon with Sintra. Experiences, viewpoints, food and architecture — planned to stay halal-friendly, and timed so you don’t lose a day to a hotel only.",
  pills: ["3 nights Barcelona", "1 night Valencia", "3 nights Lisbon"],
  /** Outbound departure, Vueling AMS 07:00 CET. */
  departure: "2026-11-22T07:00:00+01:00",
  returnDate: "2026-11-29T23:59:00+01:00",
} as const;

export const about = {
  kicker: "Sources & photo credits",
  title: "About this page",
  body: "Plan researched 10 November 2026. Flight prices from Google Flights the same day; ticket slots checked on official shops at about 21:45 CET. All photographs are freely licensed images from Wikimedia Commons, resized for this page — none are generated stand-ins. Items not verified in a live checkout are marked in the text.",
  otherSources:
    "Other sources linked in the text include Renfe, FGC / Turistren, Parques de Sintra, official monument ticket shops, timeanddate, Weather Spark, Halal Rihla and HalalSpy. The map is an illustrated diagram, not a surveyed chart.",
};

export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "route", label: "Route" },
  { id: "flights", label: "Flights" },
  { id: "book", label: "Book now" },
  { id: "slots", label: "Tickets" },
  { id: "days", label: "Days" },
  { id: "tickets", label: "Top spots" },
  { id: "food", label: "Food & prayer" },
  { id: "stay", label: "Stay" },
  { id: "weather", label: "Weather" },
];
