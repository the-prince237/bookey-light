import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { order_id, amount, country, payment_method, payment_type, user_phone } = body

    // In production, use real NOKASH keys from env
    const i_space_key = process.env.NOKASH_INTEGRATOR_KEY || 'test_key'
    const app_space_key = process.env.NOKASH_APP_KEY || 'test_app_key'

    const payinBody = {
      i_space_key,
      app_space_key,
      order_id,
      amount: String(amount),
      country: country || 'CM',
      payment_method,
      payment_type,
      callback_url: process.env.NOKASH_CALLBACK_URL || '',
      user_data: { user_phone },
    }

    // In test mode (no real keys), simulate a response
    if (!process.env.NOKASH_INTEGRATOR_KEY) {
      return NextResponse.json({
        status: 'REQUEST_OK',
        message: 'Paiement initié (mode test)',
        data: {
          id: `test-${Date.now()}`,
          status: 'PENDING',
          amount: Number(amount),
          orderId: order_id,
          phone: user_phone,
        },
      })
    }

    const response = await fetch(
      'https://api.nokash.app/lapas-on-trans/trans/api-payin-request/407',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payinBody),
      },
    )

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { status: 'SERVER_ERROR', message: 'Erreur serveur interne', data: null },
      { status: 500 },
    )
  }
}
