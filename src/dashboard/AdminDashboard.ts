import { Product } from "../models/Product";
import { Order } from "../models/Order";

export function totalSalesPerCategory(orders: Order[], products: Product[]) {
  const map = new Map<string, Product>();
  products.forEach((p) => map.set(p.id, p));
  type Category = Product["category"];
  const totals = {} as Record<Category, number>;
  (["Shirts", "Pants", "Jackets", "Accessories"] as Category[]).forEach(
    (c) => (totals[c] = 0)
  );

  orders.forEach((o) => {
    o.products.forEach((it) => {
      const p = map.get(it.productId);
      if (p) totals[p.category] += it.priceAtPurchase * it.quantity;
    });
  });

  return totals as Readonly<Record<Category, number>>;
}

export function topSellingProducts(
  orders: Order[],
  products: Product[],
  top = 3
) {
  const counts = new Map<string, number>();
  orders.forEach((o) => {
    o.products.forEach((it) => {
      counts.set(it.productId, (counts.get(it.productId) || 0) + it.quantity);
    });
  });
  const ranked = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, top);
  return ranked.map(([productId, qty]) => {
    const p = products.find((x) => x.id === productId);
    return {
      product: p ?? {
        id: productId,
        title: "Unknown",
        price: 0,
        size: "M",
        category: "Accessories",
        stock: 0,
      },
      qty,
    } as const;
  }) as ReadonlyArray<{ product: Product; qty: number }>;
}
