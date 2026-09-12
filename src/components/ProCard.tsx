import { CalendarClock, MapPin, Star } from "lucide-react";
import { formatHuf, type Pro } from "@/data/catalog";

export function ProCard({
  pro,
  selected,
  onSelect,
  actionLabel = "Szakember választása",
}: {
  pro: Pro;
  selected?: boolean;
  onSelect?: (pro: Pro) => void;
  actionLabel?: string;
}) {
  return (
    <div
      className={`surface-card flex flex-col gap-4 p-5 transition-all ${
        selected ? "ring-2 ring-ring" : "hover:shadow-lift"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sky text-sm font-semibold text-sky-foreground">
          {pro.initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{pro.name}</h3>
          <p className="truncate text-sm text-muted-foreground">{pro.company}</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-xs font-medium">
          <Star className="size-3 fill-current" /> {pro.rating}
        </span>
      </div>

      <div className="space-y-1.5 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <MapPin className="size-4" /> {pro.city} · {pro.region}
        </p>
        <p className="flex items-center gap-2">
          <CalendarClock className="size-4" /> {pro.availability}
        </p>
        <p>{pro.reviews} értékelés · {pro.years} év tapasztalat</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {pro.specialties.map((s) => (
          <span
            key={s}
            className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="font-semibold">{formatHuf(pro.installPrice)}</p>
          <p className="text-xs text-muted-foreground">telepítési díjtól</p>
        </div>
        {onSelect && (
          <button
            onClick={() => onSelect(pro)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selected
                ? "bg-mint text-mint-foreground"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            {selected ? "Kiválasztva" : actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
