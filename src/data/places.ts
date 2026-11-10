/**
 * Canonical place copy. `description` is required: one or two sentences of what
 * the place is, with no invented prices, hours, or tips beyond the trip notes.
 */
export interface Place {
  name: string;
  description: string;
}

export const places = {
  barcelona: {
    name: "Barcelona",
    description:
      "The capital of Catalonia, on Spain’s Mediterranean coast. It is the first and longest stop on this trip.",
  },
  valencia: {
    name: "Valencia",
    description:
      "A compact city on Spain’s east coast, reached from Barcelona by high-speed train. It is the one-night “rest of Spain” stop on this route.",
  },
  lisbon: {
    name: "Lisbon",
    description:
      "Portugal’s capital, on the Tagus estuary. It is the last three nights of the trip, with a Sintra day out.",
  },
  sagrada: {
    name: "Sagrada Família",
    description:
      "Antoni Gaudí’s unfinished basilica in Barcelona, still under construction. The usual visit is the interior and the Nativity façade, with an audioguide app.",
  },
  parkGuell: {
    name: "Park Güell",
    description:
      "A hillside park in northern Barcelona designed by Gaudí, known for its mosaic terrace, serpentine bench and colonnaded hall. Entry is timed; once inside you may stay as long as you like.",
  },
  casaBatllo: {
    name: "Casa Batlló",
    description:
      "A Gaudí house on Passeig de Gràcia whose mosaic façade and undulating interior are the visit. The general visit lasts about an hour and a quarter.",
  },
  laPedrera: {
    name: "La Pedrera (Casa Milà)",
    description:
      "Gaudí’s stone apartment building on Passeig de Gràcia, also called Casa Milà. The Essential visit includes the rooftop of sculptural chimneys.",
  },
  santPau: {
    name: "Sant Pau Recinte Modernista",
    description:
      "A former hospital of brick pavilions and gardens by Lluís Domènech i Montaner, a short walk from the Sagrada Família along Avinguda Gaudí. It is a quieter modernista interior than the Gaudí houses.",
  },
  casaVicens: {
    name: "Casa Vicens",
    description:
      "A smaller early Gaudí house near Park Güell, with coloured tile and a garden. It is optional on this trip if Monday is already full.",
  },
  gothicQuarter: {
    name: "Gothic Quarter",
    description:
      "Barcelona’s medieval core, Ciutat Vella, a dense grid of stone streets around the cathedral. This plan walks it from the outside rather than as a museum circuit.",
  },
  elBorn: {
    name: "El Born",
    description:
      "The medieval neighbourhood east of the Gothic Quarter, around Santa Maria del Mar. It is livelier than the Eixample and can be noisy at night.",
  },
  gracia: {
    name: "Gràcia",
    description:
      "A neighbourhood of squares and local streets north of the Eixample, at the foot of Park Güell. It is a hotel alternative with a more residential feel.",
  },
  laRambla: {
    name: "La Rambla",
    description:
      "Barcelona’s famous pedestrian avenue from Plaça de Catalunya down to the harbour. This plan does not base a hotel here.",
  },
  barcelonaCathedral: {
    name: "Barcelona Cathedral",
    description:
      "The Gothic cathedral of the Holy Cross and Saint Eulalia, in the middle of the old town. This plan sees it from the outside.",
  },
  santaMariaDelMar: {
    name: "Santa Maria del Mar",
    description:
      "A 14th-century church in El Born, built in the Catalan Gothic style with a wide, plain interior. This plan sees it from the outside.",
  },
  portVell: {
    name: "Port Vell",
    description:
      "Barcelona’s old harbour, now a waterfront of walkways and marinas below the Gothic Quarter. It is the easy downhill end of a Ciutat Vella walk.",
  },
  barceloneta: {
    name: "Barceloneta",
    description:
      "The grid of streets and beach east of Port Vell, a former fishing quarter. The Port Cable Car starts from this side of the harbour.",
  },
  passeigDeGracia: {
    name: "Passeig de Gràcia",
    description:
      "The Eixample’s main boulevard, lined with modernista houses including Casa Batlló and La Pedrera. Walking the façades is free.",
  },
  laBoqueria: {
    name: "La Boqueria",
    description:
      "Barcelona’s large public food market just off La Rambla. It is a last-morning option before the Valencia train, not a meal plan.",
  },
  ciutadella: {
    name: "Parc de la Ciutadella",
    description:
      "A large 19th-century park east of El Born, with a fountain, lake and the city zoo at one end. It is a free, flat walk.",
  },
  bunkers: {
    name: "Bunkers del Carmel",
    description:
      "A Civil War anti-aircraft battery on Turó de la Rovira, now an open hilltop with a view over the whole city. It is free; sunset is around 17:26 in late November.",
  },
  montserrat: {
    name: "Montserrat",
    description:
      "A serrated mountain and Benedictine monastery northwest of Barcelona, reached by FGC train and rack railway. It is the alternative Tuesday if Camp Nou is skipped or the mountain is clear.",
  },
  girona: {
    name: "Girona",
    description:
      "A Catalan city inland from the Costa Brava, about 40–50 minutes from Barcelona by Avant train. It is the fog backup if Montserrat is the Tuesday alternative and the mountain is closed in.",
  },
  campNou: {
    name: "Spotify Camp Nou Experience",
    description:
      "A guided visit into the first-tier stands of Barcelona’s rebuilt stadium, with a flexible museum ticket and audio guide. It does not include the pitch or dressing rooms.",
  },
  barcaStorePg: {
    name: "Barça Store, Passeig de Gràcia",
    description:
      "An FC Barcelona official store at Passeig de Gràcia 15. Hours listed: Monday–Saturday 10:00–21:00, Sunday 10:00–20:30.",
  },
  barcaStoreSagrada: {
    name: "Barça Store, Sagrada Família",
    description:
      "An FC Barcelona official store at Carrer de Mallorca 406, by the basilica. Hours listed: Monday–Saturday 10:00–21:00, closed Sunday.",
  },
  barcaStoreCampNou: {
    name: "Barça Store, Camp Nou",
    description:
      "The main FC Barcelona official store at the stadium. Hours listed: daily 10:00–19:00.",
  },
  telefericMontjuic: {
    name: "Telèferic de Montjuïc",
    description:
      "A cable car that climbs the Montjuïc hillside to the castle. In November it is listed as open 10:00–18:00.",
  },
  portCableCar: {
    name: "Port Cable Car (Transbordador Aeri)",
    description:
      "A harbour cable car running from Barceloneta to the Miramar station on Montjuïc. It is a separate line from the Montjuïc Telèferic.",
  },
  mercadoCentral: {
    name: "Mercado Central",
    description:
      "Valencia’s main covered market, an iron-and-tile hall in Ciutat Vella. It is a food market, not a restaurant.",
  },
  laLonja: {
    name: "La Lonja de la Seda",
    description:
      "A late-Gothic silk-exchange hall in Valencia, with twisted stone columns. The interior ticket is €2, Monday–Saturday 10:00–19:00.",
  },
  torresSerranos: {
    name: "Torres de Serranos",
    description:
      "A pair of 14th-century gate-towers on the edge of Valencia’s old town, once the city’s northern gate. They stand on the old riverbed, now the Turia gardens.",
  },
  turia: {
    name: "Turia gardens",
    description:
      "A linear park in the drained riverbed that rings Valencia’s centre. It is the walk from the old town to the City of Arts and Sciences.",
  },
  cityArts: {
    name: "City of Arts and Sciences",
    description:
      "A complex of white buildings and pools at the end of the Turia, designed by Santiago Calatrava and Félix Candela. The grounds are walkable without an interior ticket.",
  },
  oceanografic: {
    name: "Oceanogràfic",
    description:
      "Europe’s largest aquarium, in the City of Arts and Sciences. A visit is about four hours; this plan treats it as an either/or with the Albufera boat.",
  },
  albufera: {
    name: "Albufera boat",
    description:
      "A Visit València outing: a tourist bus plus about 30 minutes on a traditional boat on the Albufera lagoon south of the city, roughly two hours in total. It runs Monday–Saturday.",
  },
  malvarrosa: {
    name: "Malvarrosa",
    description:
      "Valencia’s city beach and seafront promenade, east of the centre. It is a slower afternoon if you are not going inland to the lagoon.",
  },
  ruzafa: {
    name: "Ruzafa",
    description:
      "A grid of streets south of Valencia’s old town, dense with restaurants and bars. Several of the listed halal kitchens are here or a short walk away.",
  },
  parqueEduardoVii: {
    name: "Parque Eduardo VII",
    description:
      "A sloping formal park above Avenida da Liberdade in Lisbon, looking down toward the river. The Central Mosque sits beside it at Praça de Espanha.",
  },
  avenidaLiberdade: {
    name: "Avenida da Liberdade",
    description:
      "Lisbon’s broad tree-lined boulevard from Parque Eduardo VII down toward Baixa. It is a hotel strip with metro to the airport and the Central Mosque.",
  },
  alfama: {
    name: "Alfama",
    description:
      "Lisbon’s oldest hillside neighbourhood above the Tagus, a maze of steep lanes and viewpoints. It is beautiful and awkward with Sunday luggage.",
  },
  santaLuzia: {
    name: "Miradouro de Santa Luzia",
    description:
      "A tiled terrace viewpoint over Alfama’s red roofs toward the river. It is one of three close lookouts on the Friday walk.",
  },
  portasDoSol: {
    name: "Miradouro das Portas do Sol",
    description:
      "A wider viewpoint next to Santa Luzia, looking over Alfama and the Tagus. It sits on the same ridge as the cathedral.",
  },
  graca: {
    name: "Miradouro da Graça",
    description:
      "A viewpoint by the Graça convent, higher than Santa Luzia, looking over the castle and downtown. It is a short uphill from Alfama.",
  },
  seLisbon: {
    name: "Sé de Lisboa",
    description:
      "Lisbon’s cathedral, a fortress-like Romanesque church on the slope between Alfama and Baixa. This plan sees it from the outside.",
  },
  baixa: {
    name: "Baixa",
    description:
      "Lisbon’s flat downtown grid between the river and the hills, rebuilt after the 1755 earthquake. It is the easiest base for metro, luggage and walks to Mouraria.",
  },
  praca: {
    name: "Praça do Comércio",
    description:
      "The large riverfront square at the foot of Baixa, open to the Tagus through a stone arcade. It is the downhill end of the Friday walk.",
  },
  tram28: {
    name: "Tram 28",
    description:
      "A heritage tram that climbs through Baixa, Alfama and Graça. On this plan it is usually too packed to be worth the wait.",
  },
  casteloSaoJorge: {
    name: "Castelo de São Jorge",
    description:
      "A hilltop fortress above Baixa with the best view over downtown and the river. The listed adult ticket is €17.",
  },
  pena: {
    name: "Pena Palace",
    description:
      "A 19th-century Romantic palace above Sintra, painted in red and yellow and set in a forest park. The Essential Visit is palace plus park.",
  },
  sintraTown: {
    name: "Sintra town",
    description:
      "The small historic centre below the palaces, around the national palace and a steep lane of shops. Pack lunch from Lisbon — Sintra has almost no reliable halal sit-down.",
  },
  moorishCastle: {
    name: "Moorish Castle",
    description:
      "A medieval hill fort on the ridge opposite Pena, with walls looking over Sintra and the coast. This plan treats it as a pre-booked afternoon option; prices were not pulled.",
  },
  regaleira: {
    name: "Quinta da Regaleira",
    description:
      "A late-19th-century estate on the edge of Sintra town, with gardens, wells and a neo-Manueline house. This plan treats it as a pre-booked afternoon option; prices were not pulled.",
  },
  cascais: {
    name: "Cascais",
    description:
      "A coastal town west of Lisbon, with a harbour and coloured waterfront houses. It is only if you are ahead of the clock after Sintra.",
  },
  jeronimos: {
    name: "Jerónimos Monastery",
    description:
      "A Manueline monastery in Belém, on the river west of downtown. The cloister ticket is €18, Tuesday–Sunday 9:30–17:30; this plan can also see it from the outside.",
  },
  torreBelem: {
    name: "Torre de Belém",
    description:
      "A 16th-century river fort on the Tagus at Belém. Interior tickets are €15; this plan can also see the exterior from the bank.",
  },
  pasteisBelem: {
    name: "Pastéis de Belém",
    description:
      "The 1837 bakery on Rua de Belém that still sells the original pastel de nata. Expect a queue.",
  },
  telecabine: {
    name: "Parque das Nações Telecabine",
    description:
      "A cable car along the Tagus at Parque das Nações, in eastern Lisbon. It is closed 16–27 November 2026 for maintenance.",
  },
  santaJusta: {
    name: "Santa Justa Lift viewpoint",
    description:
      "An iron lift in Baixa whose top platform looks over the downtown roofs toward the castle. The viewpoint is temporarily closed.",
  },
  cafeArabia: {
    name: "Café Arabia",
    description:
      "A Middle Eastern restaurant in Barcelona’s Gothic Quarter, near La Rambla. Its site states that the kitchen is halal.",
  },
  kapadokya: {
    name: "Kapadokya",
    description:
      "A Turkish restaurant in the Gothic Quarter, with a second branch in Barceloneta. Its site states that it uses halal meat.",
  },
  rasaMalaysia: {
    name: "Rasa Malaysia",
    description:
      "A Malaysian restaurant on Passeig de Sant Joan in Gràcia, on the walk between Park Güell and the Sagrada Família. The site names its meat supplier as Alimentbarna S.L.",
  },
  marrakech: {
    name: "Restaurante Árabe Halal Marrakech",
    description:
      "A Moroccan restaurant in Sants, near Plaça Espanya. It is the handy kitchen before or after a Montserrat train.",
  },
  himalaya: {
    name: "Himalaya",
    description:
      "A restaurant in El Raval’s kebab and Pakistani cluster, near the Tariq mosque. Halal status should be asked on the spot.",
  },
  adilTandoori: {
    name: "Adil Tandoori",
    description:
      "A restaurant in El Raval’s kebab and Pakistani cluster, near the Tariq mosque. Halal status should be asked on the spot.",
  },
  bismillah: {
    name: "Bismillah",
    description:
      "A restaurant in El Raval’s kebab and Pakistani cluster, near the Tariq mosque. Halal status should be asked on the spot.",
  },
  beirutKing: {
    name: "Beirut King",
    description:
      "A Lebanese kitchen in Ruzafa, at Mossèn Femenia 12. The name comes from a secondary listing; confirm halal status in person.",
  },
  kunafa: {
    name: "Kunafa by Afandi",
    description:
      "A sweet and Levantine shop in Valencia’s Ciutat Vella, at Carrer de Sant Martí 3. Confirm halal status in person.",
  },
  frenchCorner: {
    name: "French Corner",
    description:
      "A shawarma kitchen in Valencia’s Ciutat Vella, at Carrer del Hospital 18. Confirm halal status in person.",
  },
  tasteOfPakistan: {
    name: "Taste of Pakistan",
    description:
      "A Pakistani restaurant in Mouraria, at Rua São Pedro Mártir 37B. It sits in the Martim Moniz cluster a short walk from Baixa.",
  },
  ghoroa: {
    name: "Ghoroa",
    description:
      "A restaurant in Mouraria, at Travessa Benformoso 2, in the same cluster as Taste of Pakistan.",
  },
  zaafran: {
    name: "Zaafran",
    description:
      "An Indian restaurant at Rua de São José 35, listed as halal-certified.",
  },
  cantinhoDoAziz: {
    name: "Cantinho do Aziz",
    description:
      "A Mozambican restaurant in Mouraria, at Rua de São Lourenço 5. Halal status is claimed rather than shown as a certification on this plan.",
  },
  mezze: {
    name: "Mezze",
    description:
      "A kitchen inside Mercado de Arroios, in the Arroios district northeast of Baixa.",
  },
  zubir: {
    name: "Zubir Churrasqueira",
    description:
      "A grill restaurant in Roma-Areeiro, at Rua do Zaire 40B. It also appears on the Instituto Halal de Portugal hospitality page.",
  },
  aliBaba: {
    name: "Ali Baba Kebab Haus",
    description:
      "A kebab restaurant at Rua da Palma 25, on the edge of Baixa and Mouraria.",
  },
  mezquitaTariq: {
    name: "Mezquita Tariq Bin Ziyad",
    description:
      "A mosque on Carrer de Sant Rafael in El Raval, a short walk from Ciutat Vella. It is the handy prayer space for the Gothic Quarter and the Raval food streets.",
  },
  ccic: {
    name: "Centre Cultural Islàmic Català",
    description:
      "An Islamic cultural centre and mosque on Carrer de Rafael Capdevila in El Clot. It is the handy prayer space from the eastern Eixample, toward Sagrada.",
  },
  granMezquitaValencia: {
    name: "Gran Mezquita de Valencia",
    description:
      "Valencia’s large mosque on Calle del Palància, in Algirós near Benimaclet. Opening hours in secondary listings were not confirmed on an official mosque page.",
  },
  lisbonCentralMosque: {
    name: "Mesquita Central de Lisboa",
    description:
      "The Central Mosque of Lisbon, at Rua da Mesquita 2 by Praça de Espanha on the Blue Line. It is the largest mosque in Portugal; jumu’ah on this trip is Friday 27 November.",
  },
  eixample: {
    name: "Dreta de l’Eixample",
    description:
      "The grid of streets east of Passeig de Gràcia in Barcelona’s Eixample: regular blocks, metro, and a quieter base than the Ramblas. This plan bases the three Barcelona nights here, toward Sagrada or Verdaguer.",
  },
  ciutatVellaValencia: {
    name: "Ciutat Vella / El Carmen",
    description:
      "Valencia’s old town, including the medieval El Carmen quarter. One night here keeps Wednesday afternoon and Thursday on foot.",
  },
  chiado: {
    name: "Chiado",
    description:
      "A hillside neighbourhood of shops and cafés above Lisbon’s Baixa. It is a flatter-feeling base than Alfama, with a Manteigaria bakery on the Friday café list.",
  },
  marquesPombal: {
    name: "Marquês de Pombal",
    description:
      "The roundabout at the top of Avenida da Liberdade, a metro junction for the airport and the Central Mosque. It is grouped with Baixa and the avenue as a Lisbon hotel base.",
  },
  principeReal: {
    name: "Príncipe Real",
    description:
      "A calmer hilltop neighbourhood northwest of Baixa, with a garden square. It is an uphill alternative to staying downtown.",
  },
  santsStation: {
    name: "Barcelona Sants",
    description:
      "Barcelona’s main long-distance railway station, west of the Eixample. It is the departure point for the high-speed train to Valencia.",
  },
  sorolla: {
    name: "Valencia Joaquín Sorolla",
    description:
      "Valencia’s high-speed station, a short ride from the old town. A nearby midweek service from Sants arrived here at 13:13.",
  },
  rossio: {
    name: "Rossio station",
    description:
      "A central Lisbon station at the top of Baixa. It is the usual boarding point for the regional train to Sintra, about 40 minutes.",
  },
  placaEspanya: {
    name: "Plaça Espanya",
    description:
      "A large square and transport hub at the foot of Montjuïc. The FGC R5 toward Montserrat leaves from here, and the Marrakech restaurant is nearby in Sants.",
  },
  ams: {
    name: "Amsterdam Airport Schiphol (AMS)",
    description:
      "The Netherlands’ main international airport, southwest of Amsterdam. The outbound Vueling leaves from here; be there early for the 07:00 departure.",
  },
  bcn: {
    name: "Barcelona–El Prat (BCN)",
    description:
      "Barcelona’s main airport, southwest of the city. Metro or Aerobus links it to the Eixample or Born.",
  },
  vlc: {
    name: "Valencia Airport (VLC)",
    description:
      "Valencia’s airport, west of the centre. Metro or taxi takes about 25–35 minutes; be there about two hours before the 20:05 Ryanair.",
  },
  lis: {
    name: "Lisbon Airport (LIS)",
    description:
      "Lisbon’s Humberto Delgado Airport, north of downtown. Metro from Baixa is about 30–40 minutes; leave the centre mid-afternoon for the Sunday Transavia.",
  },
  ein: {
    name: "Eindhoven Airport (EIN)",
    description:
      "A smaller Dutch airport southeast of Eindhoven. It is the cheaper Transavia return; there is no morning nonstop out to Barcelona on the 22nd.",
  },
  granjaHidden: {
    name: "Granja Hidden",
    description:
      "Hidden Coffee Roasters in the restored 1921 Granja Vendrell: an Art Deco room for Viennese coffee and Nata Vendrell, at Girona 59 in the Eixample.",
  },
  threeMarks: {
    name: "Three Marks Coffee",
    description:
      "A specialty espresso bar near the Sagrada Família, at Ausàs Marc 151 in Fort Pienc.",
  },
  granjaPallaresa: {
    name: "Granja La Pallaresa",
    description:
      "A classic Barcelona granja for chocolate and churros, at Carrer de Petritxol 11 in the Gothic Quarter.",
  },
  blackbird: {
    name: "Blackbird",
    description:
      "A specialty coffee shop with seasonal drinks and in-house pastry, at Carrer de la Reina Na Maria 7, near Ruzafa.",
  },
  favCoffee: {
    name: "FAV Coffee",
    description:
      "A bright all-day specialty café by the Turia gardens, at Carrer del Cronista Carreres 1.",
  },
  mayanCoffees: {
    name: "Mayan Coffees",
    description:
      "A Valencia roaster with a café for simple breakfasts.",
  },
  manteigaria: {
    name: "Manteigaria",
    description:
      "A well-known pastel de nata bakery with a glass kitchen. This plan uses the Chiado shop on Friday and the Belém branch as a Sunday backup.",
  },
  fabricaCoffee: {
    name: "Fábrica Coffee Roasters",
    description:
      "A Lisbon specialty roaster with a café at Portas de Santo Antão 136, just above Baixa.",
  },
  copenhagenLab: {
    name: "Copenhagen Coffee Lab, Campo de Santa Clara",
    description:
      "A specialty café near Graça and Alfama, on Campo de Santa Clara.",
  },
} as const satisfies Record<string, Place>;

export type PlaceId = keyof typeof places;

export function place(id: PlaceId): Place {
  return places[id];
}
