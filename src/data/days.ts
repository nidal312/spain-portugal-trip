import type { Rich } from "@/lib/rich";
import type { CityId } from "./cities";
import type { PhotoId } from "./photos";

export type DayBlock =
  | { kind: "time"; label: string; text: Rich }
  | { kind: "intro"; text: Rich }
  | { kind: "unverified"; text: Rich };

export interface Day {
  id: string;
  weekday: string;
  dayOfMonth: number;
  /** Primary city for the day; travel days list both. */
  cities: CityId[];
  dateLine: string;
  title: string;
  photos: PhotoId[];
  blocks: DayBlock[];
}

export const daysIntro = {
  kicker: "The week",
  title: "Day by day",
  lead: "Evenings start early: sunset is around 17:15–17:40. Grouped by neighbourhood. Monday is built around the only Sagrada slots left — Park Güell first, basilica after lunch.",
};

export const days: Day[] = [
  {
    id: "day-22",
    weekday: "Sun",
    dayOfMonth: 22,
    cities: ["barcelona"],
    dateLine: "Sunday 22 November · Barcelona",
    title: "Arrive, then Ciutat Vella",
    photos: ["gothic"],
    blocks: [
      {
        kind: "time",
        label: "Morning",
        text: "Vueling lands 09:20. Metro or Aerobus to the Eixample or Born, drop bags. Sunset 17:26.",
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Gothic Quarter and El Born on foot — cathedral and Santa Maria del Mar from the outside, tight streets, then Port Vell or Barceloneta if energy lasts. Skip the Picasso Museum.",
      },
      {
        kind: "time",
        label: "Evening",
        text: "Halal dinner in the Gothic Quarter or El Raval. Early night. Sagrada is not available today.",
      },
    ],
  },
  {
    id: "day-23",
    weekday: "Mon",
    dayOfMonth: 23,
    cities: ["barcelona"],
    dateLine: "Monday 23 November · Barcelona, north-east",
    title: "Park Güell, lunch, then Sagrada",
    photos: ["parkGuell", "sagrada"],
    blocks: [
      {
        kind: "intro",
        text: "Sagrada has no morning tickets left on this date, so the day runs south from the hill rather than the other way around.",
      },
      {
        kind: "time",
        label: "Morning",
        text: "Park Güell at **10:00** (or 10:30). Those slots were already down to last tickets. The park is yours once you are in — no need to rush out.",
      },
      {
        kind: "time",
        label: "Lunch",
        text: "Walk down through Gràcia. **Rasa Malaysia** on Passeig de Sant Joan sits on this exact axis, between the park and the basilica, and states that its meat comes from a halal supplier.",
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Sagrada Família at **13:15, 13:30 or 13:45** (€26). Then walk Avinguda Gaudí to Sant Pau Recinte Modernista next door (self-guided €17 after 14:00, €18 before; Nov–Mar 9:30–17:00). [santpaubarcelona.org](https://santpaubarcelona.org/)",
      },
      {
        kind: "time",
        label: "Evening",
        text: "Optional sunset at the Bunkers del Carmel (free; be there before 17:26). Or stay in Gràcia for a quieter walk.",
      },
    ],
  },
  {
    id: "day-24",
    weekday: "Tue",
    dayOfMonth: 24,
    cities: ["barcelona"],
    dateLine: "Tuesday 24 November · Montserrat, then one Gaudí house",
    title: "Mountain morning, Passeig de Gràcia later",
    photos: ["montserrat"],
    blocks: [
      {
        kind: "time",
        label: "Morning",
        text: "Early FGC R5 from Plaça Espanya to Monistrol, then the rack railway (about 1h30 door to sanctuary). Official FGC + rack return from Barcelona, 4 zones, is €28.80 adult through 31 Dec 2026. [vol.cremallerademontserrat.cat](https://vol.cremallerademontserrat.cat/) · [turistren.cat](https://turistren.cat/trens/cremallera-i-funiculars-de-montserrat/). If the mountain is fogged in, switch to Girona (Avant about 40–50 min; fares not pulled).",
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Sanctuary, viewpoints, Sant Joan funicular if it is clear (adult return €17.50). Head back mid-afternoon.",
      },
      {
        kind: "time",
        label: "Evening",
        text: "One Gaudí interior, not both: Casa Batlló around 16:30–17:00, or La Pedrera Essential at 16:00–16:30 (rooftop, last slot 17:00). Passeig de Gràcia façades are free either way.",
      },
    ],
  },
  {
    id: "day-25",
    weekday: "Wed",
    dayOfMonth: 25,
    cities: ["barcelona", "valencia"],
    dateLine: "Wednesday 25 November · Barcelona to Valencia",
    title: "A last morning, then the train",
    photos: ["mercado", "cityArts"],
    blocks: [
      {
        kind: "time",
        label: "Morning",
        text: "Boqueria or a last neighbourhood walk, check out, Barcelona Sants. Aim for the **10:15** high-speed train (a nearby midweek service arrived Valencia Joaquín Sorolla at 13:13). Reconfirm on [Renfe](https://www.renfe.com/es/en) — that timetable was verified for Tuesday 10 November, not locked for the 25th. The 08:15 is the backup if you want a longer afternoon.",
      },
      {
        kind: "unverified",
        text: "Train times and fares for Wednesday 25 November were not pulled from a live Renfe checkout. Aggregators showed a midweek pattern of direct trains in about 2h47–3h27, with “from” fares in the mid-€20s to mid-€30s. Book soon; prices are dynamic.",
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Check in, Ciutat Vella. Mercado Central, La Lonja from the outside (interior ticket price not pulled), Torres de Serranos, old-town streets.",
      },
      {
        kind: "time",
        label: "Evening",
        text: "Walk the Turia gardens to the City of Arts and Sciences for blue hour (sunset 17:40). Halal dinner in Ruzafa or the centre. Leave Oceanogràfic for Thursday, if at all.",
      },
    ],
  },
  {
    id: "day-26",
    weekday: "Thu",
    dayOfMonth: 26,
    cities: ["valencia", "lisbon"],
    dateLine: "Thursday 26 November · Full Valencia day, evening flight",
    title: "The city in daylight, Lisbon after dinner time",
    photos: ["lonja"],
    blocks: [
      {
        kind: "time",
        label: "Morning",
        text: "City of Arts grounds, or start at opening if you want the Oceanogràfic (price not pulled). Or more of the old town and La Lonja.",
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Malvarrosa seafront or a slower café stretch. Leave for the airport mid-to-late afternoon for the **20:05 Ryanair**.",
      },
      {
        kind: "time",
        label: "Evening",
        text: "Land Lisbon 20:45 local. Metro or taxi to the hotel, nearby dinner only. No sightseeing push. Sunset already gone (17:16 local).",
      },
    ],
  },
  {
    id: "day-27",
    weekday: "Fri",
    dayOfMonth: 27,
    cities: ["lisbon"],
    dateLine: "Friday 27 November · Lisbon",
    title: "Viewpoints, the river, jumu’ah if you want it",
    photos: ["alfama", "praca"],
    blocks: [
      {
        kind: "time",
        label: "Morning",
        text: "Optional jumu’ah at the Lisbon Central Mosque, Rua da Mesquita 2 (Praça de Espanha, Blue Line), then downhill through Parque Eduardo VII and Avenida da Liberdade. Or start in Alfama if you will pray closer to the hotel.",
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Alfama lanes, Santa Luzia / Portas do Sol / Graça, Sé from the outside, down to Baixa and Praça do Comércio. Tram 28 is usually too packed to be worth the wait.",
      },
      {
        kind: "time",
        label: "Evening",
        text: "Halal dinner in Mouraria or Martim Moniz, a short walk from Baixa. Time Out Market is a poor “night out” here — it is heavy on alcohol.",
      },
    ],
  },
  {
    id: "day-28",
    weekday: "Sat",
    dayOfMonth: 28,
    cities: ["lisbon"],
    dateLine: "Saturday 28 November · Sintra, Cascais only if there is time",
    title: "An early palace, a short day",
    photos: ["pena", "cascais"],
    blocks: [
      {
        kind: "intro",
        text: "Daylight is only about 9h45 (sunset 17:16). Start early. Pack lunch from Lisbon — Sintra has almost no reliable halal sit-down.",
      },
      {
        kind: "time",
        label: "Morning",
        text: "CP train from Rossio to Sintra (~40 min). Pena Palace at **10:00**, Essential Visit €20. [Book here](https://bilheteira.parquesdesintra.pt/evento/parque-e-palacio-da-pena-visita-essencial/1169/pt).",
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Sintra town, then either the Moorish Castle or Quinta da Regaleira if you pre-book (prices not pulled).",
      },
      {
        kind: "time",
        label: "Late afternoon",
        text: "Cascais only if you are ahead of the clock. Otherwise go back to Lisbon. If it rains, swap this day with Belém and keep Pena for a clearer window if tickets allow — or stay in Lisbon (Chiado, a Tagus sightseeing cruise, not a drinks cruise).",
      },
    ],
  },
  {
    id: "day-29",
    weekday: "Sun",
    dayOfMonth: 29,
    cities: ["lisbon"],
    dateLine: "Sunday 29 November · Belém, then home",
    title: "The river in the morning, the airport after lunch",
    photos: ["belem"],
    blocks: [
      {
        kind: "time",
        label: "Morning",
        text: "Belém: Jerónimos from the outside (interior only if pre-booked; price not pulled), Torre de Belém exterior, the riverfront. Pastéis de nata are usually egg, butter and sugar — generally treated as permissible — but some Portuguese pastries use lard, so ask at smaller bakeries. Expect a queue at Pastéis de Belém.",
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Bags, metro to LIS. Do not add a new neighbourhood. For the 19:00 Transavia to Eindhoven, leave the centre mid-afternoon; for the 19:30 to Schiphol, the same shape of day.",
      },
    ],
  },
];
