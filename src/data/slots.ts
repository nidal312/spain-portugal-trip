import type { Rich } from "@/lib/rich";
import type { PhotoId } from "./photos";
import { places } from "./places";

export type Availability = "last-few" | "limited" | "good" | "calendar";

export const availabilityLabel: Record<Availability, string> = {
  "last-few": "Last few",
  limited: "Limited",
  good: "Good",
  calendar: "Calendar",
};

export interface SlotTime {
  time: string;
  availability: Availability;
  suggested?: boolean;
  /** Short annotation shown on the chip, e.g. "3 left" or "€31". */
  note?: string;
}

export interface SlotField {
  label: string;
  value: Rich;
}

export interface VenueSlots {
  id: string;
  venue: string;
  description: string;
  /** e.g. "Monday 23 November · basilica, €26" */
  when: string;
  dayId: string;
  availability: Availability;
  photo?: PhotoId;
  /** What the time grid represents, in the source’s words. */
  gridCaption: string;
  times: SlotTime[];
  timeNote: Rich;
  fields: SlotField[];
  bookLabel: string;
  bookHref: string;
}

function everyMinutes(start: string, end: string, step: number): string[] {
  const toMin = (t: string) => {
    const [h = 0, m = 0] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const out: string[] = [];
  for (let m = toMin(start); m <= toMin(end); m += step) {
    out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return out;
}

const parkGuellLast = new Set(["09:30", "10:00", "10:30"]);
const pedreraPrice: Record<string, string> = { "10:15": "€30", "16:00": "€30", "16:30": "€31" };

export const slotsIntro = {
  kicker: "Open slots",
  title: "What is still bookable",
  asOf: "Checked on the official shops, Tuesday 10 November 2026 at about 21:45 Europe/Amsterdam (CET), for 1 adult. Availability changes fast. Suggested times are marked for the day plan. Camp Nou is booked on the club calendar, not a live slot grid.",
};

export const venueSlots: VenueSlots[] = [
  {
    id: "slot-sagrada",
    venue: places.sagrada.name,
    description: places.sagrada.description,
    when: "Monday 23 November · basilica, €26",
    dayId: "day-23",
    availability: "last-few",
    photo: "sagrada",
    gridCaption: "The only times left",
    times: [
      { time: "13:15", availability: "last-few", suggested: true },
      { time: "13:30", availability: "last-few", suggested: true },
      { time: "13:45", availability: "last-few", suggested: true },
      { time: "14:15", availability: "last-few", note: "3 left" },
    ],
    timeNote:
      "Only 13:15, 13:30, 13:45 and 14:15 remain. No morning slots. ==Suggest 13:15, 13:30 or 13:45== (14:15 had 3 tickets left).",
    fields: [
      {
        label: "Ticket type",
        value: "Basilica with audioguide app, €26 adult (towers would be extra; not required).",
      },
      {
        label: "Also open",
        value: "24 and 25 November still had availability. 22 and 28 November were not available.",
      },
    ],
    bookLabel: "tickets.sagradafamilia.org",
    bookHref: "https://tickets.sagradafamilia.org/en/1-individual/4375-sagrada-familia",
  },
  {
    id: "slot-park-guell",
    venue: places.parkGuell.name,
    description: places.parkGuell.description,
    when: "Monday 23 November · general, €18",
    dayId: "day-23",
    availability: "last-few",
    photo: "parkGuell",
    gridCaption: "Every 30 minutes, 09:30–17:30",
    times: everyMinutes("09:30", "17:30", 30).map((time) => ({
      time,
      availability: parkGuellLast.has(time) ? "last-few" : time === "17:00" ? "good" : "limited",
      suggested: time === "10:00" || time === "10:30",
    })),
    timeNote:
      "Every 30 minutes from 09:30 to 17:30. 09:30, 10:00 and 10:30 are last tickets; other morning and afternoon slots limited; 17:00 still had high availability. ==Suggest 10:00 (or 10:30)== so you can reach Sagrada after lunch.",
    fields: [
      {
        label: "Ticket type",
        value: "General self-guided, €18. Enter up to 30 minutes after the slot start.",
      },
    ],
    bookLabel: "parkguell.barcelona",
    bookHref: "https://parkguell.barcelona/en/buy-tickets",
  },
  {
    id: "slot-camp-nou",
    venue: places.campNou.name,
    description: places.campNou.description,
    when: "Tuesday 24 November · 10:00, from €69",
    dayId: "day-24",
    availability: "calendar",
    gridCaption: "Book on the official calendar",
    times: [],
    timeNote:
      "Aim for **10:00**. Be at Access 15 fifteen minutes early. No pitch or dressing rooms. This is not a live inventory check — pick the time on the club calendar.",
    fields: [
      {
        label: "Ticket type",
        value:
          "Spotify Camp Nou Experience, from €69. Guided first-tier stands, flexible museum ticket and audio guide.",
      },
      {
        label: "Official stores",
        value:
          "Passeig de Gràcia 15 (Mon–Sat 10:00–21:00, Sun 10:00–20:30); Sagrada Família at Mallorca 406 (Mon–Sat 10:00–21:00, closed Sunday); main store at Camp Nou (daily 10:00–19:00). [Store finder](https://store.fcbarcelona.com/en-us/pages/store-finder).",
      },
    ],
    bookLabel: "fcbarcelona.com",
    bookHref: "https://www.fcbarcelona.com/en/tickets/camp-nou-experience/4418722/spotify-camp-nou-experience",
  },
  {
    id: "slot-casa-batllo",
    venue: places.casaBatllo.name,
    description: places.casaBatllo.description,
    when: "Tuesday 24 November · general visit",
    dayId: "day-24",
    availability: "good",
    photo: "casaBatllo",
    gridCaption: "Every 15 minutes, 09:00–18:15 · wide availability",
    times: everyMinutes("09:00", "18:15", 15).map((time) => ({
      time,
      availability: "good",
      suggested: time === "16:30" || time === "17:00",
      note: time === "09:00" ? "€37" : undefined,
    })),
    timeNote:
      "09:00–18:15 every 15 minutes, wide availability. ==Suggest 16:30 or 17:00== after lunch. Skip night visits — they include cava or cocktails.",
    fields: [
      {
        label: "Ticket type",
        value: "General visit. €31 on most slots, €33 on some, €37 at 09:00.",
      },
    ],
    bookLabel: "casabatllo.es",
    bookHref: "https://www.casabatllo.es/en/online-tickets/visit-casa-batllo/",
  },
  {
    id: "slot-la-pedrera",
    venue: places.laPedrera.name,
    description: places.laPedrera.description,
    when: "Tuesday 24 November · Essential",
    dayId: "day-24",
    availability: "good",
    photo: "laPedrera",
    gridCaption: "Every 15 minutes, 09:00–17:00 · €29 unless marked",
    times: everyMinutes("09:00", "17:00", 15).map((time) => ({
      time,
      availability: "good",
      suggested: time === "16:00" || time === "16:30",
      note: pedreraPrice[time],
    })),
    timeNote:
      "09:00–17:00 every 15 minutes. ==Suggest 16:00 or 16:30== if this is the house you pick after lunch (last listed slot 17:00). Skip the Night Experience — it includes cava.",
    fields: [
      {
        label: "Ticket type",
        value:
          "Essential, rooftop included. €29 most slots; €30 at 10:15 and 16:00; €31 at 16:30. November code **CASAMILA10** advertised for 10% off — confirm at checkout.",
      },
    ],
    bookLabel: "tickets.lapedrera.com",
    bookHref: "https://tickets.lapedrera.com/en/29-individual/37-la-pedrera-essential",
  },
  {
    id: "slot-pena",
    venue: places.pena.name,
    description: places.pena.description,
    when: "Saturday 28 November · Essential Visit, €20",
    dayId: "day-28",
    availability: "good",
    photo: "pena",
    gridCaption: "Every 30 minutes, 09:30–17:30 · all available",
    times: everyMinutes("09:30", "17:30", 30).map((time) => ({
      time,
      availability: "good",
      suggested: time === "10:00",
    })),
    timeNote:
      "09:30–17:30 every 30 minutes; all slots were available. ==Suggest 10:00== so you can still see the town, and Cascais only if time allows.",
    fields: [
      {
        label: "Ticket type",
        value:
          "Essential Visit (palace + park), €20 adult. Park shuttle is a listed extra — confirm in the shop if you want it.",
      },
    ],
    bookLabel: "bilheteira.parquesdesintra.pt",
    bookHref: "https://bilheteira.parquesdesintra.pt/evento/parque-e-palacio-da-pena-visita-essencial/1169/pt",
  },
];
