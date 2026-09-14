import { Link } from "@tanstack/react-router";
import { Snowflake, Menu, ShoppingBag, UserRound } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Főoldal" },
  { to: "/klimak", label: "Klímák" },
  { to: "/szakemberek", label: "Szakemberek" },
  { to: "/fiok", label: "Fiókom" },
] as const;


export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();


  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-sky text-sky-foreground">
            <Snowflake className="size-4.5" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Klímapiac</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/kosar"
            aria-label="Kosár"
            className="relative inline-flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="size-4.5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/belepes"
            aria-label="Bejelentkezés"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
          >
            <UserRound className="size-4.5" />
          </Link>
          <Link
            to="/klimak"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Klímák böngészése
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
          >
            <Menu className="size-4.5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 py-3 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-mint text-mint-foreground">
              <Snowflake className="size-4" />
            </span>
            <span className="font-semibold">Klímapiac</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Klímavásárlás és helyi szakember egy helyen, átlátható árakkal.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-medium">Vásárlás</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <Link to="/klimak" className="hover:text-foreground">
                Klíma katalógus
              </Link>
            </li>
            <li>
              <Link to="/szakemberek" className="hover:text-foreground">
                Szakember kereső
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-medium">Kapcsolat</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>hello@klimapiac.hu</li>
            <li>+36 1 234 5678</li>
            <li>H–P 8:00–17:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Klímapiac. Minden jog fenntartva.
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
