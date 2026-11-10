import type { Rich } from "@/lib/rich";
import type { CityId } from "./cities";
import type { PhotoId } from "./photos";
import type { PlaceId } from "./places";

export type DayBlock =
  | { kind: "time"; label: string; text: Rich; places?: PlaceId[] }
  | { kind: "intro"; text: Rich }
  | { kind: "unverified"; text: Rich }
  | { kind: "notice"; text: Rich }
  | { kind: "alt"; title: string; text: Rich; places?: PlaceId[] };

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
  lead: "Evenings start early: sunset is around 17:15–17:40. Grouped by neighbourhood. Monday is built around the only Sagrada slots left — Park Güell first, basilica after lunch. Tuesday is Camp Nou in the morning, then one Gaudí house after lunch.",
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
        kind: "notice",
        text: "Barça play Villarreal at home today at **14:00**. The stadium area will be busy on arrival day. This plan does not attend the match.",
      },
      {
        kind: "time",
        label: "Morning",
        text: "Vueling lands 09:20. Metro or Aerobus to the Eixample or Born, drop bags. Sunset 17:26.",
        places: ["bcn", "eixample"],
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Gothic Quarter and El Born on foot — cathedral and Santa Maria del Mar from the outside, tight streets, then Port Vell or Barceloneta if energy lasts. Skip the Picasso Museum. If legs allow: **Telèferic de Montjuïc** up to the castle (open 10:00–18:00 in November; return **€17.10** online) and/or the **Port Cable Car** from Barceloneta to Miramar (**€12.50** one way, **€20** return). Stop at **Granja La Pallaresa** on Petritxol for chocolate and churros. [telefericdemontjuic.cat](https://www.telefericdemontjuic.cat/en/teleferic-fares-and-prices) · [telefericodebarcelona.com](https://www.telefericodebarcelona.com/telefericodebarcelonaen/)",
        places: [
          "gothicQuarter",
          "elBorn",
          "barcelonaCathedral",
          "santaMariaDelMar",
          "portVell",
          "barceloneta",
          "telefericMontjuic",
          "portCableCar",
          "granjaPallaresa",
        ],
      },
      {
        kind: "time",
        label: "Evening",
        text: "Halal dinner in the Gothic Quarter or El Raval. Early night. Sagrada is not available today.",
        places: ["cafeArabia", "kapadokya", "mezquitaTariq"],
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
        text: "Park Güell at **10:00** (or 10:30). Those slots were already down to last tickets. The park is yours once you are in — no need to rush out. Optional: Casa Vicens nearby if Monday is not already full.",
        places: ["parkGuell", "casaVicens", "granjaHidden"],
      },
      {
        kind: "time",
        label: "Lunch",
        text: "Walk down through Gràcia. **Rasa Malaysia** on Passeig de Sant Joan sits on this exact axis, between the park and the basilica, and states that its meat comes from a halal supplier.",
        places: ["gracia", "rasaMalaysia"],
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Sagrada Família at **13:15, 13:30 or 13:45** (€26). Then walk Avinguda Gaudí to Sant Pau Recinte Modernista next door (self-guided €17 after 14:00, €18 before; Nov–Mar 9:30–17:00). Coffee at **Three Marks** on Ausàs Marc after Sant Pau. The Barça Store at Mallorca 406 is by the basilica (Mon–Sat 10:00–21:00, closed Sunday). [santpaubarcelona.org](https://santpaubarcelona.org/)",
        places: ["sagrada", "santPau", "threeMarks", "barcaStoreSagrada", "ccic"],
      },
      {
        kind: "time",
        label: "Evening",
        text: "Optional sunset at the Bunkers del Carmel (free; be there before 17:26). Or stay in Gràcia for a quieter walk.",
        places: ["bunkers"],
      },
    ],
  },
  {
    id: "day-24",
    weekday: "Tue",
    dayOfMonth: 24,
    cities: ["barcelona"],
    dateLine: "Tuesday 24 November · Camp Nou, then one Gaudí house",
    title: "Stadium morning, Passeig de Gràcia later",
    photos: ["casaBatllo"],
    blocks: [
      {
        kind: "time",
        label: "Morning",
        text: "**Spotify Camp Nou Experience** at **10:00**, from €69. Be at Access 15 fifteen minutes early. [Book on the official calendar](https://www.fcbarcelona.com/en/tickets/camp-nou-experience/4418722/spotify-camp-nou-experience). The main Barça Store at the stadium is open daily 10:00–19:00.",
        places: ["campNou", "barcaStoreCampNou"],
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "One Gaudí interior, not both: Casa Batlló around 16:30–17:00, or La Pedrera Essential at 16:00–16:30 (rooftop, last slot 17:00). Passeig de Gràcia façades are free either way. The Barça Store at Passeig de Gràcia 15 is on this street (Mon–Sat 10:00–21:00, Sun 10:00–20:30). [Store finder](https://store.fcbarcelona.com/en-us/pages/store-finder).",
        places: ["passeigDeGracia", "casaBatllo", "laPedrera", "barcaStorePg"],
      },
      {
        kind: "alt",
        title: "Alternative Tuesday",
        text: "If you skip Camp Nou: early FGC R5 from Plaça Espanya to Monistrol, then the rack railway to **Montserrat** (about 1h30 door to sanctuary). Official FGC + rack return from Barcelona, 4 zones, is €28.80 adult through 31 Dec 2026. Sanctuary, viewpoints, Sant Joan funicular if it is clear (adult return €17.50). Head back mid-afternoon for the Gaudí house. If the mountain is fogged in, switch to **Girona** (Avant about 40–50 min; fares not pulled). [vol.cremallerademontserrat.cat](https://vol.cremallerademontserrat.cat/) · [turistren.cat](https://turistren.cat/trens/cremallera-i-funiculars-de-montserrat/).",
        places: ["placaEspanya", "montserrat", "girona", "marrakech"],
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
        places: ["laBoqueria", "santsStation", "sorolla"],
      },
      {
        kind: "unverified",
        text: "Train times and fares for Wednesday 25 November were not pulled from a live Renfe checkout. Aggregators showed a midweek pattern of direct trains in about 2h47–3h27, with “from” fares in the mid-€20s to mid-€30s. Book soon; prices are dynamic.",
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Check in, Ciutat Vella. Mercado Central, La Lonja interior **€2**, Monday–Saturday 10:00–19:00, Torres de Serranos, old-town streets. **FAV Coffee** by the Turia if you want a sit-down.",
        places: ["ciutatVellaValencia", "mercadoCentral", "laLonja", "torresSerranos", "favCoffee"],
      },
      {
        kind: "time",
        label: "Evening",
        text: "Walk the Turia gardens to the City of Arts and Sciences for blue hour (sunset 17:40). Halal dinner in Ruzafa or the centre. **Blackbird** near Ruzafa for coffee and pastry. Leave Oceanogràfic for Thursday, if at all.",
        places: ["turia", "cityArts", "ruzafa", "blackbird"],
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
        text: "Either/or: the **Albufera boat** (Visit València bus plus about 30 minutes on a traditional boat, roughly 2h, **€22**, Monday–Saturday) **or** the **Oceanogràfic** (Europe’s largest aquarium, from **€37**, about 4h). [Albufera](https://www.visitvalencia.com/shop/valencia-autobus-turistico/albufera-bus-turistico) · [Oceanogràfic](https://www.oceanografic.org/en/planifica-tu-visita-al-oceanografic-de-valencia/prices-and-schedules/). **Mayan Coffees** for a simple breakfast. Or more of the old town and La Lonja.",
        places: ["albufera", "oceanografic", "mayanCoffees", "laLonja"],
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Malvarrosa seafront or a slower café stretch. Leave for Valencia Airport mid-to-late afternoon for the **20:05 Ryanair** (metro or taxi 25–35 min from the centre; be there about two hours before).",
        places: ["malvarrosa", "vlc"],
      },
      {
        kind: "time",
        label: "Evening",
        text: "Land Lisbon 20:45 local. Metro or taxi to the hotel, nearby dinner only. No sightseeing push. Sunset already gone (17:16 local).",
        places: ["lis"],
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
        kind: "notice",
        text: "The Parque das Nações Telecabine is **closed 16–27 November 2026** for maintenance. The Santa Justa Lift viewpoint is **temporarily closed**.",
      },
      {
        kind: "time",
        label: "Morning",
        text: "Optional jumu’ah at the Lisbon Central Mosque, Rua da Mesquita 2 (Praça de Espanha, Blue Line), then downhill through Parque Eduardo VII and Avenida da Liberdade. Or start in Alfama if you will pray closer to the hotel. **Manteigaria** in Chiado and **Fábrica Coffee Roasters** on Portas de Santo Antão sit on this side of town.",
        places: [
          "lisbonCentralMosque",
          "parqueEduardoVii",
          "avenidaLiberdade",
          "chiado",
          "manteigaria",
          "fabricaCoffee",
        ],
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Alfama lanes, Santa Luzia / Portas do Sol / Graça, Sé from the outside, **Castelo de São Jorge** (**€17** — the best view over Baixa and the river), down to Baixa and Praça do Comércio. Tram 28 is usually too packed to be worth the wait. **Copenhagen Coffee Lab** on Campo de Santa Clara is near Graça and Alfama. [castelodesaojorge.pt](https://castelodesaojorge.pt/en/plan-your-visit/choose-your-ticket/)",
        places: [
          "alfama",
          "santaLuzia",
          "portasDoSol",
          "graca",
          "seLisbon",
          "casteloSaoJorge",
          "baixa",
          "praca",
          "tram28",
          "copenhagenLab",
          "telecabine",
          "santaJusta",
        ],
      },
      {
        kind: "time",
        label: "Evening",
        text: "Halal dinner in Mouraria or Martim Moniz, a short walk from Baixa. Time Out Market is a poor “night out” here — it is heavy on alcohol.",
        places: ["tasteOfPakistan", "ghoroa", "cantinhoDoAziz"],
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
        places: ["rossio", "pena"],
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Sintra town, then either the Moorish Castle or Quinta da Regaleira if you pre-book (prices not pulled).",
        places: ["sintraTown", "moorishCastle", "regaleira"],
      },
      {
        kind: "time",
        label: "Late afternoon",
        text: "Cascais only if you are ahead of the clock. Otherwise go back to Lisbon. If it rains, swap this day with Belém and keep Pena for a clearer window if tickets allow — or stay in Lisbon (Chiado, a Tagus sightseeing cruise, not a drinks cruise).",
        places: ["cascais"],
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
        text: "Belém: Jerónimos cloister **€18** (Tuesday–Sunday 9:30–17:30) or from the outside if you skip the interior; Torre de Belém **€15** or the exterior from the bank. **Pastéis de Belém** on Rua de Belém — expect a queue. **Manteigaria** Belém is the backup nata. Pastéis de nata are usually egg, butter and sugar — generally treated as permissible — but some Portuguese pastries use lard, so ask at smaller bakeries.",
        places: ["jeronimos", "torreBelem", "pasteisBelem", "manteigaria"],
      },
      {
        kind: "time",
        label: "Afternoon",
        text: "Bags, metro to LIS. Do not add a new neighbourhood. For the 19:00 Transavia to Eindhoven, leave the centre mid-afternoon; for the 19:30 to Schiphol, the same shape of day.",
        places: ["lis"],
      },
    ],
  },
];
