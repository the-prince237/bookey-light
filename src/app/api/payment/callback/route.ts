import { NextRequest, NextResponse } from 'next/server'
import { getOrderByNokashId, getOrder, updateOrderStatus } from '@/lib/orders'
import type { TxStatus } from '@/lib'

export async function POST(req: NextRequest) {
  try {
    const { id: nokashTxId, status, amount, orderId: nokashOrderId } = await req.json()
    if (!nokashTxId || !status)
      return NextResponse.json(
        { received: false, error: 'Missing id or status' },
        { status: 400 },
      )
    let order = getOrderByNokashId(nokashTxId)
    if (!order && nokashOrderId) order = getOrder(nokashOrderId)
    if (!order) {
      console.warn('[callback] unknown tx:', nokashTxId)
      return NextResponse.json({ received: true, known: false })
    }
    if (amount !== undefined && Number(amount) !== order.amount)
      console.error('[callback] amount mismatch!', {
        expected: order.amount,
        received: amount,
      })
    updateOrderStatus(order.orderId, status as TxStatus, nokashTxId, null)
    return NextResponse.json({ received: true, orderId: order.orderId, status })
  } catch (e) {
    console.error('[callback]', e)
    return NextResponse.json({ received: true, error: 'Internal error' })
  }
}
export async function GET() {
  return NextResponse.json({ endpoint: 'NOKASH payment callback', active: true })
}
