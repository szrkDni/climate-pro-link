import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, Mail, Phone, User } from "lucide-react";
import { Page } from "@/components/SiteLayout";
import { Field } from "@/components/Field";
import { formatHuf, products, pros } from "@/data/catalog";
import { jobStatusLabels, jobs, orders, statusLabels, type OrderStatus } from "@/data/orders";

export const Route = createFileRoute("/fiok")({
  head: () => ({
    meta: [
      { title: "Fiókom — rendelések és telepítési időpontok | Klímapiac" },
      {
        name: "description",
        content:
          "Kezeld az adataidat, kövesd a rendeléseid státuszát, és nézd meg a hozzájuk rendelt szerelő elérhetőségét.",
      },
      { property: "og:title", content: "Fiókom — Klímapiac" },
      { property: "og:description", content: "Rendelések, időpontok és profiladatok egy helyen." },
    ],
  }),
  component: AccountPage,
});

const tabs = [
  { id: "profile", label: "Saját adatok" },
  { id: "orders", label: "Rendeléseim" },
  { id: "jobs", label: "Szakember nézet" },
] as const;

function AccountPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("orders");

  return (
    <Page>
      <section className="gradient-soft border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-12">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-card text-lg font-semibold shadow-soft">
            KA
          </span>
          <div>
            <h1 className="text-2xl font-semibold">Kiss Anna</h1>
            <p className="text-sm text-muted-foreground">anna@example.hu · Budapest</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "profile" && <ProfileTab />}
        {tab === "orders" && <OrdersTab />}
        {tab === "jobs" && <JobsTab />}
      </div>
    </Page>
  );
}

function ProfileTab() {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <form className="surface-card space-y-4 p-7">
        <h2 className="font-semibold">Személyes adatok</h2>
        <Field label="Teljes név" defaultValue="Kiss Anna" />
        <Field label="E-mail cím" type="email" defaultValue="anna@example.hu" />
        <Field label="Telefonszám" defaultValue="+36 30 123 4567" />
        <Field label="Szállítási cím" defaultValue="1114 Budapest, Fő utca 12." />
        <button
          type="button"
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
        >
          Adatok mentése
        </button>
      </form>

      <form className="surface-card h-fit space-y-4 p-7">
        <h2 className="font-semibold">Jelszó módosítása</h2>
        <Field label="Jelenlegi jelszó" type="password" placeholder="••••••••" />
        <Field
          label="Új jelszó"
          type="password"
          placeholder="••••••••"
          hint="Legalább 8 karakter, tartalmazzon számot is."
        />
        <Field label="Új jelszó megerősítése" type="password" placeholder="••••••••" />
        <button
          type="button"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary"
        >
          Jelszó frissítése
        </button>
      </form>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const tone =
    status === "done"
      ? "bg-mint text-mint-foreground"
      : status === "install"
        ? "bg-sky text-sky-foreground"
        : "bg-sand text-foreground";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${tone}`}>
      {statusLabels[status]}
    </span>
  );
}

function OrdersTab() {
  return (
    <div className="mt-8 space-y-5">
      {orders.map((order) => {
        const product = products.find((p) => p.id === order.productId);
        const pro = pros.find((p) => p.id === order.proId) ?? null;
        return (
          <article key={order.id} className="surface-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  {order.id} · {order.date}
                </p>
                <h2 className="mt-1 font-semibold">
                  {order.qty} × {product?.brand} {product?.name}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={order.status} />
                <p className="font-semibold">{formatHuf(order.total)}</p>
              </div>
            </div>

            {pro ? (
              <div className="mt-5 grid gap-4 rounded-2xl bg-secondary/60 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Kijelölt szerelő
                  </p>
                  <p className="mt-1.5 flex items-center gap-2 font-medium">
                    <User className="size-4" /> {pro.name} · {pro.company}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="size-4" /> +36 30 555 01{pro.id.length}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4" /> {pro.id}@klimapiac.hu
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Egyeztetett időpont
                  </p>
                  <p className="mt-1.5 flex items-center gap-2 font-medium">
                    <CalendarClock className="size-4" /> {order.appointment}
                  </p>
                  <button className="mt-3 rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-secondary">
                    Időpont módosítása
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-sand px-5 py-4 text-sm">
                Ehhez a rendeléshez még nincs szerelő hozzárendelve.
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

function JobsTab() {
  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Kpi label="Új igények" value="1" />
        <Kpi label="Elvállalt munkák" value="1" />
        <Kpi label="Havi bevétel" value={formatHuf(217000)} />
      </div>

      <div className="surface-card mt-6 overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-semibold">Beérkezett telepítési igények</h2>
          <p className="text-sm text-muted-foreground">
            A hozzád rendelt munkák, időpontok és díjak.
          </p>
        </div>
        <ul className="divide-y divide-border">
          {jobs.map((job) => (
            <li key={job.id} className="flex flex-wrap items-center gap-4 px-6 py-5">
              <div className="min-w-48 flex-1">
                <p className="font-medium">{job.customer}</p>
                <p className="text-sm text-muted-foreground">
                  {job.city} · {job.productName}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{job.date}</p>
              <p className="font-medium">{formatHuf(job.fee)}</p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  job.status === "new"
                    ? "bg-sand text-foreground"
                    : job.status === "accepted"
                      ? "bg-sky text-sky-foreground"
                      : "bg-mint text-mint-foreground"
                }`}
              >
                {jobStatusLabels[job.status]}
              </span>
              {job.status === "new" && (
                <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Elvállalom
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
