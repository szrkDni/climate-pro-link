import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, User } from "lucide-react";
import { Page } from "@/components/SiteLayout";
import { CheckRow, Field } from "@/components/Field";
import { regions } from "@/data/catalog";

export const Route = createFileRoute("/regisztracio")({
  head: () => ({
    meta: [
      { title: "Regisztráció vásárlóként vagy szakemberként | Klímapiac" },
      {
        name: "description",
        content:
          "Hozz létre vásárlói fiókot, vagy regisztrálj klímaszerelő vállalkozásként cégadatokkal és vállalt régióval.",
      },
      { property: "og:title", content: "Regisztráció — Klímapiac" },
      {
        property: "og:description",
        content: "Vásárlói vagy szakember fiók létrehozása néhány perc alatt.",
      },
    ],
  }),
  component: RegisterPage,
});

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const taxOk = (v: string) => /^\d{8}-\d-\d{2}$/.test(v);

function RegisterPage() {
  const [type, setType] = useState<"buyer" | "pro">("buyer");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    company: "",
    tax: "",
    region: regions[0],
    city: "",
    specialty: "Oldalfali split",
  });
  const [accept, setAccept] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const show = (cond: boolean, msg: string) => (submitted && !cond ? msg : "");

  return (
    <Page>
      <section className="gradient-soft">
        <div className="mx-auto max-w-2xl px-5 py-16">
          <h1 className="text-3xl font-semibold">Fiók létrehozása</h1>
          <p className="mt-2 text-muted-foreground">
            Válaszd ki, hogy vásárolni szeretnél, vagy szakemberként munkákat fogadni.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <TypeCard
              active={type === "buyer"}
              onClick={() => setType("buyer")}
              icon={<User className="size-5" />}
              title="Vásárló"
              text="Klímát vásárolok otthonra vagy irodába."
            />
            <TypeCard
              active={type === "pro"}
              onClick={() => setType("pro")}
              icon={<Briefcase className="size-5" />}
              title="Szakember / vállalkozó"
              text="Telepítési munkákat vállalok a régiómban."
            />
          </div>

          <form
            className="surface-card mt-6 space-y-5 p-7"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Teljes név"
                placeholder="Kiss Anna"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                valid={form.name.trim().length > 2}
                error={show(form.name.trim().length > 2, "Add meg a teljes neved.")}
              />
              <Field
                label="E-mail cím"
                type="email"
                placeholder="nev@example.hu"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                valid={emailOk(form.email)}
                error={show(emailOk(form.email), "Adj meg érvényes e-mail címet.")}
              />
              <Field
                label="Telefonszám"
                placeholder="+36 30 123 4567"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                valid={form.phone.replace(/\D/g, "").length >= 9}
                error={show(
                  form.phone.replace(/\D/g, "").length >= 9,
                  "Adj meg érvényes telefonszámot.",
                )}
              />
              <Field
                label="Jelszó"
                type="password"
                placeholder="••••••••"
                hint="Legalább 8 karakter."
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                valid={form.password.length >= 8}
                error={show(form.password.length >= 8, "A jelszó legalább 8 karakter legyen.")}
              />
            </div>

            {type === "pro" && (
              <div className="space-y-4 rounded-2xl bg-secondary/60 p-5">
                <p className="text-sm font-semibold">Vállalkozói adatok</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Cégnév"
                    placeholder="Hűvös Otthon Kft."
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    valid={form.company.trim().length > 2}
                    error={show(form.company.trim().length > 2, "Add meg a cég nevét.")}
                  />
                  <Field
                    label="Adószám"
                    placeholder="12345678-1-42"
                    value={form.tax}
                    onChange={(e) => set("tax", e.target.value)}
                    valid={taxOk(form.tax)}
                    error={show(taxOk(form.tax), "Formátum: 12345678-1-42")}
                  />
                  <Field label="Vállalt régió">
                    <select
                      value={form.region}
                      onChange={(e) => set("region", e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none"
                    >
                      {regions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Székhely városa"
                    placeholder="Debrecen"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    valid={form.city.trim().length > 1}
                    error={show(form.city.trim().length > 1, "Add meg a várost.")}
                  />
                  <Field label="Szakterület">
                    <select
                      value={form.specialty}
                      onChange={(e) => set("specialty", e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none"
                    >
                      {["Oldalfali split", "Multi rendszer", "Hőszivattyú", "Ipari egységek"].map(
                        (s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ),
                      )}
                    </select>
                  </Field>
                </div>
              </div>
            )}

            <CheckRow
              checked={accept}
              onChange={() => setAccept((v) => !v)}
              title="Elfogadom az ÁSZF-et és az adatkezelési tájékoztatót"
              description="A regisztrációval hozzájárulsz adataid kezeléséhez."
            />
            {submitted && !accept && (
              <p className="text-xs text-destructive">Az ÁSZF elfogadása kötelező.</p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
            >
              {type === "pro" ? "Regisztrálok szakemberként" : "Fiók létrehozása"}
            </button>

            {submitted && (
              <p className="rounded-xl bg-mint px-4 py-3 text-sm text-mint-foreground">
                Az űrlap most bemutató módban fut — a valódi regisztráció a fiókrendszer
                bekapcsolása után él.
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Van már fiókod?{" "}
            <Link to="/belepes" className="font-medium text-foreground hover:underline">
              Bejelentkezés
            </Link>
          </p>
        </div>
      </section>
    </Page>
  );
}

function TypeCard({
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
      className={`surface-card p-5 text-left transition-all ${
        active ? "ring-2 ring-ring" : "hover:shadow-lift"
      }`}
    >
      <span
        className={`flex size-10 items-center justify-center rounded-xl ${
          active ? "bg-mint text-mint-foreground" : "bg-secondary text-secondary-foreground"
        }`}
      >
        {icon}
      </span>
      <p className="mt-4 font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </button>
  );
}
