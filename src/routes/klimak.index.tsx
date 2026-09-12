import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { brands, energyClasses, products, type Product } from "@/data/catalog";

export const Route = createFileRoute("/klimak/")({
  head: () => ({
    meta: [
      { title: "Klíma katalógus — energiaosztály és teljesítmény szűrővel | Klímapiac" },
      {
        name: "description",
        content:
          "Böngéssz inverteres klímák között márka, energiaosztály és teljesítmény szerint. Kérd telepítéssel, helyi szakemberrel.",
      },
      { property: "og:title", content: "Klíma katalógus — Klímapiac" },
      {
        property: "og:description",
        content: "Szűrj márkára, energiaosztályra és teljesítményre, és kérd telepítéssel.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [brand, setBrand] = useState<string[]>([]);
  const [energy, setEnergy] = useState<string[]>([]);
  const [maxKw, setMaxKw] = useState(7);
  const [withInstall, setWithInstall] = useState(true);
  const [sort, setSort] = useState<"pop" | "asc" | "desc">("pop");

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const list = useMemo(() => {
    const filtered = products
      .filter((p) => (brand.length ? brand.includes(p.brand) : true))
      .filter((p) => (energy.length ? energy.includes(p.energy) : true))
      .filter((p) => p.kw <= maxKw);
    if (sort === "asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [brand, energy, maxKw, sort]);

  return (
    <Page>
      <section className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h1 className="text-4xl font-semibold sm:text-5xl">Klíma katalógus</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Válaszd ki a szobádhoz illő teljesítményt, majd kérd telepítéssel egy helyi
            szakembertől.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="surface-card h-fit space-y-7 p-6 lg:sticky lg:top-24">
          <Filter title="Márka">
            {brands.map((b) => (
              <Check
                key={b}
                label={b}
                checked={brand.includes(b)}
                onChange={() => toggle(brand, setBrand, b)}
              />
            ))}
          </Filter>

          <Filter title="Energiaosztály">
            {energyClasses.map((e) => (
              <Check
                key={e}
                label={e}
                checked={energy.includes(e)}
                onChange={() => toggle(energy, setEnergy, e)}
              />
            ))}
          </Filter>

          <Filter title={`Teljesítmény — max. ${maxKw} kW`}>
            <input
              type="range"
              min={2}
              max={7}
              step={0.5}
              value={maxKw}
              onChange={(e) => setMaxKw(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
          </Filter>

          <Filter title="Szolgáltatás">
            <Check
              label="Telepítéssel kérem"
              checked={withInstall}
              onChange={() => setWithInstall((v) => !v)}
            />
            <p className="pt-1 text-xs text-muted-foreground">
              A szakembert a termékoldalon választhatod ki.
            </p>
          </Filter>
        </aside>

        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{list.length} termék</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "pop" | "asc" | "desc")}
              className="rounded-full bg-secondary px-4 py-2 text-sm outline-none"
            >
              <option value="pop">Népszerűség</option>
              <option value="asc">Ár szerint növekvő</option>
              <option value="desc">Ár szerint csökkenő</option>
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {list.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">
              Nincs a szűrésnek megfelelő termék.
            </p>
          )}
        </section>
      </div>
    </Page>
  );
}

function Filter({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <p className="text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 rounded accent-[var(--primary)]"
      />
      {label}
    </label>
  );
}
