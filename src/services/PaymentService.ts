import { PaymentMethod, PaymentResult } from "../models/Payment";

export class PaymentService {
  async process(payment: PaymentMethod): Promise<PaymentResult> {
    await new Promise((res) => setTimeout(res, 200));
    switch (payment.method) {
      case "card":
        if (payment.cardNumber.endsWith("0")) {
          return { success: false, message: "Card declined" };
        }
        return {
          success: true,
          transactionId: "TXN_" + Math.random().toString(36).slice(2, 9),
        };
      case "upi":
        if (!payment.vpa.includes("@"))
          return { success: false, message: "Invalid VPA" };
        return {
          success: true,
          transactionId: "TXN_" + Math.random().toString(36).slice(2, 9),
        };
      case "cod":
        return {
          success: true,
          transactionId: "TXN_COD_" + Math.random().toString(36).slice(2, 9),
        };
      default:
        const error: never = payment;
        throw new Error("Unsupported payment method: " + JSON.stringify(error));
    }
  }
}
