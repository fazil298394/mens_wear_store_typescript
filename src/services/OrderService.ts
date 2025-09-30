import { Order, OrderItem, OrderStatus } from "../models/Order";
import { AppError } from "../models/Errors";
import { ProductService } from "./ProductService";
import { DiscountService } from "./DiscountService";
import { filterByProperty } from "../utils/GenericUtils";
import { isNonZeroNumber } from "../utils/ValidationUtils";

type ValidDiscount<D extends number> = D extends 0
  ? never
  : D extends number
  ? D
  : never;

export class OrderService {
  private orders: Order[] = [];
  constructor(
    private productService: ProductService,
    private discountService: DiscountService
  ) {}

  placeOrder(userId: string, products: OrderItem[], discountPercent = 0) {
    let total = 0;
    products.forEach((it) => {
      total += it.priceAtPurchase * it.quantity;
    });

    type D = ValidDiscount<typeof discountPercent>;
    if (isNonZeroNumber(discountPercent)) {
      total = this.discountService.applyDiscountToAmount(
        total,
        discountPercent
      );
    }

    const order: Order = {
      orderId: "ORD_" + Math.random().toString(36).slice(2, 9),
      userId,
      products,
      totalAmount: total,
      status: "pending",
      logs: [],
    };
    order.logs.push(`Order_${order.orderId}_pending`);
    this.orders.push(order);
    return order;
  }

  updateStatus(orderId: string, status: OrderStatus) {
    const o = this.orders.find((x) => x.orderId === orderId);
    if (!o) throw new AppError("Order not found");
    o.status = status;
    o.logs.push(`Order_${o.orderId}_${status}`);
    return o;
  }

  getOrdersForUser(userId: string) {
    return filterByProperty(this.orders, "userId", userId);
  }

  seed(orders: Order[]) {
    this.orders = orders;
  }
}
