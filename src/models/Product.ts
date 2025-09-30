export type Size = "S" | "M" | "L" | "XL" | "XXL";
export type Category = "Shirts" | "Pants" | "Jackets" | "Accessories";

export interface Product {
  id: string;
  title: string;
  price: number;
  size: Size;
  category: Category;
  stock: number;
}

export type ProductUpdateDTO = {
  [P in keyof Product]?: Product[P];
};
