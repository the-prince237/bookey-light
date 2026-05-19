import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { TxStatus } from '../payments'

export type OrderStatus = 'INITIATED' | TxStatus
export interface Order {
  orderId: string
  nokashTxId: string | null
  itemId: string
  itemType: 'book' | 'track' | 'album' | 'digital'
  amount: number
  currency: string
  country: string
  paymentMethod: string
  paymentType: string
  buyerPhone?: string
  buyerEmail?: string
  buyerName?: string
  status: OrderStatus
  statusReason: string | null
  createdAt: string
  updatedAt: string
}

const DIR = join(process.cwd(), '.orders')
const FILE = join(DIR, 'orders.json')
function read(): Record<string, Order> {
  try {
    if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true })
    if (!existsSync(FILE)) return {}
    return JSON.parse(readFileSync(FILE, 'utf-8'))
  } catch {
    return {}
  }
}
function write(o: Record<string, Order>) {
  try {
    if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true })
    writeFileSync(FILE, JSON.stringify(o, null, 2))
  } catch (e) {
    console.error('[Orders]', e)
  }
}

export const saveOrder = (o: Order) => {
  const a = read()
  a[o.orderId] = o
  write(a)
}
export const getOrder = (id: string): Order | null => read()[id] ?? null
export const getOrderByNokashId = (txId: string): Order | null =>
  Object.values(read()).find((o) => o.nokashTxId === txId) ?? null
export function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  nokashTxId?: string,
  statusReason?: string | null,
): Order | null {
  const a = read()
  if (!a[orderId]) return null
  a[orderId] = {
    ...a[orderId],
    status,
    statusReason: statusReason ?? a[orderId].statusReason,
    nokashTxId: nokashTxId ?? a[orderId].nokashTxId,
    updatedAt: new Date().toISOString(),
  }
  write(a)
  return a[orderId]
}
