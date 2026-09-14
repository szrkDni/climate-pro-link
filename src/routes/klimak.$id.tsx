import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, ShieldCheck, Truck } from "lucide-react";
import unit from "@/assets/klima-unit.png";
import { Page } from "@/components/SiteLayout";
import { ProCard } from "@/components/ProCard";
import { formatHuf, products, pros, regions, type Pro } from "@/data/catalog";

export const Route = createFileRoute("/klimak/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "A termék nem található | Klímapiac" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.brand} ${product.name} — telepítéssel | Klímapiac`;
    return {
      meta: [
        { title },
        { name: "description", content: product.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: product.summary },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const cart = useCart();
  const navigate = useNavigate();
  const [withInstall, setWithInstall] = useState(true);
  const [region, setRegion] = useState("all");
  const [pro, setPro] = useState<Pro | null>(null);

  const list = useMemo(
    () => pros.filter((p) => (region === "all" ? true : p.region === region)).slice(0, 3),
    [region],
  );

  const total = product.price + (withInstall && pro ? pro.installPrice : 0);

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <Link
          to="/klimak"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Vissza a katalógushoz
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="surface-card flex h-[380px] items-center justify-center bg-secondary/50 p-10">
            <img
              src={unit}
              alt={`${product.brand} ${product.name}`}
              width={1024}
              height={640}
              className="max-h-56 w-auto object-contain"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {product.brand}
            </p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-muted-foreground">{product.summary}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <Spec label="Energiaosztály" value={product.energy} />
              <Spec label="Teljesítmény" value={`${product.kw} kW`} />
              <Spec label="Ajánlott méret" value={product.roomSize} />
              <Spec label="Zajszint" value={`${product.noise} dB`} />
            </dl>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="size-4 text-mint-foreground" /> {f}
                </li>
              ))}
            </ul>

            <div className="surface-card mt-8 space-y-4 p-5">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={withInstall}
                  onChange={() => setWithInstall((v) => !v)}
                  className="mt-1 size-4 accent-[var(--primary)]"
                />
                <span>
                  <span className="font-medium">Telepítéssel kérem</span>
                  <span className="block text-sm text-muted-foreground">
                    Válassz helyi szakembert, a telepítés díja a végösszegben jelenik meg.
                  </span>
                </span>
              </label>

              <div className="flex items-end justify-between border-t border-border pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Végösszeg</p>
                  <p className="text-2xl font-semibold">{formatHuf(total)}</p>
                  {withInstall && !pro && (
                    <p className="text-xs text-muted-foreground">
                      Válassz szakembert a telepítési díjhoz
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    cart.add(product.id, withInstall ? (pro?.id ?? null) : null);
                    navigate({ to: "/kosar" });
                  }}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
                >
                  Kosárba teszem
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="size-3.5" /> 2–4 munkanapos szállítás
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5" /> 5 év gyártói garancia
                </span>
              </div>
            </div>
          </div>
        </div>

        {withInstall && (
          <section className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Válassz szakembert a telepítéshez</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fix árak, valós szabad kapacitás a környékedről.
                </p>
              </div>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="rounded-full bg-secondary px-4 py-2.5 text-sm outline-none"
              >
                <option value="all">Összes régió</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <ProCard
                  key={p.id}
                  pro={p}
                  selected={pro?.id === p.id}
                  onSelect={(x) => setPro(pro?.id === x.id ? null : x)}
                  actionLabel="Ezt választom"
                />
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/szakemberek"
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Összes szakember megtekintése
              </Link>
            </div>
          </section>
        )}
      </div>
    </Page>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary px-4 py-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}
