import { Product, ProductUpdateDTO } from "../models/Product";
import { Role } from "../models/User";
import { filterByProperty, getProperty } from "../utils/GenericUtils";
import { AppError } from "../models/Errors";

export type SortOrder = "asc" | "desc";

export class ProductService {
  private products: Product[] = [];

  addProduct(p: Product, userRole: Role) {
    if (userRole !== "admin") throw new AppError("Unauthorized");
    this.products.push(p);
    return p;
  }

  updateProduct(id: string, dto: ProductUpdateDTO, userRole: Role) {
    if (userRole !== "admin") throw new AppError("Unauthorized");
    const idx = this.products.findIndex((x) => x.id === id);
    if (idx === -1) throw new AppError("Product not found");
    this.products[idx] = { ...this.products[idx], ...dto };
    return this.products[idx];
  }

  deleteProduct(id: string, userRole: Role) {
    if (userRole !== "admin") throw new AppError("Unauthorized");
    this.products = filterByProperty(this.products, "id", id);
  }

  filter<T extends keyof Product>(key: T, value: Product[T]): Product[] {
    return this.products.filter((p) => p[key] === value);
  }

  sortBy<T extends keyof Product>(key: T, order: SortOrder = "asc"): Product[] {
    const copy = [...this.products];
    copy.sort((a, b) => {
      const av = getProperty(a, key);
      const bv = getProperty(b, key);
      if (av === bv) return 0;
      if (av > bv) return order === "asc" ? 1 : -1;
      return order === "asc" ? -1 : 1;
    });
    return copy;
  }

  getAll() {
    return [...this.products];
  }

  seed(products: Product[]) {
    this.products = products;
  }
}
