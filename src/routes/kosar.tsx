import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, Wrench } from "lucide-react";
import unit from "@/assets/klima-unit.png";
import { Page } from "@/components/SiteLayout";
import { CheckRow } from "@/components/Field";
import { formatHuf, pros, regions } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/kosar")({
  head: () => ({
    meta: [
      { title: "Kosár — klíma és telepítés egy csomagban | Klímapiac" },
      {
        name: "description",
        content:
          "Tekintsd át a kosarad, módosítsd a darabszámot, és rendeld a klímát helyi szakember általi beszereléssel.",
      },
      { property: "og:title", content: "Kosár — Klímapiac" },
      { property: "og:description", content: "Klíma + telepítés egy megrendelésben." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const cart = useCart();
  const [region, setRegion] = useState("all");
  const available = pros.filter((p) => (region === "all" ? true : p.region === region));

  if (cart.detailed.length === 0) {
    return (
      <Page>
        <div className="mx-auto flex max-w-md flex-col items-center px-5 py-28 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-sky text-sky-foreground">
            <ShoppingBag className="size-6" />
          </span>
          <h1 className="mt-6 text-2xl font-semibold">A kosarad még üres</h1>
          <p className="mt-2 text-muted-foreground">
            Válaszd ki a szobádhoz illő klímát, a szerelőt pedig itt rendelheted hozzá.
          </p>
          <Link
            to="/klimak"
            className="mt-7 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft"
          >
            Klímák böngészése
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="text-3xl font-semibold">Kosár</h1>
        <p className="mt-2 text-muted-foreground">{cart.count} termék a kosaradban</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            {cart.detailed.map(({ item, product, pro }) => (
              <div key={product.id} className="surface-card flex gap-5 p-5">
                <div className="flex size-24 shrink-0 items-center justify-center rounded-xl bg-secondary/70 p-3">
                  <img
                    src={unit}
                    alt={product.name}
                    loading="lazy"
                    width={1024}
                    height={640}
                    className="w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {product.brand}
                      </p>
                      <h2 className="font-semibold">{product.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {product.energy} · {product.kw} kW
                      </p>
                    </div>
                    <button
                      onClick={() => cart.remove(product.id)}
                      aria-label="Eltávolítás"
                      className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-1 rounded-full border border-border p-1">
                      <button
                        onClick={() => cart.setQty(product.id, item.qty - 1)}
                        aria-label="Kevesebb"
                        className="flex size-8 items-center justify-center rounded-full hover:bg-secondary"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => cart.setQty(product.id, item.qty + 1)}
                        aria-label="Több"
                        className="flex size-8 items-center justify-center rounded-full hover:bg-secondary"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <p className="font-semibold">{formatHuf(product.price * item.qty)}</p>
                  </div>

                  {cart.withInstall && (
                    <div className="mt-4 rounded-xl bg-secondary/60 p-4">
                      <p className="flex items-center gap-2 text-sm font-medium">
                        <Wrench className="size-4" /> Szerelő ehhez a klímához
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {available.map((p) => (
                          <button
                            key={p.id}
                            onClick={() =>
                              cart.setInstallPro(product.id, pro?.id === p.id ? null : p.id)
                            }
                            className={`rounded-full px-3.5 py-2 text-xs transition-colors ${
                              pro?.id === p.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-card text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {p.name} · {p.city} · {formatHuf(p.installPrice)}
                          </button>
                        ))}
                      </div>
                      {!pro && (
                        <p className="mt-3 text-xs text-muted-foreground">
                          Még nincs szakember hozzárendelve ehhez a termékhez.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <CheckRow
              checked={cart.withInstall}
              onChange={() => cart.setWithInstall(!cart.withInstall)}
              title="Kérem a helyi szakember általi beszerelést is"
              description="Bepipálás után termékenként választhatsz szerelőt a régiódból."
            />

            {cart.withInstall && (
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-muted-foreground">Régió szűrése:</span>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="rounded-full bg-secondary px-4 py-2 outline-none"
                >
                  <option value="all">Összes régió</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <Link
                  to="/szakemberek"
                  className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Összes szakember
                </Link>
              </div>
            )}
          </div>

          <aside className="surface-card h-fit space-y-4 p-6 lg:sticky lg:top-24">
            <h2 className="font-semibold">Összesítő</h2>
            <Row label="Termékek" value={formatHuf(cart.subtotal)} />
            <Row
              label="Telepítés"
              value={cart.withInstall ? formatHuf(cart.installTotal) : "Nem kérem"}
            />
            <Row label="Szállítás" value="Ingyenes" />
            <div className="flex items-end justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Fizetendő</span>
              <span className="text-2xl font-semibold">{formatHuf(cart.total)}</span>
            </div>
            <Link
              to="/penztar"
              className="block rounded-full bg-primary py-3.5 text-center text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
            >
              Tovább a pénztárhoz
            </Link>
            <Link
              to="/klimak"
              className="block text-center text-sm text-muted-foreground hover:text-foreground"
            >
              Vásárlás folytatása
            </Link>
          </aside>
        </div>
      </div>
    </Page>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
