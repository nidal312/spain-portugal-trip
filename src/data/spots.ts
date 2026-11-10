import type { Rich } from "@/lib/rich";
import type { PhotoId } from "./photos";

export interface Spot {
  id: string;
  name: string;
  photo?: PhotoId;
  /** Short headline price shown on the collapsed card, taken from the body text. */
  price: string;
  body: Rich;
  links: { label: string; href: string }[];
  slotId?: string;
}

export const spotsIntro = {
  kicker: "Barcelona",
  title: "Top spots and tickets",
  intro:
    "Book the official sites only. Park Güell in particular warns against resale tickets. Do Sagrada and Park Güell as the two paid musts, plus one Gaudí house — Batlló or Pedrera, not both — and Sant Pau if legs allow.",
  footnote:
    "Casa Vicens is a smaller Gaudí house near Park Güell (city listing €22 self-guided; confirm on [casavicens.org](https://casavicens.org/)) — optional, not essential if Monday is already full.",
};

export const spots: Spot[] = [
  {
    id: "sagrada",
    name: "Sagrada Família",
    photo: "sagrada",
    price: "€26",
    body: "Basilica + app audioguide **€26** (under-30s/students €24; +towers €36). Winter hours Mon–Sat 9:00–18:00, Sun 10:30–18:00. On Mon 23, only early-afternoon slots were left.",
    links: [
      { label: "Prices", href: "https://sagradafamilia.org/en/prices" },
      { label: "Tickets", href: "https://tickets.sagradafamilia.org/en/1-individual/4375-sagrada-familia" },
    ],
    slotId: "slot-sagrada",
  },
  {
    id: "park-guell",
    name: "Park Güell",
    photo: "parkGuell",
    price: "€18",
    body: "General **€18**; ages 7–12 and 65+ €13.50. Timed entry, stay as long as you like once inside. Official channel only.",
    links: [
      { label: "Prices", href: "https://parkguell.barcelona/en/planning-your-visit/prices-and-times" },
      { label: "Tickets", href: "https://parkguell.barcelona/en/buy-tickets" },
    ],
    slotId: "slot-park-guell",
  },
  {
    id: "casa-batllo",
    name: "Casa Batlló",
    photo: "casaBatllo",
    price: "€31–37",
    body: "On Tue 24 the general visit was **€31–37** depending on the slot (list price starts from €29). About 1h15. Skip night visits (cava/cocktails).",
    links: [{ label: "Tickets", href: "https://www.casabatllo.es/en/online-tickets/visit-casa-batllo/" }],
    slotId: "slot-casa-batllo",
  },
  {
    id: "la-pedrera",
    name: "La Pedrera",
    photo: "laPedrera",
    price: "€29–31",
    body: "Essential **€29–31** on Tue 24, rooftop included. Try **CASAMILA10** for an advertised 10% November discount. Skip the night ticket.",
    links: [{ label: "Tickets", href: "https://tickets.lapedrera.com/en/29-individual/37-la-pedrera-essential" }],
    slotId: "slot-la-pedrera",
  },
  {
    id: "sant-pau",
    name: "Sant Pau Recinte Modernista",
    price: "€17–18",
    body: "A quieter modernista interior, a short walk from Sagrada. City guide: self-guided **€18** before 14:00, **€17** after; 9:30–17:00 in November. A light show, *Els Llums de Sant Pau*, is listed 19 Nov 2026–10 Jan 2027 (ticket price not verified).",
    links: [{ label: "santpaubarcelona.org", href: "https://santpaubarcelona.org/" }],
  },
  {
    id: "free",
    name: "Free, and worth it",
    photo: "bunkers",
    price: "Free",
    body: "Gothic Quarter and Born; Passeig de Gràcia façades; Barceloneta / Port Vell; Parc de la Ciutadella; **Bunkers del Carmel** at sunset.",
    links: [],
  },
];
