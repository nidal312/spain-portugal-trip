import type { Rich } from "@/lib/rich";

export type LegId = "outbound" | "transfer" | "return";
export type Airport = "AMS" | "BCN" | "VLC" | "LIS" | "EIN";

export interface Flight {
  id: string;
  leg: LegId;
  date: string;
  airline: string;
  from: Airport;
  to: Airport;
  /** Only set where the source states the flight is nonstop. */
  nonstop?: true;
  depart: string;
  arrive: string;
  fare: number;
  notes?: string;
  tag?: "Recommended" | "Cheaper home" | "If you need Schiphol";
}

export interface Leg {
  id: LegId;
  step: string;
  title: string;
  date: string;
  route: string;
}

export const legs: Leg[] = [
  { id: "outbound", step: "Out", title: "Fly in", date: "Sun 22 Nov", route: "Amsterdam → Barcelona" },
  { id: "transfer", step: "Hop", title: "Valencia to Lisbon", date: "Thu 26 Nov", route: "Valencia → Lisbon" },
  { id: "return", step: "Home", title: "Fly home", date: "Sun 29 Nov", route: "Lisbon → Eindhoven or Amsterdam" },
];

export const flights: Flight[] = [
  {
    id: "vy-ams-bcn",
    leg: "outbound",
    date: "Sun 22 Nov",
    airline: "Vueling",
    from: "AMS",
    to: "BCN",
    nonstop: true,
    depart: "07:00",
    arrive: "09:20",
    fare: 105,
    notes: "Full first day in Barcelona. Be at Schiphol early.",
    tag: "Recommended",
  },
  {
    id: "kl-ams-bcn",
    leg: "outbound",
    date: "Sun 22 Nov",
    airline: "KLM",
    from: "AMS",
    to: "BCN",
    nonstop: true,
    depart: "08:25",
    arrive: "10:30",
    fare: 132,
    notes: "Still a good morning arrival, a little dearer.",
  },
  {
    id: "hv-ams-bcn",
    leg: "outbound",
    date: "Sun 22 Nov",
    airline: "Transavia",
    from: "AMS",
    to: "BCN",
    nonstop: true,
    depart: "11:20",
    arrive: "13:35",
    fare: 137,
    notes: "Usable, but you lose the morning.",
  },
  {
    id: "fr-vlc-lis",
    leg: "transfer",
    date: "Thu 26 Nov",
    airline: "Ryanair",
    from: "VLC",
    to: "LIS",
    nonstop: true,
    depart: "20:05",
    arrive: "20:45",
    fare: 23,
    notes:
      "Full Valencia day. Portugal is one hour behind, so this is about 1h40 in the air. Budget for Ryanair bag fees. Be at VLC about two hours before (metro or taxi 25–35 min from the centre).",
    tag: "Recommended",
  },
  {
    id: "tp-vlc-lis-1815",
    leg: "transfer",
    date: "Thu 26 Nov",
    airline: "TAP",
    from: "VLC",
    to: "LIS",
    nonstop: true,
    depart: "18:15",
    arrive: "19:00",
    fare: 194,
    notes: "Earlier, much more expensive.",
  },
  {
    id: "tp-vlc-lis-0555",
    leg: "transfer",
    date: "Thu 26 Nov",
    airline: "TAP",
    from: "VLC",
    to: "LIS",
    nonstop: true,
    depart: "05:55",
    arrive: "06:40",
    fare: 152,
    notes: "Too early after the Wednesday arrival — skip.",
  },
  {
    id: "hv-lis-ein",
    leg: "return",
    date: "Sun 29 Nov",
    airline: "Transavia",
    from: "LIS",
    to: "EIN",
    nonstop: true,
    depart: "19:00",
    arrive: "22:55",
    fare: 114,
    notes: "Leaves Sunday for Belém in the morning. Be at LIS mid-afternoon (metro ~30–40 min from Baixa).",
    tag: "Cheaper home",
  },
  {
    id: "hv-lis-ams",
    leg: "return",
    date: "Sun 29 Nov",
    airline: "Transavia",
    from: "LIS",
    to: "AMS",
    nonstop: true,
    depart: "19:30",
    arrive: "23:35",
    fare: 161,
    notes: "Same shape of day, home to Amsterdam.",
    tag: "If you need Schiphol",
  },
  {
    id: "fr-lis-ein",
    leg: "return",
    date: "Sun 29 Nov",
    airline: "Ryanair",
    from: "LIS",
    to: "EIN",
    nonstop: true,
    depart: "15:20",
    arrive: "19:15",
    fare: 149,
    notes: "Earlier, dearer than the 19:00 Transavia to EIN. Bag fees likely.",
  },
  {
    id: "tp-lis-ams",
    leg: "return",
    date: "Sun 29 Nov",
    airline: "TAP",
    from: "LIS",
    to: "AMS",
    depart: "18:10",
    arrive: "22:20",
    fare: 286,
  },
  {
    id: "kl-lis-ams",
    leg: "return",
    date: "Sun 29 Nov",
    airline: "KLM",
    from: "LIS",
    to: "AMS",
    depart: "15:35",
    arrive: "19:30",
    fare: 346,
    notes: "Cuts the Sunday short.",
  },
];

export const defaultSelection: Record<LegId, string> = {
  outbound: "vy-ams-bcn",
  transfer: "fr-vlc-lis",
  return: "hv-lis-ein",
};

export const flightsIntro: Rich =
  "One-way economy fares in euros, read on Google Flights on 10 November 2026. Prices move. Headcount is still open, so everything below is per person. Outbound is from Amsterdam; the return can be Eindhoven or Amsterdam — pick based on where you live and where the car is parked. Eindhoven has no morning nonstop out on the 22nd (the Transavia 17:35–19:35 at €112 would waste the first day).";

export const flightSearchLinks = [
  {
    label: "AMS → BCN, 22 Nov",
    href: "https://www.google.com/travel/flights/search?tfs=CBwQAhoeEgoyMDI2LTExLTIyagcIARIDQU1TcgcIARIDQkNOQAFIAXABggELCP___________wGYAQI&curr=EUR&hl=en",
  },
  {
    label: "VLC → LIS, 26 Nov",
    href: "https://www.google.com/travel/flights/search?tfs=CBwQAhoeEgoyMDI2LTExLTI2agcIARIDVkxDcgcIARIDTElTQAFIAXABggELCP___________wGYAQI&curr=EUR&hl=en",
  },
  {
    label: "LIS → AMS, 29 Nov",
    href: "https://www.google.com/travel/flights/search?tfs=CBwQAhoeEgoyMDI2LTExLTI5agcIARIDTElTcgcIARIDQU1TQAFIAXABggELCP___________wGYAQI&curr=EUR&hl=en",
  },
  {
    label: "LIS → EIN, 29 Nov",
    href: "https://www.google.com/travel/flights/search?tfs=CBwQAhoeEgoyMDI2LTExLTI5agcIARIDTElTcgcIARIDRUlOQAFIAXABggELCP___________wGYAQI&curr=EUR&hl=en",
  },
];

export const airportNames: Record<Airport, string> = {
  AMS: "Amsterdam",
  BCN: "Barcelona",
  VLC: "Valencia",
  LIS: "Lisbon",
  EIN: "Eindhoven",
};
