import { Link } from "@tanstack/react-router";
import { Volume2, Wifi, Zap } from "lucide-react";
import unit from "@/assets/klima-unit.png";
import { formatHuf, type Product } from "@/data/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/klimak/$id"
      params={{ id: product.id }}
      className="group surface-card flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative flex h-44 items-center justify-center bg-secondary/60 p-6">
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-mint px-3 py-1 text-xs font-medium text-mint-foreground">
            {product.badge}
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          {product.energy}
        </span>
        <img
          src={unit}
          alt={`${product.brand} ${product.name} beltéri egység`}
          loading="lazy"
          width={1024}
          height={640}
          className="max-h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.brand}
          </p>
          <h3 className="mt-1 text-base font-semibold">{product.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{product.roomSize} · {product.kw} kW</p>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1">
            <Zap className="size-3" /> {product.energy}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1">
            <Volume2 className="size-3" /> {product.noise} dB
          </span>
          {product.wifi && (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1">
              <Wifi className="size-3" /> Wi-Fi
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-lg font-semibold">{formatHuf(product.price)}</p>
            <p className="text-xs text-muted-foreground">telepítés nélkül</p>
          </div>
          <span className="rounded-full border border-border px-4 py-2 text-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            Részletek
          </span>
        </div>
      </div>
    </Link>
  );
}
