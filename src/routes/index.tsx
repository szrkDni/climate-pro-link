import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PackageCheck, Sparkles, Users, Wrench } from "lucide-react";
import hero from "@/assets/hero-klima.jpg";
import { Page } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { ProCard } from "@/components/ProCard";
import { products, pros } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Klímapiac — klíma vásárlás helyi szakemberrel, egy helyen" },
      {
        name: "description",
        content:
          "Válassz inverteres klímát energiaosztály és teljesítmény szerint, majd foglalj hozzá ellenőrzött helyi klímaszerelőt fix telepítési áron.",
      },
      { property: "og:title", content: "Klímapiac — klíma és telepítés egy helyen" },
      {
        property: "og:description",
        content: "Klíma webshop és helyi szakember-hálózat átlátható árakkal.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Page>
      <section className="gradient-soft border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
              <Sparkles className="size-3.5" /> Klíma + telepítés egy rendelésben
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-6xl">
              Hűvös otthon,
              <br />
              megbízható szakemberrel.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Válaszd ki a szobádhoz illő klímát, majd egyetlen kattintással foglald hozzá a
              környékbeli szerelőt — fix áron, valós szabad időpontokkal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/klimak"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
              >
                Klímák böngészése <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/szakemberek"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Szakember választása
              </Link>
            </div>
            <div className="mt-10 flex gap-8 text-sm">
              <Stat value="120+" label="ellenőrzött szerelő" />
              <Stat value="4,8★" label="átlagos értékelés" />
              <Stat value="2–4 nap" label="átlagos kiszállás" />
            </div>
          </div>

          <div className="surface-card overflow-hidden p-0">
            <img
              src={hero}
              alt="Modern fehér oldalfali klíma világos nappaliban"
              width={1408}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Népszerű klímák</h2>
            <p className="mt-2 text-muted-foreground">
              A legtöbbet választott modellek idén.
            </p>
          </div>
          <Link
            to="/klimak"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Összes termék
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold">Hogyan működik?</h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Vásárlás és szerelés egy folyamatban, felesleges telefonálgatás nélkül.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Step
              icon={<PackageCheck className="size-5" />}
              step="01"
              title="Válassz klímát"
              text="Szűrj energiaosztályra, teljesítményre és márkára, hogy a szobádhoz illő modellt találd meg."
            />
            <Step
              icon={<Users className="size-5" />}
              step="02"
              title="Válassz szakembert"
              text="A kosárban kiválasztod a helyi szerelőt: látod az árát, értékelését és szabad kapacitását."
            />
            <Step
              icon={<Wrench className="size-5" />}
              step="03"
              title="Megérkezik és telepít"
              text="A klíma házhoz érkezik, a szakember pedig az egyeztetett napon beüzemeli."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Kiemelt helyi szakemberek</h2>
            <p className="mt-2 text-muted-foreground">
              Ellenőrzött vállalkozók a környékedről, fix telepítési árral.
            </p>
          </div>
          <Link
            to="/szakemberek"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Összes szakember
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pros.slice(0, 3).map((p) => (
            <ProCard key={p.id} pro={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="surface-card gradient-soft flex flex-col items-center gap-5 px-6 py-16 text-center">
          <h2 className="max-w-xl text-3xl font-semibold">
            Klímaszerelő vagy? Csatlakozz a hálózathoz.
          </h2>
          <p className="max-w-lg text-muted-foreground">
            Oszd meg áraidat és szabad kapacitásodat, mi pedig elhozzuk hozzád a
            megrendelőket.
          </p>
          <Link
            to="/szakemberek"
            className="rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            Csatlakozom szakemberként
          </Link>
        </div>
      </section>
    </Page>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Step({
  icon,
  step,
  title,
  text,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="surface-card p-6">
      <div className="flex items-center justify-between">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-mint text-mint-foreground">
          {icon}
        </span>
        <span className="text-sm text-muted-foreground">{step}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
