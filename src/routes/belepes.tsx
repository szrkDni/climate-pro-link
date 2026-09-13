import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Snowflake } from "lucide-react";
import { Page } from "@/components/SiteLayout";
import { Field } from "@/components/Field";

export const Route = createFileRoute("/belepes")({
  head: () => ({
    meta: [
      { title: "Bejelentkezés | Klímapiac" },
      {
        name: "description",
        content:
          "Jelentkezz be a Klímapiac fiókodba: rendeléseid, telepítési időpontjaid és adataid egy helyen.",
      },
      { property: "og:title", content: "Bejelentkezés — Klímapiac" },
      { property: "og:description", content: "Lépj be a fiókodba a Klímapiacon." },
    ],
  }),
  component: LoginPage,
});

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [sent, setSent] = useState(false);

  const emailError = touched.email && !emailOk(email) ? "Adj meg érvényes e-mail címet." : "";
  const passError =
    touched.password && password.length < 8 ? "A jelszó legalább 8 karakter legyen." : "";

  return (
    <Page>
      <section className="gradient-soft">
        <div className="mx-auto flex max-w-md flex-col px-5 py-20">
          <div className="surface-card p-8">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-sky text-sky-foreground">
              <Snowflake className="size-5" />
            </span>
            <h1 className="mt-5 text-2xl font-semibold">Üdv újra!</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Jelentkezz be a rendeléseid és telepítési időpontjaid megtekintéséhez.
            </p>

            <form
              className="mt-7 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setTouched({ email: true, password: true });
                if (emailOk(email) && password.length >= 8) setSent(true);
              }}
            >
              <Field
                label="E-mail cím"
                type="email"
                placeholder="nev@example.hu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                error={emailError}
                valid={emailOk(email)}
              />
              <Field
                label="Jelszó"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                error={passError}
                valid={password.length >= 8}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember((v) => !v)}
                    className="size-4 accent-[var(--primary)]"
                  />
                  Emlékezz rám
                </label>
                <button
                  type="button"
                  className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Elfelejtett jelszó
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
              >
                Bejelentkezés
              </button>

              {sent && (
                <p className="rounded-xl bg-mint px-4 py-3 text-sm text-mint-foreground">
                  Ez még bemutató űrlap — a valódi belépés a fiókrendszer bekapcsolása után
                  működik.
                </p>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Még nincs fiókod?{" "}
              <Link to="/regisztracio" className="font-medium text-foreground hover:underline">
                Regisztrálok
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Page>
  );
}
