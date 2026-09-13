import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Banknote, CheckCircle2, CreditCard } from "lucide-react";
import { Page } from "@/components/SiteLayout";
import { CheckRow, Field } from "@/components/Field";
import { formatHuf } from "@/data/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/penztar")({
  head: () => ({
    meta: [
      { title: "Pénztár — szállítás, fizetés, F-gáz nyilatkozat | Klímapiac" },
      {
        name: "description",
        content:
          "Add meg a szállítási és számlázási adatokat, válassz fizetési módot, és fogadd el az ÁSZF-et és az F-gáz nyilatkozatot.",
      },
      { property: "og:title", content: "Pénztár — Klímapiac" },
      { property: "og:description", content: "Rendelés véglegesítése néhány lépésben." },
    ],
  }),
  component: CheckoutPage,
});

const steps = ["Szállítás", "Számlázás", "Fizetés"] as const;

function CheckoutPage() {
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [sameBilling, setSameBilling] = useState(true);
  const [payment, setPayment] = useState<"card" | "cod">("card");
  const [terms, setTerms] = useState(false);
  const [fgas, setFgas] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Page>
        <div className="mx-auto flex max-w-md flex-col items-center px-5 py-28 text-center">
          <CheckCircle2 className="size-14 text-mint-foreground" />
          <h1 className="mt-6 text-2xl font-semibold">Köszönjük a rendelést!</h1>
          <p className="mt-2 text-muted-foreground">
            A szerelő 24 órán belül felveszi veled a kapcsolatot az időpont egyeztetéséhez.
          </p>
          <Link
            to="/fiok"
            className="mt-7 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft"
          >
            Rendeléseim megtekintése
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="text-3xl font-semibold">Pénztár</h1>

        <ol className="mt-6 flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <li key={s}>
              <button
                onClick={() => setStep(i)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  i === step
                    ? "bg-primary text-primary-foreground"
                    : i < step
                      ? "bg-mint text-mint-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {i + 1}. {s}
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="surface-card space-y-5 p-7">
            {step === 0 && (
              <>
                <h2 className="font-semibold">Szállítási adatok</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Név" placeholder="Kiss Anna" />
                  <Field label="Telefonszám" placeholder="+36 30 123 4567" />
                  <Field label="Irányítószám" placeholder="1052" />
                  <Field label="Város" placeholder="Budapest" />
                  <div className="sm:col-span-2">
                    <Field label="Utca, házszám" placeholder="Fő utca 12." />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      label="Megjegyzés a szerelőnek"
                      placeholder="Pl. emelet, parkolás, falszerkezet"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="font-semibold">Számlázási adatok</h2>
                <CheckRow
                  checked={sameBilling}
                  onChange={() => setSameBilling((v) => !v)}
                  title="Megegyezik a szállítási adatokkal"
                />
                {!sameBilling && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Számlázási név" placeholder="Kiss Anna" />
                    <Field label="Adószám (cégeknek)" placeholder="12345678-1-42" />
                    <Field label="Irányítószám" placeholder="1052" />
                    <Field label="Város" placeholder="Budapest" />
                    <div className="sm:col-span-2">
                      <Field label="Utca, házszám" placeholder="Fő utca 12." />
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-semibold">Fizetési mód</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <PayOption
                    active={payment === "card"}
                    onClick={() => setPayment("card")}
                    icon={<CreditCard className="size-5" />}
                    title="Bankkártya"
                    text="Azonnali online fizetés a rendeléskor."
                  />
                  <PayOption
                    active={payment === "cod"}
                    onClick={() => setPayment("cod")}
                    icon={<Banknote className="size-5" />}
                    title="Utánvét"
                    text="Fizetés a futárnak átvételkor."
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <CheckRow
                    checked={terms}
                    onChange={() => setTerms((v) => !v)}
                    title="Elfogadom az ÁSZF-et és az adatkezelési tájékoztatót"
                  />
                  <CheckRow
                    checked={fgas}
                    onChange={() => setFgas((v) => !v)}
                    title="F-gáz nyilatkozat"
                    description="Tudomásul veszem, hogy a klímaberendezés beüzemelését kizárólag F-gáz képesítéssel rendelkező szakember végezheti, és a telepítés a hatályos jogszabályok szerint kerül dokumentálásra."
                  />
                </div>
              </>
            )}

            <div className="flex justify-between border-t border-border pt-5">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="rounded-full border border-border px-5 py-2.5 text-sm disabled:opacity-40"
              >
                Vissza
              </button>
              {step < 2 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  Tovább
                </button>
              ) : (
                <button
                  onClick={() => terms && fgas && setDone(true)}
                  disabled={!terms || !fgas}
                  className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-40"
                >
                  Rendelés véglegesítése
                </button>
              )}
            </div>
          </div>

          <aside className="surface-card h-fit space-y-4 p-6 lg:sticky lg:top-24">
            <h2 className="font-semibold">Rendelésed</h2>
            {cart.detailed.length === 0 && (
              <p className="text-sm text-muted-foreground">A kosarad üres.</p>
            )}
            {cart.detailed.map(({ item, product, pro }) => (
              <div key={product.id} className="border-b border-border pb-3 text-sm last:border-0">
                <p className="font-medium">
                  {item.qty} × {product.name}
                </p>
                <p className="text-muted-foreground">
                  {pro ? `Telepítés: ${pro.name}` : "Telepítés nélkül"}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Termékek</span>
              <span>{formatHuf(cart.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Telepítés</span>
              <span>{formatHuf(cart.installTotal)}</span>
            </div>
            <div className="flex items-end justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Fizetendő</span>
              <span className="text-2xl font-semibold">{formatHuf(cart.total)}</span>
            </div>
          </aside>
        </div>
      </div>
    </Page>
  );
}

function PayOption({
  active,
  onClick,
  icon,
  title,
  text,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition-all ${
        active ? "border-transparent bg-sky ring-2 ring-ring" : "border-border hover:bg-secondary/50"
      }`}
    >
      <span className="flex size-10 items-center justify-center rounded-xl bg-card">{icon}</span>
      <p className="mt-3 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </button>
  );
}
