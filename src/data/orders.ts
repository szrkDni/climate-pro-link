export type OrderStatus = "pending" | "install" | "done";

export type Order = {
  id: string;
  date: string;
  productId: string;
  qty: number;
  proId: string | null;
  appointment: string | null;
  total: number;
  status: OrderStatus;
};

export const statusLabels: Record<OrderStatus, string> = {
  pending: "Függőben",
  install: "Szerelésre vár",
  done: "Teljesítve",
};

export const orders: Order[] = [
  {
    id: "KP-2026-1043",
    date: "2026. 09. 02.",
    productId: "aura-25",
    qty: 1,
    proId: "kovacs",
    appointment: "2026. 09. 18. 9:00–12:00",
    total: 398000,
    status: "install",
  },
  {
    id: "KP-2026-0987",
    date: "2026. 08. 14.",
    productId: "breeze-26",
    qty: 1,
    proId: null,
    appointment: null,
    total: 239000,
    status: "pending",
  },
  {
    id: "KP-2026-0812",
    date: "2026. 06. 27.",
    productId: "nordic-35",
    qty: 1,
    proId: "nagy",
    appointment: "2026. 07. 03. 13:00–16:00",
    total: 483000,
    status: "done",
  },
];

export type Job = {
  id: string;
  customer: string;
  city: string;
  productName: string;
  date: string;
  fee: number;
  status: "new" | "accepted" | "done";
};

export const jobs: Job[] = [
  {
    id: "M-318",
    customer: "Kiss Anna",
    city: "Budapest, XI. kerület",
    productName: "Daikin Aura Comfort 2.5 kW",
    date: "2026. 09. 18. 9:00",
    fee: 69000,
    status: "new",
  },
  {
    id: "M-315",
    customer: "Farkas Máté",
    city: "Budaörs",
    productName: "Panasonic Vento Max 5.2 kW",
    date: "2026. 09. 21. 13:00",
    fee: 84000,
    status: "accepted",
  },
  {
    id: "M-309",
    customer: "Balogh Réka",
    city: "Budapest, II. kerület",
    productName: "Gree Breeze Pastel 2.6 kW",
    date: "2026. 09. 09. 10:00",
    fee: 64000,
    status: "done",
  },
];

export const jobStatusLabels: Record<Job["status"], string> = {
  new: "Új igény",
  accepted: "Elvállalva",
  done: "Teljesítve",
};
