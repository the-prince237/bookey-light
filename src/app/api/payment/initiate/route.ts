import { NextRequest, NextResponse } from 'next/server'
import { NOKASH_BASE_URL, IS_TEST_MODE } from '@/lib'
import { saveOrder, updateOrderStatus, type Order } from '@/lib/orders'
import { createHmac } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const b = await req.json()
    const {
      order_id,
      amount,
      country = 'CM',
      payment_method,
      payment_type,
      user_phone,
      user_email,
      user_name,
      user_bank_code,
      user_bank_account,
      item_id,
      item_type,
      currency = 'XAF',
    } = b
    const iKey = process.env.NOKASH_INTEGRATOR_KEY ?? ''
    const appKey = process.env.NOKASH_APP_KEY ?? ''
    const cbUrl = process.env.NOKASH_CALLBACK_URL ?? ''
    const user_data =
      payment_type === 'NG_BANKTRANSFER'
        ? { user_email, user_name, user_bank_code, user_bank_account }
        : { user_phone }
    const order: Order = {
      orderId: order_id,
      nokashTxId: null,
      itemId: item_id,
      itemType: item_type,
      amount: Number(amount),
      currency,
      country,
      paymentMethod: payment_method,
      paymentType: payment_type,
      buyerPhone: user_phone,
      buyerEmail: user_email,
      buyerName: user_name,
      status: 'INITIATED',
      statusReason: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveOrder(order)
    if (IS_TEST_MODE) {
      const testId = `test-${Date.now()}`
      updateOrderStatus(order_id, 'PENDING', testId, null)
      return NextResponse.json({
        status: 'REQUEST_OK',
        message: 'Mode test',
        data: {
          id: testId,
          status: 'PENDING',
          amount: Number(amount),
          orderId: order_id,
          phone: user_phone,
        },
        _test: true,
      })
    }
    const hmac = createHmac('sha256', iKey)
      .update(`${order_id}:${amount}:${user_phone ?? ''}` + `:${appKey}`)
      .digest('hex')
    const res = await fetch(
      `${NOKASH_BASE_URL}/lapas-on-trans/trans/api-payin-request/407`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'hmac-signature': hmac },
        body: JSON.stringify({
          i_space_key: iKey,
          app_space_key: appKey,
          order_id,
          amount: String(amount),
          country,
          payment_method,
          payment_type,
          ...(cbUrl ? { callback_url: cbUrl } : {}),
          user_data,
        }),
      },
    )
    const data = await res.json()
    if (data.status === 'REQUEST_OK' && data.data?.id)
      updateOrderStatus(order_id, 'PENDING', data.data.id, null)
    return NextResponse.json(data)
  } catch (e) {
    console.error('[initiate]', e)
    return NextResponse.json(
      { status: 'SERVER_ERROR', message: 'Erreur serveur', data: null },
      { status: 500 },
    )
  }
}
