import { Product } from "./models/Product";
import { User } from "./models/User";

async function main() {
  // Sample products
  const products: Product[] = [
    { id: "p1", title: "Classic White Shirt", price: 1999, size: "M", category: "Shirts", stock: 20 },
    { id: "p2", title: "Slim Fit Jeans", price: 2999, size: "L", category: "Pants", stock: 15 }
  ];
  // Sample users
  const users: User[] = [
    { id: "u1", name: "Alice", email: "alice@example.com", role: "admin", createdAt: new Date().toISOString() },
    { id: "u2", name: "Bob", email: "bob@example.com", role: "customer", createdAt: new Date().toISOString() }
  ];

  // Simulate adding product
  console.log("[ADMIN] Added product:", products[0]);

  // Simulate placing order
  const order = { orderId: "o1", userId: "u2", items: [{ productId: "p1", quantity: 2 }], totalAmount: 3998 };
  console.log("[CUSTOMER] Placed order:", order);

  // Simulate payment
  const paymentResult = { success: true, method: "card", cardHolder: "Bob" };
  console.log("[PAYMENT] Result:", paymentResult);
}

main();
