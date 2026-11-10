import type { Rich } from "@/lib/rich";

export interface ChecklistItem {
  id: string;
  title: string;
  body: Rich;
}

export const checklist = {
  kicker: "Do this first",
  title: "Book now",
  intro:
    "The trip starts on 22 November — twelve days from the research date. Timed tickets are already thinning, especially Sagrada on Monday. Nothing below is booked yet.",
  items: [
    {
      id: "flights-out",
      title: "Flights",
      body: "Vueling 07:00 AMS–BCN · Ryanair 20:05 VLC–LIS (watch bags) · Transavia home to EIN or AMS.",
    },
    {
      id: "train",
      title: "Barcelona–Valencia train, Wed 25",
      body: "Aim for the 10:15 from Sants (pattern from a nearby midweek timetable — reconfirm on Renfe). [renfe.com](https://www.renfe.com/es/en)",
    },
    {
      id: "park-guell",
      title: "Park Güell, Mon 23 at 10:00",
      body: "€18 general. 10:00 and 10:30 are down to last tickets. [Official tickets](https://parkguell.barcelona/en/buy-tickets)",
    },
    {
      id: "sagrada",
      title: "Sagrada Família, Mon 23 at 13:15–13:45",
      body: "€26 basilica. No morning slots left; only four afternoon times remain. [Official tickets](https://tickets.sagradafamilia.org/en/1-individual/4375-sagrada-familia)",
    },
    {
      id: "camp-nou",
      title: "Camp Nou Experience, Tue 24 at 10:00",
      body: "From €69. Book on the official calendar. Be at Access 15 fifteen minutes early. [fcbarcelona.com](https://www.fcbarcelona.com/en/tickets/camp-nou-experience/4418722/spotify-camp-nou-experience)",
    },
    {
      id: "gaudi-house",
      title: "One Gaudí house, Tue 24 after lunch",
      body: "Casa Batlló from €31 or La Pedrera Essential €29 (try code CASAMILA10). Pick one after lunch — not both.",
    },
    {
      id: "pena",
      title: "Pena Palace, Sat 28 at 10:00",
      body: "€20 Essential Visit; all slots still open. [Parques de Sintra](https://bilheteira.parquesdesintra.pt/evento/parque-e-palacio-da-pena-visita-essencial/1169/pt)",
    },
  ] satisfies ChecklistItem[],
};
