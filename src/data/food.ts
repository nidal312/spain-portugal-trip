import type { Rich } from "@/lib/rich";
import type { CityId } from "./cities";

export interface Eatery {
  /** Omitted for area-level tips that do not name a single restaurant. */
  name?: string;
  text: Rich;
}

export interface CityFood {
  city: CityId;
  places: Eatery[];
  note?: { tone: "info" | "unverified"; text: Rich };
}

export const foodIntro = {
  kicker: "Halal-friendly",
  title: "Where to eat",
  intro:
    "Almost all of these are owner-declared, not certified by Instituto Halal. Ask about the meat source and whether alcohol is served. Jacqueline in the Eixample names a certifier but is a jazz club and cocktail bar — skip it.",
};

export const food: CityFood[] = [
  {
    city: "barcelona",
    places: [
      {
        name: "Café Arabia",
        text: "Gothic Quarter, near La Rambla. Middle Eastern; site states halal. [cafearabiabarcelona.com](https://www.cafearabiabarcelona.com/en/halal-restaurant-barcelona/)",
      },
      { name: "Kapadokya", text: "Gothic Quarter, and a Barceloneta branch. Turkish; site states halal meat." },
      {
        name: "Rasa Malaysia",
        text: "Gràcia, Passeig de Sant Joan, between Park Güell and Sagrada. Site names supplier Alimentbarna S.L.",
      },
      {
        name: "Restaurante Árabe Halal Marrakech",
        text: "Sants, near Plaça Espanya (useful before or after Montserrat).",
      },
      {
        text: "El Raval (Himalaya, Adil Tandoori, Bismillah) is the densest kebab and Pakistani cluster, near the Tariq mosque — ask on the spot.",
      },
    ],
    note: {
      tone: "info",
      text: "Source: [Halal Rihla, Nov 2026](https://halalrihla.com/en/blog/halal-food-in-barcelona/).",
    },
  },
  {
    city: "valencia",
    places: [
      {
        name: "Beirut King",
        text: "Ruzafa, Mossèn Femenia 12. [Listing](https://www.letsgohalal.com/place/beirut-king-ruzafa/)",
      },
      { name: "Kunafa by Afandi", text: "Ciutat Vella, C/ de Sant Martí 3." },
      { name: "French Corner", text: "(shawarma) — Ciutat Vella, C/ del Hospital 18." },
    ],
    note: {
      tone: "unverified",
      text: "These Valencia names come from secondary listings. Confirm halal status in person. Traditional paella often includes pork or unsourced meat — do not assume a “seafood paella” is fine without asking. Horchata is fine.",
    },
  },
  {
    city: "lisbon",
    places: [
      { name: "Taste of Pakistan", text: "Mouraria, Rua São Pedro Mártir 37B." },
      { name: "Ghoroa", text: "Mouraria, Travessa Benformoso 2." },
      { name: "Zaafran", text: "Listed as halal-certified Indian, Rua de São José 35." },
      { name: "Cantinho do Aziz", text: "Mouraria, Rua de São Lourenço 5 (Mozambican, claimed)." },
      { name: "Mezze", text: "Arroios, Mercado de Arroios." },
      {
        name: "Zubir Churrasqueira",
        text: "Roma-Areeiro, Rua do Zaire 40B (also on the Instituto Halal de Portugal hospitality page).",
      },
      { name: "Ali Baba Kebab Haus", text: "Rua da Palma 25." },
    ],
    note: {
      tone: "info",
      text: "Cluster around Martim Moniz / Mouraria, a short walk from Baixa. Grilled fish with olive oil and lemon is usually fine; ask *sem vinho* / *sem porco*. Avoid francesinha, chouriço, presunto, cozido. Source: [HalalSpy, Oct 2026](https://halalspy.com/halal-food-guide/europe/lisbon/).",
    },
  },
];

export interface Mosque {
  name: string;
  text: Rich;
}

export const mosquesIntro = { kicker: "Prayer", title: "Mosques" };

export const mosques: { city: CityId; places: Mosque[] }[] = [
  {
    city: "barcelona",
    places: [
      {
        name: "Mezquita Tariq Bin Ziyad",
        text: "Carrer de Sant Rafael 10, El Raval — handy for Ciutat Vella. [City listing](https://guia.barcelona.cat/es/detall/mesquita-tarek-ibn-ziad_92086026003.html).",
      },
      {
        name: "Centre Cultural Islàmic Català",
        text: "Carrer de Rafael Capdevila 1–3, El Clot — handy from the eastern Eixample. [ccicbcn.com](https://www.ccicbcn.com/contacto/).",
      },
    ],
  },
  {
    city: "valencia",
    places: [
      {
        name: "Gran Mezquita de Valencia",
        text: "Calle del Palància 5, 46021 (Algirós / near Benimaclet). Opening hours in secondary listings were not confirmed on an official mosque page.",
      },
    ],
  },
  {
    city: "lisbon",
    places: [
      {
        name: "Mesquita Central de Lisboa",
        text: "Rua da Mesquita 2, Praça de Espanha (Blue Line). The largest in Portugal — jumu’ah on Friday 27 November. [comunidadeislamica.pt](https://www.comunidadeislamica.pt/en) · [prayer times](https://www.comunidadeislamica.pt/horario.html).",
      },
    ],
  },
];
