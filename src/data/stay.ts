import type { Rich } from "@/lib/rich";
import type { CityId } from "./cities";

export interface Stay {
  city: CityId;
  title: string;
  /** The recommended base, in bold in the source. */
  base: string;
  body: Rich;
}

export const stayIntro = { kicker: "Hotels", title: "Where to stay" };

export const stays: Stay[] = [
  {
    city: "barcelona",
    title: "Barcelona, 3 nights",
    base: "Dreta de l’Eixample",
    body: ", around Passeig de Gràcia or toward Sagrada / Verdaguer — central, metro-rich, quieter than the Ramblas. El Born if you want atmosphere (it can be noisy); Gràcia for a local feel near Park Güell. Avoid basing on La Rambla itself.",
  },
  {
    city: "valencia",
    title: "Valencia, 1 night",
    base: "Ciutat Vella / El Carmen",
    body: "so Wednesday afternoon and Thursday are on foot. Ruzafa if you prefer the food streets and will walk or metro 15–20 minutes.",
  },
  {
    city: "lisbon",
    title: "Lisbon, 3 nights",
    base: "Baixa, Chiado, or Avenida da Liberdade / Marquês de Pombal",
    body: "— flatter, metro to the airport and to the Central Mosque, easy to Mouraria. Alfama is beautiful but steep and awkward with Sunday luggage. Príncipe Real is a calmer uphill option.",
  },
];
