export class DiscountService {
  applyDiscountToAmount<T extends number>(amount: T, percent: number): number {
    if (percent <= 0) return amount;
    if (percent > 100) throw new Error("Invalid discount");
    return Math.round((amount * (100 - percent)) / 100);
  }

  applyDiscountToProduct<P extends { price: number }>(
    product: P,
    percent: number
  ): number {
    return this.applyDiscountToAmount(product.price, percent);
  }
}
