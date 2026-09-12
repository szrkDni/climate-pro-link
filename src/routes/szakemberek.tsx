import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Page } from "@/components/SiteLayout";
import { ProCard } from "@/components/ProCard";
import { pros, regions, type Pro } from "@/data/catalog";

export const Route = createFileRoute("/szakemberek")({
  head: () => ({
    meta: [
      { title: "Klímaszerelő kereső város és régió szerint | Klímapiac" },
      {
        name: "description",
        content:
          "Ellenőrzött helyi klímaszerelők árakkal, szabad kapacitással és értékelésekkel. Válassz szakembert a telepítéshez néhány kattintással.",
      },
      { property: "og:title", content: "Helyi klímaszerelők — Klímapiac" },
      {
        property: "og:description",
        content: "Szűrj régióra és városra, hasonlítsd össze a telepítési árakat.",
      },
    ],
  }),
  component: ProsPage,
});

function ProsPage() {
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"rating" | "price">("rating");
  const [selected, setSelected] = useState<Pro | null>(null);

  const list = useMemo(() => {
    return pros
      .filter((p) => (region === "all" ? true : p.region === region))
      .filter((p) =>
        query.trim()
          ? `${p.city} ${p.name} ${p.company}`.toLowerCase().includes(query.toLowerCase())
          : true,
      )
      .sort((a, b) =>
        sort === "rating" ? b.rating - a.rating : a.installPrice - b.installPrice,
      );
  }, [region, query, sort]);

  return (
    <Page>
      <section className="gradient-soft border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="max-w-2xl text-4xl font-semibold sm:text-5xl">
            Találd meg a hozzád legközelebbi klímaszerelőt
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Minden szakember ellenőrzött, fix telepítési árral és valós szabad kapacitással
            dolgozik.
          </p>

          <div className="surface-card mt-8 flex flex-col gap-3 p-4 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary px-4">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Város vagy szakember neve"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="rounded-xl bg-secondary px-4 py-3 text-sm outline-none"
            >
              <option value="all">Összes régió</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "rating" | "price")}
              className="rounded-xl bg-secondary px-4 py-3 text-sm outline-none"
            >
              <option value="rating">Legjobb értékelés</option>
              <option value="price">Legkedvezőbb ár</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="mb-6 text-sm text-muted-foreground">
          {list.length} szakember a keresésedre
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((pro) => (
            <ProCard
              key={pro.id}
              pro={pro}
              selected={selected?.id === pro.id}
              onSelect={(p) => setSelected(selected?.id === p.id ? null : p)}
            />
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            Ebben a régióban még nincs elérhető szakember.
          </p>
        )}
      </section>

      {selected && (
        <div className="sticky bottom-4 z-40 mx-auto max-w-3xl px-5">
          <div className="surface-card flex flex-wrap items-center justify-between gap-3 p-4 shadow-lift">
            <p className="text-sm">
              Kiválasztva: <span className="font-semibold">{selected.name}</span> —{" "}
              {selected.city}
            </p>
            <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
              Időpont egyeztetése
            </button>
          </div>
        </div>
      )}
    </Page>
  );
}
