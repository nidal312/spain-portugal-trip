import type { Rich } from "@/lib/rich";
import type { CityId } from "./cities";
import { places } from "./places";

export interface StayArea {
  name: string;
  description: string;
}

export interface Stay {
  city: CityId;
  title: string;
  /** The recommended base, in bold in the source. */
  base: string;
  description: string;
  body: Rich;
  areas: StayArea[];
}

export const stayIntro = { kicker: "Hotels", title: "Where to stay" };

export const stays: Stay[] = [
  {
    city: "barcelona",
    title: "Barcelona, 3 nights",
    base: places.eixample.name,
    description: places.eixample.description,
    body: "Around Passeig de Gràcia or toward Sagrada / Verdaguer — central, metro-rich, quieter than the Ramblas.",
    areas: [
      { name: places.elBorn.name, description: places.elBorn.description },
      { name: places.gracia.name, description: places.gracia.description },
      { name: places.laRambla.name, description: places.laRambla.description },
    ],
  },
  {
    city: "valencia",
    title: "Valencia, 1 night",
    base: places.ciutatVellaValencia.name,
    description: places.ciutatVellaValencia.description,
    body: "Ruzafa if you prefer the food streets and will walk or metro 15–20 minutes.",
    areas: [{ name: places.ruzafa.name, description: places.ruzafa.description }],
  },
  {
    city: "lisbon",
    title: "Lisbon, 3 nights",
    base: "Baixa, Chiado, or Avenida da Liberdade / Marquês de Pombal",
    description:
      "Flatter hotel strips with metro to the airport and the Central Mosque, and an easy walk to Mouraria.",
    body: "Alfama is beautiful but steep and awkward with Sunday luggage. Príncipe Real is a calmer uphill option.",
    areas: [
      { name: places.baixa.name, description: places.baixa.description },
      { name: places.chiado.name, description: places.chiado.description },
      { name: places.avenidaLiberdade.name, description: places.avenidaLiberdade.description },
      { name: places.marquesPombal.name, description: places.marquesPombal.description },
      { name: places.alfama.name, description: places.alfama.description },
      { name: places.principeReal.name, description: places.principeReal.description },
    ],
  },
];
