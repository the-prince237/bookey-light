import { NextRequest, NextResponse } from "next/server";
import { type TxStatus } from "@/lib";
import { getOrder, getOrderByNokashId, updateOrderStatus } from "@/lib/orders";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id: nokashTxId, status, amount, orderId: nokashOrderId } = body;
    console.log("[callback] received:", { nokashTxId, status, nokashOrderId });
    if (!nokashTxId || !status) return NextResponse.json({ received:false, error:"Missing id or status" }, { status:400 });

    let order = getOrderByNokashId(nokashTxId);
    if (!order && nokashOrderId) order = getOrder(nokashOrderId);
    if (!order) { console.warn("[callback] unknown tx:", nokashTxId); return NextResponse.json({ received:true, known:false }); }

    if (amount !== undefined && Number(amount) !== order.amount) {
      console.error("[callback] amount mismatch!", { expected:order.amount, received:amount });
    }

    const txStatus = status as TxStatus;
    updateOrderStatus(order.orderId, txStatus, nokashTxId, null);
    console.log("[callback] updated:", { orderId:order.orderId, status:txStatus });
    // TODO: if (txStatus === "SUCCESS") sendDownloadLink(order)

    return NextResponse.json({ received:true, orderId:order.orderId, status:txStatus });
  } catch (err) {
    console.error("[callback] error:", err);
    return NextResponse.json({ received:true, error:"Internal error" });
  }
}

export async function GET() {
  return NextResponse.json({ endpoint:"NOKASH payment callback", active:true });
}