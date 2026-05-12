import { NextRequest, NextResponse } from 'next/server'
import { saveOrder, updateOrderStatus, type Order } from '@/lib/orders'
import { createHmac } from 'crypto'
import { IS_TEST_MODE, NOKASH_BASE_URL } from '@/lib'

function generateHmac(
  orderId: string,
  amount: string,
  phone: string,
  appKey: string,
  iKey: string,
) {
  return createHmac('sha256', iKey)
    .update(`${orderId}:${amount}:${phone}:${appKey}`)
    .digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('[Payment initiate] received:', body)
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
    } = body

    const i_key = process.env.NOKASH_INTEGRATOR_KEY ?? ''
    const app_key = process.env.NOKASH_APP_KEY ?? ''
    const cb_url = process.env.NOKASH_CALLBACK_URL ?? ''

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

    // ── Test mode ──────────────────────────────────────────────────────────
    if (IS_TEST_MODE) {
      const testId = `test-${Date.now()}`
      updateOrderStatus(order_id, 'PENDING', testId, null)
      return NextResponse.json({
        status: 'REQUEST_OK',
        message: 'Mode test — aucune clé NOKASH configurée',
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

    // ── HMAC signature ────────────────────────────────────────────────────
    const hmac = generateHmac(order_id, String(amount), user_phone ?? '', app_key, i_key)

    // ── Call NOKASH ───────────────────────────────────────────────────────
    const nokashRequestBody = {
      i_space_key: i_key,
      app_space_key: app_key,
      order_id,
      amount: Number(amount),
      country,
      payment_method,
      payment_type,
      ...(cb_url ? { callback_url: cb_url } : {}),
      user_data,
    }
    console.log('[Nokash initiate] Request Body : ', nokashRequestBody)
    const res = await fetch(
      `${NOKASH_BASE_URL}/lapas-on-trans/trans/api-payin-request/407`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'hmac-signature': hmac },
        body: JSON.stringify(nokashRequestBody),
      },
    )
    const data = await res.json()

    if (data.status === 'REQUEST_OK' && data.data?.id) {
      updateOrderStatus(order_id, 'PENDING', data.data.id, null)
    }
    console.log('[Payment init api] Response Data: ', data)
    return NextResponse.json(data)
  } catch (err) {
    console.error('[initiate]', err)
    return NextResponse.json(
      { status: 'SERVER_ERROR', message: 'Erreur serveur interne', data: null },
      { status: 500 },
    )
  }
}
