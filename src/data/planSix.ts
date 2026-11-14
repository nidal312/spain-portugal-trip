import { cafes, cafesIntro } from "./cafes";
import { cities } from "./cities";
import { days, daysIntro } from "./days";
import { airports, type Flight, type Leg } from "./flights";
import type { Plan } from "./plan";
import { places } from "./places";
import { route } from "./route";
import { venueSlots, type VenueSlots } from "./slots";
import { spots, spotsIntro, type Spot } from "./spots";
import { stayIntro, stays } from "./stay";
import { about } from "./trip";
import { weather, weatherIntro } from "./weather";

const slotById = (id: string): VenueSlots => {
  const slot = venueSlots.find((item) => item.id === id);
  if (!slot) throw new Error(`Unknown slot ${id}`);
  return slot;
};

const spotById = (id: string): Spot => {
  const spot = spots.find((item) => item.id === id);
  if (!spot) throw new Error(`Unknown spot ${id}`);
  return spot;
};

const lisbonDays = days.filter((day) => day.id === "day-27" || day.id === "day-28" || day.id === "day-29");

const flightsSix: Flight[] = [
  {
    id: "vy-ams-bcn-23",
    leg: "outbound",
    date: "Mon 23 Nov",
    airline: "Vueling",
    number: "VY1051",
    from: "AMS",
    to: "BCN",
    nonstop: true,
    depart: "07:00",
    arrive: "09:20",
    fare: 97,
    notes: "From €97 on Vueling’s date calendar, checked 14 November 2026. Be at Schiphol early.",
    tag: "Recommended",
  },
  {
    id: "kl-ams-bcn-23",
    leg: "outbound",
    date: "Mon 23 Nov",
    airline: "KLM",
    number: "KL1511",
    from: "AMS",
    to: "BCN",
    nonstop: true,
    depart: "08:20",
    arrive: "10:25",
    notes: "Price not verified. The gentler start.",
    tag: "Gentler start",
  },
  {
    id: "fr-vlc-lis-23",
    leg: "transfer",
    date: "Thu 26 Nov",
    airline: "Ryanair",
    number: "FR1769",
    from: "VLC",
    to: "LIS",
    nonstop: true,
    depart: "20:05",
    arrive: "20:45",
    fare: 44.69,
    notes:
      "€44.69 (it was €23 on 10 November). Portugal is one hour behind, so this is about 1h40 in the air. Budget for Ryanair bag fees. Be at VLC about two hours before (metro or taxi 25–35 min from the centre).",
    tag: "Recommended",
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
    notes: "Last verified 10 November. Leaves Sunday for Belém in the morning. Be at LIS mid-afternoon (metro ~30–40 min from Baixa).",
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
    notes: "Last verified 10 November. Same shape of day, home to Amsterdam.",
    tag: "If you need Schiphol",
  },
  {
    id: "fr-lis-ein-3092",
    leg: "return",
    date: "Sun 29 Nov",
    airline: "Ryanair",
    number: "FR3092",
    from: "LIS",
    to: "EIN",
    nonstop: true,
    depart: "15:20",
    arrive: "19:15",
    fare: 134.99,
    notes: "€134.99. Earlier and not cheaper than the 19:00 Transavia to EIN.",
  },
];

const legsSix: Leg[] = [
  { id: "outbound", step: "Out", title: "Fly in", date: "Mon 23 Nov", route: "Amsterdam → Barcelona" },
  { id: "transfer", step: "Hop", title: "Valencia to Lisbon", date: "Thu 26 Nov", route: "Valencia → Lisbon" },
  { id: "return", step: "Home", title: "Fly home", date: "Sun 29 Nov", route: "Lisbon → Eindhoven or Amsterdam" },
];

