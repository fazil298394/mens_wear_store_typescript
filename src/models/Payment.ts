export type Card = {
  method: "card";
  cardNumber: string;
  cardHolder: string;
  expiry: string;
};

export type UPI = {
  method: "upi";
  vpa: string;
  upiProvider?: string;
};

export type COD = {
  method: "cod";
  contactNumber?: string;
};

export type PaymentMethod = Card | UPI | COD;

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message?: string;
}
