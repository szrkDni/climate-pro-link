import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, pros, type Pro, type Product } from "@/data/catalog";

export type CartItem = {
  productId: string;
  qty: number;
  installProId: string | null;
};

type CartState = {
  items: CartItem[];
  withInstall: boolean;
};

type CartContextValue = CartState & {
  detailed: { item: CartItem; product: Product; pro: Pro | null }[];
  count: number;
  subtotal: number;
  installTotal: number;
  total: number;
  add: (productId: string, proId?: string | null) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  setInstallPro: (productId: string, proId: string | null) => void;
  setWithInstall: (value: boolean) => void;
  clear: () => void;
};

const STORAGE_KEY = "klimapiac-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [], withInstall: true });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw) as CartState);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const add = useCallback((productId: string, proId: string | null = null) => {
    setState((s) => {
      const existing = s.items.find((i) => i.productId === productId);
      if (existing) {
        return {
          ...s,
          items: s.items.map((i) =>
            i.productId === productId
              ? { ...i, qty: i.qty + 1, installProId: proId ?? i.installProId }
              : i,
          ),
        };
      }
      return { ...s, items: [...s.items, { productId, qty: 1, installProId: proId }] };
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setState((s) => ({
      ...s,
      items: s.items
        .map((i) => (i.productId === productId ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0),
    }));
  }, []);

  const remove = useCallback((productId: string) => {
    setState((s) => ({ ...s, items: s.items.filter((i) => i.productId !== productId) }));
  }, []);

  const setInstallPro = useCallback((productId: string, proId: string | null) => {
    setState((s) => ({
      ...s,
      items: s.items.map((i) => (i.productId === productId ? { ...i, installProId: proId } : i)),
    }));
  }, []);

  const setWithInstall = useCallback((value: boolean) => {
    setState((s) => ({
      ...s,
      withInstall: value,
      items: value ? s.items : s.items.map((i) => ({ ...i, installProId: null })),
    }));
  }, []);

  const clear = useCallback(() => setState({ items: [], withInstall: true }), []);

  const value = useMemo<CartContextValue>(() => {
    const detailed = state.items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        const pro = pros.find((x) => x.id === item.installProId) ?? null;
        return { item, product, pro };
      })
      .filter(Boolean) as { item: CartItem; product: Product; pro: Pro | null }[];

    const subtotal = detailed.reduce((sum, d) => sum + d.product.price * d.item.qty, 0);
    const installTotal = state.withInstall
      ? detailed.reduce((sum, d) => sum + (d.pro ? d.pro.installPrice * d.item.qty : 0), 0)
      : 0;

    return {
      ...state,
      detailed,
      count: detailed.reduce((n, d) => n + d.item.qty, 0),
      subtotal,
      installTotal,
      total: subtotal + installTotal,
      add,
      setQty,
      remove,
      setInstallPro,
      setWithInstall,
      clear,
    };
  }, [state, add, setQty, remove, setInstallPro, setWithInstall, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
