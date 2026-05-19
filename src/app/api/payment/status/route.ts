import { NextRequest, NextResponse } from 'next/server'
import { NOKASH_BASE_URL, IS_TEST_MODE, type TxStatus } from '@/lib'
import { getOrder, updateOrderStatus } from '@/lib/orders'

export async function POST(req: NextRequest) {
  try {
    const { transaction_id, order_id } = await req.json()
    if (!transaction_id)
      return NextResponse.json(
        { status: 'REQUEST_BAD_INFOS', message: 'transaction_id requis', data: null },
        { status: 400 },
      )
    if (IS_TEST_MODE) {
      const order = order_id ? getOrder(order_id) : null
      const elapsed =
        Date.now() - (order ? new Date(order.createdAt).getTime() : Date.now())
      const simStatus: TxStatus = elapsed > 12000 ? 'SUCCESS' : 'PENDING'
      if (order_id) updateOrderStatus(order_id, simStatus, transaction_id, null)
      return NextResponse.json({
        status: 'REQUEST_OK',
        message: 'Mode test',
        _test: true,
        data: {
          id: transaction_id,
          status: simStatus,
          statusReason: null,
          amount: order?.amount ?? 0,
          orderId: order_id ?? transaction_id,
        },
      })
    }
    const res = await fetch(
      `${NOKASH_BASE_URL}/lapas-on-trans/trans/310/status-request?transaction_id=${transaction_id}`,
      { method: 'POST' },
    )
    const data = await res.json()
    if (data.status === 'REQUEST_OK' && data.data && order_id)
      updateOrderStatus(
        order_id,
        data.data.status as TxStatus,
        transaction_id,
        data.data.statusReason ?? null,
      )
    return NextResponse.json(data)
  } catch (e) {
    console.error('[status]', e)
    return NextResponse.json(
      { status: 'SERVER_ERROR', message: 'Erreur serveur', data: null },
      { status: 500 },
    )
  }
}
