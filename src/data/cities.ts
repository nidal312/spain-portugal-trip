export type CityId = "barcelona" | "valencia" | "lisbon";

export interface City {
  id: CityId;
  name: string;
  country: "Spain" | "Portugal";
  /** Label used on the map, e.g. "22–25 NOV". */
  dates: string;
  nights: number;
  /** Position on the illustrated map (viewBox 720 × 540). */
  map: { x: number; y: number; labelX: number; labelY: number };
}

export const cities: City[] = [
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    dates: "22–25 Nov",
    nights: 3,
    map: { x: 518, y: 204, labelX: 534, labelY: 196 },
  },
  {
    id: "valencia",
    name: "Valencia",
    country: "Spain",
    dates: "25–26 Nov",
    nights: 1,
    map: { x: 448, y: 328, labelX: 462, labelY: 352 },
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    dates: "26–29 Nov",
    nights: 3,
    map: { x: 122, y: 342, labelX: 40, labelY: 372 },
  },
];

export const cityById = (id: CityId): City => {
  const city = cities.find((c) => c.id === id);
  if (!city) throw new Error(`Unknown city ${id}`);
  return city;
};

export const cityTextClass: Record<CityId, string> = {
  barcelona: "text-city-barcelona",
  valencia: "text-city-valencia",
  lisbon: "text-city-lisbon",
};

export const cityBgClass: Record<CityId, string> = {
  barcelona: "bg-city-barcelona",
  valencia: "bg-city-valencia",
  lisbon: "bg-city-lisbon",
};

export const cityBorderClass: Record<CityId, string> = {
  barcelona: "border-city-barcelona",
  valencia: "border-city-valencia",
  lisbon: "border-city-lisbon",
};
