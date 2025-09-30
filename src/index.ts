import { Product } from "./models/Product";
import { User } from "./models/User";
import { ProductService } from "./services/ProductService";
import { UserService } from "./services/UserService";
import { DiscountService } from "./services/DiscountService";
import { OrderService } from "./services/OrderService";
import { PaymentService } from "./services/PaymentService";
import {
  totalSalesPerCategory,
  topSellingProducts,
} from "./dashboard/AdminDashboard";

async function main() {
  const products: Product[] = [
    {
      id: "p1",
      title: "Classic White Shirt",
      price: 1999,
      size: "M",
      category: "Shirts",
      stock: 20,
    },
    {
      id: "p2",
      title: "Slim Fit Jeans",
      price: 2999,
      size: "L",
      category: "Pants",
      stock: 15,
    },
    {
      id: "p3",
      title: "Leather Jacket",
      price: 8999,
      size: "XL",
      category: "Jackets",
      stock: 5,
    },
    {
      id: "p4",
      title: "Wool Scarf",
      price: 799,
      size: "M",
      category: "Accessories",
      stock: 50,
    },
  ];

  const users: User[] = [
    {
      id: "u1",
      name: "Alice",
      email: "alice@example.com",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: "u2",
      name: "Bob",
      email: "bob@example.com",
      role: "customer",
      createdAt: new Date().toISOString(),
    },
  ];

  const productService = new ProductService();
  productService.seed(products);

  const userService = new UserService();
  userService.seed(users);

  const discountService = new DiscountService();
  const orderService = new OrderService(productService, discountService);
  const paymentService = new PaymentService();

  console.log("Adding a new product as admin...");
  productService.addProduct(
    {
      id: "p5",
      title: "Denim Jacket",
      price: 4999,
      size: "L",
      category: "Jackets",
      stock: 8,
    },
    "admin"
  );

  try {
    productService.addProduct(
      {
        id: "p6",
        title: "Sneakers",
        price: 3999,
        size: "M",
        category: "Accessories",
        stock: 10,
      },
      "customer"
    );
  } catch (e: any) {
    console.log("Expected error adding as customer:", e.message);
  }

  const order = orderService.placeOrder(
    "u2",
    [
      { productId: "p1", quantity: 2, priceAtPurchase: 1999 },
      { productId: "p4", quantity: 1, priceAtPurchase: 799 },
    ],
    10
  );

  console.log("Order placed:", order.orderId, "Total:", order.totalAmount);

  const paymentResult = await paymentService.process({
    method: "card",
    cardNumber: "4242424242424242",
    cardHolder: "Bob",
    expiry: "12/27",
  });

  console.log("Payment result:", paymentResult);

  if (paymentResult.success) {
    orderService.updateStatus(order.orderId, "confirmed");
  }

  const orders = [order];
  console.log(
    "Sales per category:",
    totalSalesPerCategory(orders, productService.getAll())
  );
  console.log(
    "Top selling products:",
    topSellingProducts(orders, productService.getAll())
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
