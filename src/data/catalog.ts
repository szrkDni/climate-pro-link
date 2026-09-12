export type Product = {
  id: string;
  brand: string;
  name: string;
  price: number;
  energy: "A+++" | "A++" | "A+";
  kw: number;
  roomSize: string;
  wifi: boolean;
  noise: number;
  badge?: string;
  summary: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: "aura-25",
    brand: "Daikin",
    name: "Aura Comfort 2.5 kW",
    price: 329000,
    energy: "A+++",
    kw: 2.5,
    roomSize: "20–25 m²",
    wifi: true,
    noise: 19,
    badge: "Legnépszerűbb",
    summary:
      "Halk, energiatakarékos oldalfali split klíma kis és közepes szobákhoz, okos vezérléssel.",
    features: [
      "19 dB éjszakai üzemmód",
      "Wi-Fi és mobilalkalmazás",
      "Öntisztító párologtató",
      "R32 hűtőközeg",
    ],
  },
  {
    id: "nordic-35",
    brand: "Mitsubishi",
    name: "Nordic Pure 3.5 kW",
    price: 419000,
    energy: "A+++",
    kw: 3.5,
    roomSize: "28–35 m²",
    wifi: true,
    noise: 21,
    badge: "Csendes",
    summary:
      "Nappalikba ajánlott, erős fűtési teljesítménnyel akár -25 °C külső hőmérsékletig.",
    features: [
      "Fűtés -25 °C-ig",
      "Plazma légtisztító szűrő",
      "Wi-Fi vezérlés",
      "10 év garancia opció",
    ],
  },
  {
    id: "breeze-26",
    brand: "Gree",
    name: "Breeze Pastel 2.6 kW",
    price: 239000,
    energy: "A++",
    kw: 2.6,
    roomSize: "20–26 m²",
    wifi: false,
    noise: 23,
    summary: "Kedvező árú, megbízható belépő modell hálószobákba és irodákba.",
    features: ["Alvó üzemmód", "Páramentesítés", "Öndiagnosztika", "R32 hűtőközeg"],
  },
  {
    id: "vento-52",
    brand: "Panasonic",
    name: "Vento Max 5.2 kW",
    price: 549000,
    energy: "A++",
    kw: 5.2,
    roomSize: "45–55 m²",
    wifi: true,
    noise: 26,
    badge: "Nagy terekre",
    summary: "Nagy nappalikba és üzlethelyiségekbe tervezett, erős multiflow légáramlással.",
    features: ["Széles légterelés", "nanoe™ X légtisztítás", "Wi-Fi", "Heti időzítő"],
  },
  {
    id: "silens-20",
    brand: "Daikin",
    name: "Silens Mini 2.0 kW",
    price: 289000,
    energy: "A+++",
    kw: 2.0,
    roomSize: "15–20 m²",
    wifi: true,
    noise: 18,
    badge: "Legcsendesebb",
    summary: "A legkisebb zajszintű modellünk gyerekszobákba és kis hálókba.",
    features: ["18 dB", "Jelenlétérzékelő", "Wi-Fi", "Finom légterelés"],
  },
  {
    id: "terra-70",
    brand: "LG",
    name: "Terra Duo 7.0 kW",
    price: 689000,
    energy: "A+",
    kw: 7.0,
    roomSize: "60–70 m²",
    wifi: true,
    noise: 29,
    summary: "Nagy teljesítményű megoldás nyitott terekhez, irodákhoz és üzletekhez.",
    features: ["Dual inverter", "Gyors hűtés", "Wi-Fi", "Erős szűrőrendszer"],
  },
];

export const brands = [...new Set(products.map((p) => p.brand))];
export const energyClasses: Product["energy"][] = ["A+++", "A++", "A+"];

export type Pro = {
  id: string;
  name: string;
  company: string;
  city: string;
  region: string;
  rating: number;
  reviews: number;
  installPrice: number;
  availability: string;
  years: number;
  specialties: string[];
  initials: string;
};

export const pros: Pro[] = [
  {
    id: "kovacs",
    name: "Kovács Péter",
    company: "KlímaPont Bt.",
    city: "Budapest",
    region: "Közép-Magyarország",
    rating: 4.9,
    reviews: 214,
    installPrice: 69000,
    availability: "Legközelebbi szabad időpont: 4 nap",
    years: 12,
    specialties: ["Oldalfali split", "Multi rendszer", "Karbantartás"],
    initials: "KP",
  },
  {
    id: "nagy",
    name: "Nagy Tímea",
    company: "Hűvös Otthon Kft.",
    city: "Budaörs",
    region: "Közép-Magyarország",
    rating: 4.8,
    reviews: 132,
    installPrice: 64000,
    availability: "Legközelebbi szabad időpont: 2 nap",
    years: 8,
    specialties: ["Lakásfelújítás", "Rejtett vezetékezés"],
    initials: "NT",
  },
  {
    id: "szabo",
    name: "Szabó Gábor",
    company: "Szabó Klímaszerviz",
    city: "Debrecen",
    region: "Észak-Alföld",
    rating: 4.7,
    reviews: 98,
    installPrice: 59000,
    availability: "Legközelebbi szabad időpont: 6 nap",
    years: 15,
    specialties: ["Ipari egységek", "Hőszivattyú"],
    initials: "SZG",
  },
  {
    id: "toth",
    name: "Tóth Bence",
    company: "AirFix Team",
    city: "Szeged",
    region: "Dél-Alföld",
    rating: 4.9,
    reviews: 176,
    installPrice: 62000,
    availability: "Legközelebbi szabad időpont: 3 nap",
    years: 9,
    specialties: ["Gyors kiszállás", "Hétvégi telepítés"],
    initials: "TB",
  },
  {
    id: "horvath",
    name: "Horváth Anna",
    company: "Pannon Klíma",
    city: "Győr",
    region: "Nyugat-Dunántúl",
    rating: 4.8,
    reviews: 143,
    installPrice: 66000,
    availability: "Legközelebbi szabad időpont: 5 nap",
    years: 11,
    specialties: ["Új építés", "Multi rendszer"],
    initials: "HA",
  },
  {
    id: "varga",
    name: "Varga Zsolt",
    company: "Balaton Air",
    city: "Veszprém",
    region: "Közép-Dunántúl",
    rating: 4.6,
    reviews: 87,
    installPrice: 57000,
    availability: "Legközelebbi szabad időpont: 8 nap",
    years: 6,
    specialties: ["Nyaralók", "Karbantartás"],
    initials: "VZS",
  },
];

export const regions = [...new Set(pros.map((p) => p.region))];

export const formatHuf = (value: number) =>
  new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(value);
