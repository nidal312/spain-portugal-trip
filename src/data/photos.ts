import alfama from "@img/alfama.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import belem from "@img/belem.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import bunkers from "@img/bunkers.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import casaBatllo from "@img/casa_batllo.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import cascais from "@img/cascais.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import cityArts from "@img/city_arts.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import gothic from "@img/gothic.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import hero from "@img/hero.jpg?w=640;960;1200&format=webp;jpg&as=picture";
import laPedrera from "@img/la_pedrera.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import lonja from "@img/lonja.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import mercado from "@img/mercado.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import montserrat from "@img/montserrat.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import parkGuell from "@img/park_guell.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import pena from "@img/pena.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import praca from "@img/praca.jpg?w=480;800;1200&format=webp;jpg&as=picture";
import sagrada from "@img/sagrada.jpg?w=480;800;1200&format=webp;jpg&as=picture";

export type Picture = typeof hero;

export interface License {
  name: string;
  url: string;
}

const LICENSES = {
  ccBySa40: { name: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0" },
  ccBySa30: { name: "CC BY-SA 3.0", url: "https://creativecommons.org/licenses/by-sa/3.0" },
  ccBy40: { name: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0" },
  ccBy20: { name: "CC BY 2.0", url: "https://creativecommons.org/licenses/by/2.0" },
  cc0: { name: "CC0", url: "https://creativecommons.org/publicdomain/zero/1.0/deed.en" },
} satisfies Record<string, License>;

export interface Photo {
  picture: Picture;
  width: number;
  height: number;
  alt: string;
  /** Short caption shown under the photo, e.g. "Gothic Quarter". */
  caption: string;
  artist: string;
  license: License;
  fileUrl: string;
  /** Label used in the footer credit list, e.g. "File:Gothic Quarter, Barcelona (42).jpg". */
  fileLabel: string;
  /** Subject label used in the footer credit list. */
  creditLabel: string;
}

export const photos = {
  hero: {
    picture: hero,
    width: 1200,
    height: 801,
    alt: "Barcelona skyline seen from El Carmel, with the Sagrada Família rising above the city",
    caption: "Barcelona from El Carmel",
    creditLabel: "Barcelona from El Carmel",
    artist: "Jcca76",
    license: LICENSES.ccBySa40,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Barcelona_desde_El_Carmelo.JPG",
    fileLabel: "File:Barcelona desde El Carmelo.JPG",
  },
  sagrada: {
    picture: sagrada,
    width: 1200,
    height: 788,
    alt: "The Nativity façade of the Sagrada Família",
    caption: "Sagrada Família",
    creditLabel: "Sagrada Família",
    artist: "Ronny Siegel",
    license: LICENSES.ccBy40,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Sagrada_Familia_in_Barcelona_10.jpg",
    fileLabel: "File:Sagrada Familia in Barcelona 10.jpg",
  },
  parkGuell: {
    picture: parkGuell,
    width: 1200,
    height: 800,
    alt: "The mosaic terrace and serpentine bench at Park Güell",
    caption: "Park Güell terrace",
    creditLabel: "Park Güell terrace",
    artist: "Julian Lupyan",
    license: LICENSES.cc0,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Terrace_of_Parc_G%C3%BCell,_Barcelona,_Spain.jpg",
    fileLabel: "File:Terrace of Parc Güell, Barcelona, Spain.jpg",
  },
  casaBatllo: {
    picture: casaBatllo,
    width: 1200,
    height: 778,
    alt: "The colourful mosaic façade of Casa Batlló",
    caption: "Casa Batlló",
    creditLabel: "Casa Batlló",
    artist: "José Luiz",
    license: LICENSES.ccBySa30,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Exterior_of_Casa_Batl%C3%B3_-_Barcelona_2014.jpg",
    fileLabel: "File:Exterior of Casa Batló - Barcelona 2014.jpg",
  },
  laPedrera: {
    picture: laPedrera,
    width: 1200,
    height: 800,
    alt: "Sculptural stone chimneys on the rooftop of La Pedrera",
    caption: "La Pedrera rooftop",
    creditLabel: "La Pedrera rooftop",
    artist: "Mikani",
    license: LICENSES.ccBySa40,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Chimneys_of_Casa_Mil%C3%A0_by_Mikani_-_IMG_2431.jpg",
    fileLabel: "File:Chimneys of Casa Milà by Mikani - IMG 2431.jpg",
  },
  bunkers: {
    picture: bunkers,
    width: 1200,
    height: 799,
    alt: "Barcelona spread out below the Bunkers del Carmel viewpoint",
    caption: "Bunkers del Carmel",
    creditLabel: "Bunkers del Carmel",
    artist: "Alexey Komarov",
    license: LICENSES.ccBySa40,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Barcelona,_View_from_Bunkers_del_Carmel.jpg",
    fileLabel: "File:Barcelona, View from Bunkers del Carmel.jpg",
  },
  montserrat: {
    picture: montserrat,
    width: 1200,
    height: 800,
    alt: "The monastery of Montserrat set against serrated mountain peaks",
    caption: "Montserrat monastery",
    creditLabel: "Montserrat",
    artist: "Txllxt TxllxT",
    license: LICENSES.ccBySa40,
    fileUrl:
      "https://commons.wikimedia.org/wiki/File:Montserrat_-_Santa_Maria_de_Montserrat_-_Monestir_de_Montserrat_-_View_SSE.jpg",
    fileLabel: "File:Montserrat … View SSE.jpg",
  },
  gothic: {
    picture: gothic,
    width: 1200,
    height: 800,
    alt: "A stone street in Barcelona’s Gothic Quarter",
    caption: "Gothic Quarter",
    creditLabel: "Gothic Quarter",
    artist: "Richard Mortel",
    license: LICENSES.ccBy20,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Gothic_Quarter,_Barcelona_(42)_(30447514613).jpg",
    fileLabel: "File:Gothic Quarter, Barcelona (42).jpg",
  },
  cityArts: {
    picture: cityArts,
    width: 1200,
    height: 712,
    alt: "The City of Arts and Sciences in Valencia, white buildings over blue pools",
    caption: "City of Arts and Sciences",
    creditLabel: "City of Arts and Sciences",
    artist: "Diego Delso",
    license: LICENSES.ccBySa30,
    fileUrl:
      "https://commons.wikimedia.org/wiki/File:Ciudad_de_las_Artes_y_las_Ciencias,_Valencia,_Espa%C3%B1a,_2014-06-29,_DD_39.JPG",
    fileLabel: "File:… DD 39.JPG",
  },
  mercado: {
    picture: mercado,
    width: 1200,
    height: 775,
    alt: "The iron-and-tile interior of Valencia’s Mercado Central",
    caption: "Mercado Central",
    creditLabel: "Mercado Central",
    artist: "Diego Delso",
    license: LICENSES.ccBySa40,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Mercado_Central,_Valencia,_Espa%C3%B1a,_2014-06-30,_DD_116.JPG",
    fileLabel: "File:… DD 116.JPG",
  },
  lonja: {
    picture: lonja,
    width: 1200,
    height: 800,
    alt: "The Gothic hall of La Lonja de la Seda in Valencia, with twisted stone columns",
    caption: "La Lonja de la Seda",
    creditLabel: "La Lonja de la Seda",
    artist: "Coralma*",
    license: LICENSES.cc0,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Valencia_-_La_Lonja_de_la_Seda_2.jpg",
    fileLabel: "File:Valencia - La Lonja de la Seda 2.jpg",
  },
  alfama: {
    picture: alfama,
    width: 1200,
    height: 801,
    alt: "View over the red roofs of Alfama from the Santa Luzia viewpoint in Lisbon",
    caption: "Miradouro de Santa Luzia, Alfama",
    creditLabel: "Alfama, Santa Luzia",
    artist: "Jorge Franganillo",
    license: LICENSES.ccBy20,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Lisboa_-_Miradouro_de_Santa_Luzia_(53851940999).jpg",
    fileLabel: "File:Lisboa - Miradouro de Santa Luzia.jpg",
  },
  praca: {
    picture: praca,
    width: 1200,
    height: 800,
    alt: "Praça do Comércio in Lisbon opening toward the Tagus",
    caption: "Praça do Comércio",
    creditLabel: "Praça do Comércio",
    artist: "NorbertNagel",
    license: LICENSES.ccBySa40,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Praca_do_Comercio_-_Lisbon_-_Portugal.jpg",
    fileLabel: "File:Praca do Comercio - Lisbon - Portugal.jpg",
  },
  pena: {
    picture: pena,
    width: 1200,
    height: 800,
    alt: "The colourful Pena Palace above the forests of Sintra",
    caption: "Pena Palace",
    creditLabel: "Pena Palace",
    artist: "CEphoto, Uwe Aranas",
    license: LICENSES.ccBySa30,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Sintra_Portugal_Pal%C3%A1cio_da_Pena-01.jpg",
    fileLabel: "File:Sintra Portugal Palácio da Pena-01.jpg",
  },
  cascais: {
    picture: cascais,
    width: 1200,
    height: 800,
    alt: "The waterfront and coloured houses of Cascais",
    caption: "Cascais waterfront",
    creditLabel: "Cascais waterfront",
    artist: "Terry Kearney",
    license: LICENSES.cc0,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Waterfront_at_Cascais_(46957639515).jpg",
    fileLabel: "File:Waterfront at Cascais.jpg",
  },
  belem: {
    picture: belem,
    width: 1200,
    height: 1145,
    alt: "Belém Tower on the Tagus in Lisbon",
    caption: "Belém Tower",
    creditLabel: "Belém Tower",
    artist: "Alvesgaspar",
    license: LICENSES.ccBySa30,
    fileUrl: "https://commons.wikimedia.org/wiki/File:Torre_Bel%C3%A9m_April_2009-4a.jpg",
    fileLabel: "File:Torre Belém April 2009-4a.jpg",
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;

/** Order of the footer credit list. */
export const creditOrder: PhotoId[] = [
  "hero",
  "sagrada",
  "parkGuell",
  "casaBatllo",
  "laPedrera",
  "bunkers",
  "montserrat",
  "gothic",
  "cityArts",
  "mercado",
  "lonja",
  "alfama",
  "praca",
  "pena",
  "cascais",
  "belem",
];