export const planSix: Plan = {
  meta: {
    id: "6",
    nights: 6,
    fromLabel: "from 23 Nov",
    switcherLabel: "6 nights · from 23 Nov",
    rangeLabel: "23–29 Nov 2026",
    departure: "2026-11-23T07:00:00+01:00",
    returnDate: "2026-11-29T23:59:00+01:00",
  },
  trip: {
    title: "Spain & Portugal",
    kicker: "A six-night plan · 23–29 November 2026",
    lead: "Barcelona for two nights, a compact night and day in Valencia, then Lisbon with Sintra. Sunday was dropped due to fatigue, so Monday is kept gentle. Experiences, viewpoints, food and architecture — planned to stay halal-friendly.",
    pills: ["2 nights Barcelona", "1 night Valencia", "3 nights Lisbon"],
  },
  about: {
    ...about,
    body: "Six-night plan: outbound fares and Sagrada status checked 14 November 2026 (Sagrada Watcher tracking the official shop). The Valencia–Lisbon fare was €44.69 that day. Return fares last verified 10 November. All photographs are freely licensed images from Wikimedia Commons, resized for this page — none are generated stand-ins. Items not verified in a live checkout are marked in the text.",
    otherSources: `${about.otherSources} Sagrada Watcher: sagradawatcher.com.`,
  },
  cities: cities.map((city) =>
    city.id === "barcelona"
      ? { ...city, dates: "23–25 Nov", nights: 2 }
      : city,
  ),
  route: {
    ...route,
    lead: "Barcelona for two nights (Monday to Wednesday), Valencia for one night, Lisbon for three. Sunday was dropped due to fatigue, so Monday is kept gentle. Valencia is still the “rest of Spain” stop — about three hours by direct train — then Lisbon plus a Sintra day.",
    reasons: [
      {
        title: "Why drop Sunday?",
        body: "Sunday was dropped due to fatigue, so Monday is kept gentle: land, Park Güell late morning if it fits, old town and an early night. Sagrada is not possible on Monday 23 anyway — it is sold out.",
      },
      ...route.reasons.map((reason) =>
        reason.title === "The transfer trick"
          ? {
              ...reason,
              body: "There is no useful midday Valencia–Lisbon flight on Thursday 26 November. The 20:05 Ryanair FR1769 (€44.69 pp on 14 November; it was €23 on 10 November) is the one to take: a full day in Valencia, land in Lisbon at 20:45 local, go straight to the hotel.",
            }
          : reason,
      ),
      {
        title: "Why not skip Valencia?",
        body: "Barcelona for 3 nights plus BCN to LIS on Thursday (Ryanair FR3078, 18:00 to 19:05, at €110.99) loses Valencia. This plan keeps the one-night stop.",
      },
    ],
  },
  legs: legsSix,
  flights: flightsSix,
  defaultSelection: {
    outbound: "vy-ams-bcn-23",
    transfer: "fr-vlc-lis-23",
    return: "hv-lis-ein",
  },
  flightsIntro:
    "One-way economy fares in euros, per person. Outbound and the Valencia–Lisbon hop were checked on 14 November 2026; the Transavia returns were last verified on 10 November. Prices move. There is no Monday nonstop from EIN or RTM. Outbound is from Amsterdam; the return can be Eindhoven or Amsterdam.",
  flightSearchLinks: [
    {
      label: "AMS → BCN, 23 Nov",
      href: "https://www.google.com/travel/flights/search?tfs=CBwQAhoeEgoyMDI2LTExLTIzagcIARIDQU1TcgcIARIDQkNOQAFIAXABggELCP___________wGYAQI&curr=EUR&hl=en",
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
  ],
  rejectedNote:
    "Rejected: Barcelona for 3 nights plus BCN to LIS on Thursday (Ryanair FR3078, 18:00 to 19:05, €110.99), which loses Valencia.",
  airports: [airports.AMS, airports.BCN, airports.VLC, airports.LIS, airports.EIN, airports.RTM],
  checklist: {
    kicker: "Do this first",
    title: "Book now",
    intro:
      "The six-night trip starts on 23 November. Monday’s Sagrada Família is sold out; book Tuesday. Park Güell availability for the new dates is not verified. Nothing below is booked yet.",
    items: [
      {
        id: "flights-out",
        title: "Flights",
        body: "Vueling VY1051 07:00 AMS–BCN from €97 · Ryanair FR1769 20:05 VLC–LIS €44.69 (watch bags) · Transavia home to EIN or AMS.",
      },
      {
        id: "train",
        title: "Barcelona–Valencia train, Wed 25",
        body: "Aim for about 10:15 from Sants, or later. Time not verified for this date. [renfe.com](https://www.renfe.com/es/en)",
      },
      {
        id: "park-guell",
        title: "Park Güell, Mon 23 at 11:00 or 11:30",
        body: "€18 general. Not 10:00, which is too tight after landing. Wednesday 25 morning is the backup. Availability is not verified for these dates. [Official tickets](https://parkguell.barcelona/en/buy-tickets)",
      },
      {
        id: "sagrada",
        title: "Sagrada Família, Tue 24 at about 13:30–15:00",
        body: "€26 basilica. Monday 23 is sold out ([Sagrada Watcher](https://sagradawatcher.com)). Tuesday 24 onward is on general sale. [Official tickets](https://tickets.sagradafamilia.org/en/1-individual/4375-sagrada-familia)",
      },
      {
        id: "camp-nou",
        title: "Camp Nou Experience, Tue 24 at 10:00",
        body: "From €69. Be at Access 15 at 09:45. Session times exist; inventory is unverified. [fcbarcelona.com](https://www.fcbarcelona.com/en/tickets/camp-nou-experience/4418722/spotify-camp-nou-experience)",
      },
      {
        id: "gaudi-house",
        title: "One Gaudí house, Tue late afternoon or Wed morning",
        body: "Casa Batlló from €31 or La Pedrera Essential €29+. The time grids are from 10 November and are stale. Pick one — not both.",
      },
      {
        id: "pena",
        title: "Pena Palace, Sat 28 at 10:00",
        body: "€20 Essential Visit. [Parques de Sintra](https://bilheteira.parquesdesintra.pt/evento/parque-e-palacio-da-pena-visita-essencial/1169/pt)",
      },
    ],
  },
  slotsIntro: {
    kicker: "Open slots",
    title: "What is still bookable",
    asOf: "Sagrada status from Sagrada Watcher on 14 November 2026 (Monday 23 sold out; Tuesday 24 onward on general sale). Park Güell and Camp Nou inventory for these dates is unverified. Casa Batlló and La Pedrera grids are from 10 November and are stale. Pena was checked 10 November. Suggested times are marked for the day plan.",
  },
  venueSlots: [
    {
      id: "slot-sagrada",
      venue: places.sagrada.name,
      description: places.sagrada.description,
      when: "Tuesday 24 November · basilica, €26 · about 13:30–15:00",
      dayId: "day-24",
      availability: "good",
      photo: "sagrada",
      gridCaption: "Aim for about 13:30–15:00",
      times: [
        { time: "13:30", availability: "unverified", suggested: true },
        { time: "14:00", availability: "unverified", suggested: true },
        { time: "14:30", availability: "unverified", suggested: true },
        { time: "15:00", availability: "unverified", suggested: true },
      ],
      timeNote:
        "Monday 23 is **sold out** ([Sagrada Watcher](https://sagradawatcher.com), tracking the official shop on 14 November). Tuesday 24 onward is on general sale. ==Book Tuesday 24 at about 13:30–15:00==, €26.",
      fields: [
        {
          label: "Ticket type",
          value: "Basilica with audioguide app, €26 adult.",
        },
        {
          label: "Monday 23",
          value: "Sold out.",
        },
      ],
      bookLabel: "tickets.sagradafamilia.org",
      bookHref: "https://tickets.sagradafamilia.org/en/1-individual/4375-sagrada-familia",
    },
    {
      id: "slot-park-guell",
      venue: places.parkGuell.name,
      description: places.parkGuell.description,
      when: "Monday 23 November · general, €18 · 11:00 or 11:30",
      dayId: "day-23",
      availability: "unverified",
      photo: "parkGuell",
      gridCaption: "Try these times — availability not verified",
      times: [
        { time: "11:00", availability: "unverified", suggested: true },
        { time: "11:30", availability: "unverified", suggested: true },
      ],
      timeNote:
        "==Try Monday 23 at 11:00 or 11:30== (€18). Not 10:00, which is too tight after landing. Wednesday 25 morning is the backup. Availability is not verified for the new dates.",
      fields: [
        {
          label: "Ticket type",
          value: "General self-guided, €18.",
        },
        {
          label: "Backup",
          value: "Wednesday 25 November morning, if Monday slips.",
        },
      ],
      bookLabel: "parkguell.barcelona",
      bookHref: "https://parkguell.barcelona/en/buy-tickets",
    },
    {
      ...slotById("slot-camp-nou"),
      availability: "unverified",
      timeNote:
        "Aim for **10:00**. Be at Access 15 at **09:45**. The session times exist, but inventory is unverified. No pitch or dressing rooms.",
    },
    {
      ...slotById("slot-casa-batllo"),
      availability: "unverified",
      dayId: "day-25",
      when: "Tuesday 24 late afternoon or Wednesday 25 morning · general visit",
      gridCaption: "Grid from 10 November — stale",
      times: slotById("slot-casa-batllo").times.map((slot) => ({
        ...slot,
        availability: "unverified" as const,
      })),
      timeNote:
        "The time grid is from 10 November and is stale. Book ==Tuesday late afternoon or Wednesday morning==. Skip night visits — they include cava or cocktails.",
    },
    {
      ...slotById("slot-la-pedrera"),
      availability: "unverified",
      dayId: "day-25",
      when: "Tuesday 24 late afternoon or Wednesday 25 morning · Essential",
      gridCaption: "Grid from 10 November — stale",
      times: slotById("slot-la-pedrera").times.map((slot) => ({
        ...slot,
        availability: "unverified" as const,
      })),
      timeNote:
        "The time grid is from 10 November and is stale. Book ==Tuesday late afternoon or Wednesday morning== if this is the house you pick. Skip the Night Experience — it includes cava.",
    },
    slotById("slot-pena"),
  ],
  daysIntro: {
    ...daysIntro,
    lead: "Evenings start early: sunset is around 17:15–17:40. Sunday was dropped due to fatigue, so Monday is kept gentle. Sagrada is sold out on Monday — book Tuesday after Camp Nou. Park Güell at 11:00 or 11:30 after landing, not 10:00.",
  },
  days: [
    {
      id: "day-23",
      weekday: "Mon",
      dayOfMonth: 23,
      cities: ["barcelona"],
      dateLine: "Monday 23 November · Barcelona",
      title: "Land, then a gentle first day",
      photos: ["parkGuell", "gothic"],
      blocks: [
        {
          kind: "notice",
          text: "Sagrada Família is **not possible today**. Monday 23 is sold out ([Sagrada Watcher](https://sagradawatcher.com), tracking the official shop on 14 November). Tuesday 24 onward is on general sale.",
        },
        {
          kind: "intro",
          text: "Sunday was dropped due to fatigue, so Monday is kept gentle.",
        },
        {
          kind: "time",
          label: "Morning",
          text: "Vueling lands 09:20. Drop the bags. Park Güell at **11:00** or **11:30** (not 10:00, which is too tight after landing). Availability is not verified for these dates. If that is not possible, the old town instead. Coffee at **Granja Hidden**. Sunset 17:26.",
          places: ["bcn", "eixample", "parkGuell", "granjaHidden"],
        },
        {
          kind: "time",
          label: "Lunch",
          text: "**Rasa Malaysia** via Gràcia, or **Café Arabia** or **Kapadokya** in the Gothic Quarter.",
          places: ["gracia", "rasaMalaysia", "cafeArabia", "kapadokya"],
        },
        {
          kind: "time",
          label: "Afternoon",
          text: "Gothic Quarter and El Born, with churros at **Granja La Pallaresa**. Optionally the Montjuïc Telèferic or the Port Cable Car.",
          places: [
            "gothicQuarter",
            "elBorn",
            "granjaPallaresa",
            "telefericMontjuic",
            "portCableCar",
          ],
        },
        {
          kind: "time",
          label: "Evening",
          text: "Optional sunset at the Bunkers del Carmel (before 17:26), then an early night.",
          places: ["bunkers"],
        },
      ],
    },
    {
      id: "day-24",
      weekday: "Tue",
      dayOfMonth: 24,
      cities: ["barcelona"],
      dateLine: "Tuesday 24 November · Camp Nou, then Sagrada",
      title: "Stadium morning, basilica after lunch",
      photos: ["sagrada"],
      blocks: [
        {
          kind: "time",
          label: "Morning",
          text: "**Spotify Camp Nou Experience** at **10:00**, from €69. Be at Access 15 at **09:45**. Then the Barça store at the stadium. Session times exist; inventory is unverified. [Book on the official calendar](https://www.fcbarcelona.com/en/tickets/camp-nou-experience/4418722/spotify-camp-nou-experience).",
          places: ["campNou", "barcaStoreCampNou"],
        },
        {
          kind: "time",
          label: "Afternoon",
          text: "Metro to Sagrada Família around **13:30–15:00** (€26; Tuesday 24 onward is on general sale). Then Sant Pau, coffee at **Three Marks**, and the Barça store at Mallorca 406. Passeig de Gràcia façades and the store at PdG 15 if there is energy left.",
          places: [
            "sagrada",
            "santPau",
            "threeMarks",
            "barcaStoreSagrada",
            "passeigDeGracia",
            "barcaStorePg",
          ],
        },
        {
          kind: "alt",
          title: "Alternative Tuesday",
          text: "If you skip Camp Nou: **Montserrat** or **Girona**. Early FGC R5 from Plaça Espanya to Monistrol, then the rack railway (about 1h30 door to sanctuary). If the mountain is fogged in, switch to Girona (Avant about 40–50 min; fares not pulled).",
          places: ["placaEspanya", "montserrat", "girona"],
        },
      ],
    },
    {
      id: "day-25",
      weekday: "Wed",
      dayOfMonth: 25,
      cities: ["barcelona", "valencia"],
      dateLine: "Wednesday 25 November · Barcelona to Valencia",
      title: "A last Barcelona morning, then the train",
      photos: ["mercado", "cityArts"],
      blocks: [
        {
          kind: "time",
          label: "Morning",
          text: "Either Park Güell (if it slipped from Monday), one Gaudí house, or La Boqueria. Then the train from Barcelona Sants to Valencia (aim for about **10:15**, or later).",
          places: ["parkGuell", "casaBatllo", "laPedrera", "laBoqueria", "santsStation"],
        },
        {
          kind: "unverified",
          text: "Train time for Wednesday 25 November was not verified for the six-night plan. Aim for about 10:15, or later if the morning visit runs on.",
        },
        {
          kind: "time",
          label: "Afternoon",
          text: "Mercado Central, La Lonja interior **€2**, the Turia, and the City of Arts exteriors. Coffee at **FAV Coffee** or **Blackbird**.",
          places: ["mercadoCentral", "laLonja", "turia", "cityArts", "favCoffee", "blackbird"],
        },
        {
          kind: "time",
          label: "Evening",
          text: "Halal dinner in Ruzafa.",
          places: ["ruzafa"],
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
          text: "Breakfast at **Mayan Coffees**. Either/or: the **Albufera boat** (**€22**) **or** the **Oceanogràfic** (from **€37**). [Albufera](https://www.visitvalencia.com/shop/valencia-autobus-turistico/albufera-bus-turistico) · [Oceanogràfic](https://www.oceanografic.org/en/planifica-tu-visita-al-oceanografic-de-valencia/prices-and-schedules/).",
          places: ["mayanCoffees", "albufera", "oceanografic"],
        },
        {
          kind: "time",
          label: "Afternoon",
          text: "Malvarrosa optional. Then Valencia Airport for the **20:05 Ryanair FR1769** (€44.69).",
          places: ["malvarrosa", "vlc"],
        },
        {
          kind: "time",
          label: "Evening",
          text: "Land Lisbon 20:45 local. Metro or taxi to the hotel, nearby dinner only. No sightseeing push.",
          places: ["lis"],
        },
      ],
    },
    ...lisbonDays,
  ],
  cafes: cafes.map((cafe) => {
    switch (cafe.id) {
      case "three-marks":
        return { ...cafe, dayId: "day-24", dayLabel: "Tue after Sant Pau" };
      case "granja-pallaresa":
        return { ...cafe, dayId: "day-23", dayLabel: "Mon" };
      default:
        return cafe;
    }
  }),
  cafesIntro,
  stays: stays.map((stay) =>
    stay.city === "barcelona" ? { ...stay, title: "Barcelona, 2 nights" } : stay,
  ),
  stayIntro,
  spotsIntro: {
    ...spotsIntro,
    intro:
      "Book the official sites only. On this six-night plan Sagrada is Tuesday, not Monday — Monday 23 is sold out. Park Güell after landing at 11:00 or 11:30, with Wednesday morning as backup. One Gaudí house Tuesday late afternoon or Wednesday morning. Camp Nou is Tuesday at 10:00.",
  },
  spots: spots.map((spot) => {
    switch (spot.id) {
      case "sagrada":
        return {
          ...spotById("sagrada"),
          body: "Monday 23 is **sold out** ([Sagrada Watcher](https://sagradawatcher.com)). Tuesday 24 onward is on general sale. Book **Tuesday 24 at about 13:30–15:00**, basilica **€26**.",
        };
      case "park-guell":
        return {
          ...spotById("park-guell"),
          body: "General **€18**. Try **Monday 23 at 11:00 or 11:30** (not 10:00, which is too tight after landing). Wednesday 25 morning is the backup. Availability is not verified for the new dates.",
        };
      case "camp-nou":
        return {
          ...spotById("camp-nou"),
          body: "Tuesday 24 at **10:00**. Be at Access 15 at **09:45**. From **€69**. Session times exist; inventory is unverified.",
        };
      case "casa-batllo":
        return {
          ...spotById("casa-batllo"),
          body: "General visit from **€31**. Book Tuesday late afternoon or Wednesday morning. The time grid is from 10 November and is stale. Skip night visits (cava/cocktails). Not both houses.",
        };
      case "la-pedrera":
        return {
          ...spotById("la-pedrera"),
          body: "Essential from **€29**, rooftop included. Book Tuesday late afternoon or Wednesday morning. The time grid is from 10 November and is stale. Skip the night ticket. Not both houses.",
        };
      default:
        return spot;
    }
  }),
  weather: weather.map((city) =>
    city.city === "barcelona"
      ? { ...city, sun: city.sun.filter((row) => row.date !== "22 Nov") }
      : city,
  ),
  weatherIntro,
};
