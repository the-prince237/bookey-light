// Server-only — order persistence
// swap readFileSync for Postgres/Vercel KV/Redis in production
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { TxStatus } from "../payments";

export type OrderStatus = "INITIATED" | TxStatus;

export interface Order {
  orderId: string;
  nokashTxId: string | null;
  itemId: string;
  itemType: "book" | "track" | "album";
  amount: number;
  currency: string;
  country: string;
  paymentMethod: string;
  paymentType: string;
  buyerPhone?: string;
  buyerEmail?: string;
  buyerName?: string;
  status: OrderStatus;
  statusReason: string | null;
  createdAt: string;
  updatedAt: string;
}

const ORDERS_DIR  = join(process.cwd(), ".orders");
const ORDERS_FILE = join(ORDERS_DIR, "orders.json");

function readOrders(): Record<string, Order> {
  try {
    if (!existsSync(ORDERS_DIR)) mkdirSync(ORDERS_DIR, { recursive: true });
    if (!existsSync(ORDERS_FILE)) return {};
    return JSON.parse(readFileSync(ORDERS_FILE, "utf-8"));
  } catch { return {}; }
}

function writeOrders(orders: Record<string, Order>): void {
  try {
    if (!existsSync(ORDERS_DIR)) mkdirSync(ORDERS_DIR, { recursive: true });
    writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (e) { console.error("[Orders] write error:", e); }
}

export function saveOrder(order: Order): void {
  const all = readOrders(); all[order.orderId] = order; writeOrders(all);
}
export function getOrder(orderId: string): Order | null {
  return readOrders()[orderId] ?? null;
}
export function getOrderByNokashId(nokashTxId: string): Order | null {
  return Object.values(readOrders()).find(o => o.nokashTxId === nokashTxId) ?? null;
}
export function updateOrderStatus(
  orderId: string, status: OrderStatus,
  nokashTxId?: string, statusReason?: string | null
): Order | null {
  const all = readOrders();
  if (!all[orderId]) return null;
  all[orderId] = { ...all[orderId], status, statusReason: statusReason ?? all[orderId].statusReason, nokashTxId: nokashTxId ?? all[orderId].nokashTxId, updatedAt: new Date().toISOString() };
  writeOrders(all);
  return all[orderId];
}