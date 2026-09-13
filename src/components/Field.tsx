import { AlertCircle, Check } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  valid?: boolean;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function Field({ label, hint, error, valid, children, ...input }: FieldProps) {
  const state = error ? "error" : valid ? "valid" : "idle";

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <div className="relative">
        {children ?? (
          <input
            {...input}
            className={`w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40 ${
              state === "error"
                ? "border-destructive"
                : state === "valid"
                  ? "border-mint"
                  : "border-border"
            }`}
          />
        )}
        {state === "valid" && !children && (
          <Check className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-mint-foreground" />
        )}
      </div>
      {error ? (
        <span className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5" /> {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

export function CheckRow({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: () => void;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 size-4 accent-[var(--primary)]"
      />
      <span className="text-sm">
        <span className="font-medium">{title}</span>
        {description && <span className="mt-0.5 block text-muted-foreground">{description}</span>}
      </span>
    </label>
  );
}
