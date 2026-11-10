import type { Rich } from "@/lib/rich";

export interface Reason {
  title: string;
  body: Rich;
}

export const route = {
  kicker: "The route",
  title: "Barcelona, then Valencia, then Lisbon",
  lead: "This is the spine to keep. Barcelona is the priority. Valencia is the “rest of Spain” stop that is actually close — about three hours by direct train, walkable, markets and the City of Arts, not a museum marathon. Lisbon plus a Sintra day is the right first look at Portugal.",
  reasons: [
    {
      title: "Why not Madrid?",
      body: "The AVE is slightly faster and Madrid–Lisbon has more flights, but Madrid is too big for one night and leans toward palaces and museums. Use it only if the Valencia–Lisbon flight had failed you. It didn’t: a cheap evening Ryanair leaves a full Thursday in Valencia.",
    },
    {
      title: "Why not Porto?",
      body: "Lisbon–Porto is about three hours by train. Adding it would hollow out Lisbon and Sintra. Porto’s signature visits also include port-wine cellars, which this trip is skipping. Save it for another time.",
    },
    {
      title: "The transfer trick",
      body: "There is no useful midday Valencia–Lisbon flight on Thursday 26 November. The 20:05 Ryanair (€23 pp) is the one to take: a full day in Valencia, land in Lisbon at 20:45 local, go straight to the hotel. The 05:55 TAP wastes the night; the 18:15 TAP is €194.",
    },
  ] satisfies Reason[],
  map: {
    title: "Barcelona → Valencia → Lisbon",
    subtitle: "The Netherlands sits off the map: fly into Barcelona, home from Lisbon.",
    trainLabel: "train ~3h",
    flightLabel: "flight 1h40, then −1h",
    legend: {
      train: "High-speed train, Wed 25",
      flight: "Evening flight, Thu 26 (Portugal is 1 hour behind Spain)",
    },
    ariaLabel:
      "Illustrated map of Spain and Portugal showing a train from Barcelona to Valencia and a flight from Valencia to Lisbon",
  },
};
