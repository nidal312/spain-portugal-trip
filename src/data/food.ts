import type { Rich } from "@/lib/rich";
import type { CityId } from "./cities";
import { places } from "./places";

export interface Eatery {
  name: string;
  description: string;
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
        name: places.cafeArabia.name,
        description: places.cafeArabia.description,
        text: "Gothic Quarter, near La Rambla. [cafearabiabarcelona.com](https://www.cafearabiabarcelona.com/en/halal-restaurant-barcelona/)",
      },
      {
        name: places.kapadokya.name,
        description: places.kapadokya.description,
        text: "Gothic Quarter, and a Barceloneta branch.",
      },
      {
        name: places.rasaMalaysia.name,
        description: places.rasaMalaysia.description,
        text: "Gràcia, Passeig de Sant Joan, between Park Güell and Sagrada.",
      },
      {
        name: places.marrakech.name,
        description: places.marrakech.description,
        text: "Sants, near Plaça Espanya (useful before or after Montserrat).",
      },
      {
        name: places.himalaya.name,
        description: places.himalaya.description,
        text: "El Raval, in the kebab and Pakistani cluster near the Tariq mosque — ask on the spot.",
      },
      {
        name: places.adilTandoori.name,
        description: places.adilTandoori.description,
        text: "El Raval, in the same cluster as Himalaya and Bismillah — ask on the spot.",
      },
      {
        name: places.bismillah.name,
        description: places.bismillah.description,
        text: "El Raval, in the same cluster as Himalaya and Adil Tandoori — ask on the spot.",
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
        name: places.beirutKing.name,
        description: places.beirutKing.description,
        text: "Ruzafa, Mossèn Femenia 12. [Listing](https://www.letsgohalal.com/place/beirut-king-ruzafa/)",
      },
      {
        name: places.kunafa.name,
        description: places.kunafa.description,
        text: "Ciutat Vella, C/ de Sant Martí 3.",
      },
      {
        name: places.frenchCorner.name,
        description: places.frenchCorner.description,
        text: "Ciutat Vella, C/ del Hospital 18.",
      },
    ],
    note: {
      tone: "unverified",
      text: "These Valencia names come from secondary listings. Confirm halal status in person. Traditional paella often includes pork or unsourced meat — do not assume a “seafood paella” is fine without asking. Horchata is fine.",
    },
  },
  {
    city: "lisbon",
    places: [
      {
        name: places.tasteOfPakistan.name,
        description: places.tasteOfPakistan.description,
        text: "Mouraria, Rua São Pedro Mártir 37B.",
      },
      {
        name: places.ghoroa.name,
        description: places.ghoroa.description,
        text: "Mouraria, Travessa Benformoso 2.",
      },
      {
        name: places.zaafran.name,
        description: places.zaafran.description,
        text: "Rua de São José 35.",
      },
      {
        name: places.cantinhoDoAziz.name,
        description: places.cantinhoDoAziz.description,
        text: "Mouraria, Rua de São Lourenço 5.",
      },
      {
        name: places.mezze.name,
        description: places.mezze.description,
        text: "Arroios, Mercado de Arroios.",
      },
      {
        name: places.zubir.name,
        description: places.zubir.description,
        text: "Roma-Areeiro, Rua do Zaire 40B.",
      },
      {
        name: places.aliBaba.name,
        description: places.aliBaba.description,
        text: "Rua da Palma 25.",
      },
    ],
    note: {
      tone: "info",
      text: "Cluster around Martim Moniz / Mouraria, a short walk from Baixa. Grilled fish with olive oil and lemon is usually fine; ask *sem vinho* / *sem porco*. Avoid francesinha, chouriço, presunto, cozido. Source: [HalalSpy, Oct 2026](https://halalspy.com/halal-food-guide/europe/lisbon/).",
    },
  },
];

export interface Mosque {
  name: string;
  description: string;
  text: Rich;
}

export const mosquesIntro = { kicker: "Prayer", title: "Mosques" };

export const mosques: { city: CityId; places: Mosque[] }[] = [
  {
    city: "barcelona",
    places: [
      {
        name: places.mezquitaTariq.name,
        description: places.mezquitaTariq.description,
        text: "Carrer de Sant Rafael 10, El Raval. [City listing](https://guia.barcelona.cat/es/detall/mesquita-tarek-ibn-ziad_92086026003.html).",
      },
      {
        name: places.ccic.name,
        description: places.ccic.description,
        text: "Carrer de Rafael Capdevila 1–3, El Clot. [ccicbcn.com](https://www.ccicbcn.com/contacto/).",
      },
    ],
  },
  {
    city: "valencia",
    places: [
      {
        name: places.granMezquitaValencia.name,
        description: places.granMezquitaValencia.description,
        text: "Calle del Palància 5, 46021 (Algirós / near Benimaclet).",
      },
    ],
  },
  {
    city: "lisbon",
    places: [
      {
        name: places.lisbonCentralMosque.name,
        description: places.lisbonCentralMosque.description,
        text: "Rua da Mesquita 2, Praça de Espanha (Blue Line). [comunidadeislamica.pt](https://www.comunidadeislamica.pt/en) · [prayer times](https://www.comunidadeislamica.pt/horario.html).",
      },
    ],
  },
];
