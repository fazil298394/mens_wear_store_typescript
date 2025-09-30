import { Product } from "./Product";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderLog<
  T extends number | string,
  S extends OrderStatus
> = `Order_${T}_${S}`;

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  orderId: string;
  userId: string;
  products: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  logs: OrderLog<string, OrderStatus>[];
}
