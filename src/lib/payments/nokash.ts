// ─── NOKASH client-safe helpers ────────────────────────────────────────────────
// No Node.js imports here — this file is used by both server and client.

export const NOKASH_BASE_URL = "https://api.nokash.app";
export const IS_TEST_MODE    = !process.env.NOKASH_INTEGRATOR_KEY;

// ─── Types ───────────────────────────────────────────────────────────────────
export type PaymentType   = "CM_MOBILEMONEY" | "NG_BANKTRANSFER";
export type PaymentMethod = "MTN_MOMO" | "ORANGE_MONEY" | "EUM" | "BANK_TRANSFER";
export type TxStatus      = "PENDING" | "FAILED" | "CANCELED" | "TIMEOUT" | "SUCCESS";

export type ErrorCategory =
  | "UNKNOWN"   // *_UNKNOW  — may still succeed, wait for confirmation
  | "INTERNAL"  // *_ERROR (internal) — wait for confirmation
  | "PROVIDER"  // *_ERROR (provider unavailable) — fail + can retry
  | "BAD_INPUT" // *_BAD_INFOS — fix data before retry
  | "NETWORK"
  | "CONFIG";

export interface NokashResponse<T = unknown> {
  status: string; message: string; data: T | null;
}
export interface PayinData {
  id: string; status: TxStatus; amount: number; orderId: string;
  phone?: string;
  va_bank_code?: string; va_bank_name?: string;
  va_account_number?: string; va_expiry_date_in_utc?: string;
  user_name?: string; user_email?: string;
}
export interface StatusData extends PayinData {
  statusReason: string | null;
  user_bank_code?: string; user_bank_account?: string;
}

export interface UserData {
  user_phone?: string;
  user_email?: string; user_name?: string;
  user_bank_code?: string; user_bank_account?: string;
}

// ─── Payment method catalogue ─────────────────────────────────────────────────
export interface PaymentMethodDef {
  method: PaymentMethod; label: string;
  type: PaymentType; country: string; flag: string;
  requiredFields: (keyof UserData)[];
  placeholder?: Partial<Record<keyof UserData, string>>;
}

export const PAYMENT_METHODS: PaymentMethodDef[] = [
  { method:"MTN_MOMO",     label:"MTN Mobile Money",    type:"CM_MOBILEMONEY", country:"CM", flag:"🇨🇲", requiredFields:["user_phone"],  placeholder:{ user_phone:"237670000000" } },
  { method:"ORANGE_MONEY", label:"Orange Money",         type:"CM_MOBILEMONEY", country:"CM", flag:"🇨🇲", requiredFields:["user_phone"],  placeholder:{ user_phone:"237690000000" } },
  { method:"EUM",          label:"Express Union Mobile", type:"CM_MOBILEMONEY", country:"CM", flag:"🇨🇲", requiredFields:["user_phone"],  placeholder:{ user_phone:"237650000000" } },
  { method:"BANK_TRANSFER",label:"Virement bancaire",    type:"NG_BANKTRANSFER",country:"NG", flag:"🇳🇬", requiredFields:["user_email","user_name","user_bank_code","user_bank_account"],
    placeholder:{ user_email:"payer@email.com", user_name:"Nom Prénom", user_bank_code:"033", user_bank_account:"0000000000" } },
];

export function getMethodsForCountry(country: string): PaymentMethodDef[] {
  return PAYMENT_METHODS.filter(m => m.country === country);
}
export function getMethodDef(method: string): PaymentMethodDef | undefined {
  return PAYMENT_METHODS.find(m => m.method === method);
}

// ─── Error categorisation ─────────────────────────────────────────────────────
export function categoriseError(status: string, message: string): ErrorCategory {
  const s = status.toUpperCase();
  if (s.endsWith("_UNKNOW"))  return "UNKNOWN";
  if (s.endsWith("_BAD_INFOS")) return "BAD_INPUT";
  if (s.endsWith("_ERROR")) {
    if (message.toLowerCase().includes("not available") || message.toLowerCase().includes("provider")) return "PROVIDER";
    return "INTERNAL";
  }
  if (s === "NETWORK_ERROR") return "NETWORK";
  if (s === "CONFIG_ERROR")  return "CONFIG";
  return "UNKNOWN";
}

export function errorAdvice(cat: ErrorCategory): string {
  switch (cat) {
    case "UNKNOWN":   return "Une erreur interne est survenue. Ne relancez pas encore — notre équipe vérifie. Contactez le support si le problème persiste.";
    case "INTERNAL":  return "Erreur serveur temporaire. Attendez quelques instants avant de réessayer.";
    case "PROVIDER":  return "L'opérateur mobile est temporairement indisponible. Réessayez dans quelques minutes ou choisissez un autre mode de paiement.";
    case "BAD_INPUT": return "Les informations saisies sont incorrectes. Vérifiez votre numéro et réessayez.";
    case "NETWORK":   return "Problème de connexion réseau. Vérifiez votre accès internet.";
    case "CONFIG":    return "Configuration API manquante (mode développement).";
  }
}

export function canRetryImmediately(cat: ErrorCategory): boolean {
  return cat === "PROVIDER" || cat === "BAD_INPUT" || cat === "NETWORK";
}

// ─── Shared utilities ─────────────────────────────────────────────────────────
export function generateOrderId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2,9).toUpperCase()}`;
}

export function formatCurrency(amount: number, currency = "XAF"): string {
  if (currency === "XAF") return `${amount.toLocaleString("fr-FR")} FCFA`;
  return `${amount.toLocaleString()} ${currency}`;
}