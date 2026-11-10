import type { CityId } from "./cities";
import { places } from "./places";

export interface Cafe {
  id: string;
  name: string;
  description: string;
  city: CityId;
  neighbourhood: string;
  dayId: string;
  dayLabel: string;
  href: string;
}

export const cafesIntro = {
  kicker: "Coffee and pastry",
  title: "Cafés & sweets",
  intro:
    "A few sit-down stops that are not the halal kitchens. Pastéis de nata are usually egg, butter and sugar — generally treated as permissible — but some Portuguese pastries use lard, so ask at smaller bakeries.",
};

export const cafes: Cafe[] = [
  {
    id: "granja-hidden",
    name: places.granjaHidden.name,
    description: places.granjaHidden.description,
    city: "barcelona",
    neighbourhood: "Eixample, Girona 59",
    dayId: "day-23",
    dayLabel: "Mon",
    href: "https://hiddencoffeeroasters.com/tienda/granja-hidden/",
  },
  {
    id: "three-marks",
    name: places.threeMarks.name,
    description: places.threeMarks.description,
    city: "barcelona",
    neighbourhood: "Fort Pienc, Ausàs Marc 151",
    dayId: "day-23",
    dayLabel: "Mon after Sant Pau",
    href: "https://www.threemarkscoffee.com/en",
  },
  {
    id: "granja-pallaresa",
    name: places.granjaPallaresa.name,
    description: places.granjaPallaresa.description,
    city: "barcelona",
    neighbourhood: "Gothic Quarter, Petritxol 11",
    dayId: "day-22",
    dayLabel: "Sun",
    href: "https://www.granjaixocolaterialapallaresa.com/",
  },
  {
    id: "blackbird",
    name: places.blackbird.name,
    description: places.blackbird.description,
    city: "valencia",
    neighbourhood: "Near Ruzafa, Reina Na Maria 7",
    dayId: "day-25",
    dayLabel: "Wed evening",
    href: "https://www.google.com/maps/search/?api=1&query=Blackbird+Cafe+Carrer+de+la+Reina+Na+Maria+7+Valencia",
  },
  {
    id: "fav-coffee",
    name: places.favCoffee.name,
    description: places.favCoffee.description,
    city: "valencia",
    neighbourhood: "By the Turia, Cronista Carreres 1",
    dayId: "day-25",
    dayLabel: "Wed",
    href: "https://favcoffee.es/",
  },
  {
    id: "mayan-coffees",
    name: places.mayanCoffees.name,
    description: places.mayanCoffees.description,
    city: "valencia",
    neighbourhood: "Valencia",
    dayId: "day-26",
    dayLabel: "Thu morning",
    href: "https://mayan-coffees.eatbu.com/?lang=en",
  },
  {
    id: "pasteis-belem",
    name: places.pasteisBelem.name,
    description: places.pasteisBelem.description,
    city: "lisbon",
    neighbourhood: "Belém, Rua de Belém 84-92",
    dayId: "day-29",
    dayLabel: "Sun morning",
    href: "https://pasteisdebelem.pt/en/",
  },
  {
    id: "manteigaria-chiado",
    name: places.manteigaria.name,
    description: places.manteigaria.description,
    city: "lisbon",
    neighbourhood: "Chiado on Fri; Belém branch as a Sunday backup",
    dayId: "day-27",
    dayLabel: "Fri (Chiado) · Sun backup (Belém)",
    href: "https://manteigaria.com/en/as-nossas-fabricas/belem/",
  },
  {
    id: "fabrica-coffee",
    name: places.fabricaCoffee.name,
    description: places.fabricaCoffee.description,
    city: "lisbon",
    neighbourhood: "Portas de Santo Antão 136",
    dayId: "day-27",
    dayLabel: "Fri",
    href: "https://fabricacoffeeroasters.com/pages/find-a-store",
  },
  {
    id: "copenhagen-lab",
    name: places.copenhagenLab.name,
    description: places.copenhagenLab.description,
    city: "lisbon",
    neighbourhood: "Campo de Santa Clara, near Graça and Alfama",
    dayId: "day-27",
    dayLabel: "Fri afternoon",
    href: "https://www.google.com/maps/search/?api=1&query=Copenhagen+Coffee+Lab+Campo+de+Santa+Clara+Lisbon",
  },
];
