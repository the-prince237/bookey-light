// NOKASH Payment API integration
// Base URL: https://api.nokash.app

export const NOKASH_BASE_URL = "https://api.nokash.app";

export type PaymentType = "CM_MOBILEMONEY" | "NG_BANKTRANSFER";
export type PaymentMethod = "MTN_MOMO" | "ORANGE_MONEY" | "EUM" | "BANK_TRANSFER";

export interface PayinRequest {
  i_space_key: string;
  app_space_key: string;
  payment_type: PaymentType;
  country: string;
  payment_method: PaymentMethod;
  order_id: string;
  amount: string;
  callback_url?: string;
  user_data: {
    user_phone?: string;
    user_email?: string;
    user_name?: string;
  };
}

export interface NokashResponse<T = unknown> {
  status: string;
  message: string;
  data: T | null;
}

export interface PayinData {
  id: string;
  status: "PENDING" | "FAILED" | "CANCELED" | "TIMEOUT" | "SUCCESS";
  amount: number;
  orderId: string;
  phone?: string;
}

// Generate a unique order ID
export function generateOrderId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
}

// Format amount for display
export function formatCurrency(amount: number, currency: string = "XAF"): string {
  if (currency === "XAF") {
    return `${amount.toLocaleString("fr-FR")} FCFA`;
  }
  return `${amount.toLocaleString()} ${currency}`;
}

// Get payment methods for country
export function getPaymentMethods(country: string): { method: PaymentMethod; label: string; type: PaymentType }[] {
  if (country === "CM") {
    return [
      { method: "MTN_MOMO", label: "MTN Mobile Money", type: "CM_MOBILEMONEY" },
      { method: "ORANGE_MONEY", label: "Orange Money", type: "CM_MOBILEMONEY" },
      { method: "EUM", label: "Express Union Mobile", type: "CM_MOBILEMONEY" },
    ];
  }
  return [];
}

// Server-side: initiate payin via NOKASH API
export async function initiatePayin(req: PayinRequest): Promise<NokashResponse<PayinData>> {
  const i_space_key = process.env.NOKASH_INTEGRATOR_KEY;
  const app_space_key = process.env.NOKASH_APP_KEY;

  if (!i_space_key || !app_space_key) {
    return { status: "CONFIG_ERROR", message: "Clés API manquantes", data: null };
  }

  try {
    const response = await fetch(`${NOKASH_BASE_URL}/lapas-on-trans/trans/api-payin-request/407`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...req, i_space_key, app_space_key }),
    });
    return await response.json();
  } catch {
    return { status: "NETWORK_ERROR", message: "Erreur réseau", data: null };
  }
}

// Server-side: check transaction status
export async function checkTransactionStatus(transactionId: string): Promise<NokashResponse<PayinData & { statusReason?: string }>> {
  try {
    const response = await fetch(
      `${NOKASH_BASE_URL}/lapas-on-trans/trans/310/status-request?transaction_id=${transactionId}`,
      { method: "POST" }
    );
    return await response.json();
  } catch {
    return { status: "NETWORK_ERROR", message: "Erreur réseau", data: null };
  }
}