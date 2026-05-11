"use client";
import { useState } from "react";
import { X, Phone, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { formatCurrency, generateOrderId, getPaymentMethods } from "@/lib";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  itemType: "book" | "track" | "album";
  amount: number;
  currency: string;
  itemId: string;
}

type Step = "method" | "phone" | "pending" | "success" | "error";

const G   = "#C9953A";
const GD  = "#0B3D2E";
const CRM = "#F5F0E8";
const DRK = "#080F0D";

export default function PaymentModal({ isOpen, onClose, itemTitle, itemType, amount, currency, itemId }: Props) {
  const [step, setStep]               = useState<Step>("method");
  const [selectedMethod, setMethod]   = useState<string>("");
  const [phone, setPhone]             = useState("237");
  const [transactionId, setTxId]      = useState("");
  const [errorMsg, setError]          = useState("");

  const methods = getPaymentMethods("CM");

  const handleSelectMethod = (m: string) => { setMethod(m); setStep("phone"); };

  const handlePay = async () => {
    if (phone.length < 9) return;
    setStep("pending");
    try {
      const orderId = generateOrderId(itemType === "book" ? "BOOK" : "TRACK");
      const sel = methods.find(m => m.method === selectedMethod);
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId, amount: String(amount), country: "CM",
          payment_method: selectedMethod, payment_type: sel?.type || "CM_MOBILEMONEY",
          user_phone: phone, item_id: itemId, item_type: itemType,
        }),
      });
      const data = await res.json();
      if (data.status === "REQUEST_OK" && data.data) {
        setTxId(data.data.id);
        setStep("success");
      } else {
        setError(data.message || "Une erreur est survenue.");
        setStep("error");
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
      setStep("error");
    }
  };

  const reset = () => { setStep("method"); setMethod(""); setPhone("237"); setTxId(""); setError(""); };
  const close = () => { reset(); onClose(); };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
      onClick={e => e.target === e.currentTarget && close()}
    >
      <div
        style={{
          background: "#0d1a14",
          border: "1px solid rgba(201,149,58,0.3)",
          width: "100%", maxWidth: 460,
          position: "relative", overflow: "hidden",
          maxHeight: "calc(100vh - 32px)",
          overflowY: "auto",
        }}
      >
        {/* Top gold bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg,${G},#E8C06A,${G})` }} />

        {/* Header */}
        <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid rgba(201,149,58,0.12)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 5 }}>
              Paiement sécurisé · NOKASH
            </p>
            <h3 className="font-playfair" style={{ fontSize: 17, color: CRM, fontWeight: 700, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {itemTitle}
            </h3>
            <p className="font-bebas" style={{ marginTop: 8, fontSize: 26, color: G, letterSpacing: 2 }}>
              {formatCurrency(amount, currency)}
            </p>
          </div>
          <button onClick={close} style={{ color: "rgba(245,240,232,0.4)", background: "none", border: "none", cursor: "pointer", flexShrink: 0, marginTop: 2 }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>

          {/* ── Select method ── */}
          {step === "method" && (
            <div>
              <p style={{ fontFamily: "Raleway", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.45)", marginBottom: 18 }}>
                Mode de paiement
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {methods.map(m => (
                  <button
                    key={m.method}
                    onClick={() => handleSelectMethod(m.method)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 18px",
                      background: "rgba(11,61,46,0.3)",
                      border: "1px solid rgba(201,149,58,0.2)",
                      cursor: "pointer", width: "100%", textAlign: "left",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.background = "rgba(11,61,46,0.6)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,149,58,0.2)"; e.currentTarget.style.background = "rgba(11,61,46,0.3)"; }}
                  >
                    <div style={{ width: 38, height: 38, background: GD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Phone size={16} color={G} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "Raleway", fontWeight: 700, fontSize: 14, color: CRM }}>{m.label}</p>
                      <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 11, color: "rgba(245,240,232,0.4)", marginTop: 1 }}>Mobile Money · Cameroun</p>
                    </div>
                    <span style={{ marginLeft: "auto", color: G, fontSize: 18 }}>›</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Phone ── */}
          {step === "phone" && (
            <div>
              <button onClick={() => setStep("method")} style={{ background: "none", border: "none", color: "rgba(245,240,232,0.4)", cursor: "pointer", marginBottom: 18, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                ← Retour
              </button>
              <p style={{ fontFamily: "Raleway", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginBottom: 6 }}>
                {methods.find(m => m.method === selectedMethod)?.label}
              </p>
              <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: 15, color: "rgba(245,240,232,0.65)", marginBottom: 22, lineHeight: 1.5 }}>
                Entrez votre numéro pour recevoir la demande de paiement.
              </p>
              <label style={{ display: "block", fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: G, marginBottom: 8 }}>
                Numéro de téléphone
              </label>
              <input
                type="tel" value={phone}
                onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="237XXXXXXXXX"
                style={{
                  width: "100%", padding: "13px 14px",
                  background: "rgba(11,61,46,0.3)",
                  border: "1px solid rgba(201,149,58,0.3)",
                  color: CRM, fontFamily: "Raleway",
                  fontSize: 16, outline: "none", letterSpacing: 2, marginBottom: 16,
                }}
              />
              <p style={{ fontFamily: "Raleway", fontSize: 11, color: "rgba(245,240,232,0.3)", marginBottom: 22, lineHeight: 1.6 }}>
                💡 Format : 237XXXXXXXXX (ex. 237670000000)<br />
                Vous recevrez une notification USSD.
              </p>
              <button
                onClick={handlePay}
                disabled={phone.length < 9}
                style={{
                  width: "100%", padding: 15,
                  background: phone.length >= 9 ? G : "rgba(201,149,58,0.25)",
                  color: phone.length >= 9 ? DRK : "rgba(8,15,13,0.4)",
                  fontFamily: "Raleway", fontWeight: 800, fontSize: 12,
                  letterSpacing: 3, textTransform: "uppercase",
                  border: "none", cursor: phone.length >= 9 ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
              >
                Payer {formatCurrency(amount, currency)}
              </button>
            </div>
          )}

          {/* ── Pending ── */}
          {step === "pending" && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
                <Loader size={48} color={G} className="spin" />
              </div>
              <p className="font-bebas" style={{ fontSize: 28, letterSpacing: 3, color: CRM, marginBottom: 12 }}>Traitement…</p>
              <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: 16, color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>
                Vérifiez votre téléphone et validez la demande USSD.
              </p>
            </div>
          )}

          {/* ── Success ── */}
          {step === "success" && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <CheckCircle size={52} color="#22c55e" strokeWidth={1.5} />
              </div>
              <p className="font-bebas" style={{ fontSize: 30, letterSpacing: 3, color: CRM, marginBottom: 10 }}>Paiement initié !</p>
              <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: 16, color: "rgba(245,240,232,0.65)", lineHeight: 1.7, marginBottom: 16 }}>
                Confirmez sur votre téléphone pour finaliser.
              </p>
              {transactionId && (
                <p style={{ fontFamily: "Raleway", fontSize: 10, letterSpacing: 2, color: "rgba(245,240,232,0.25)", marginBottom: 26, wordBreak: "break-all" }}>
                  Réf. : {transactionId}
                </p>
              )}
              <button onClick={close} style={{ padding: "14px 40px", background: G, color: DRK, fontFamily: "Raleway", fontWeight: 800, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", border: "none", cursor: "pointer" }}>
                Fermer
              </button>
            </div>
          )}

          {/* ── Error ── */}
          {step === "error" && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <AlertCircle size={52} color="#CE1126" strokeWidth={1.5} />
              </div>
              <p className="font-bebas" style={{ fontSize: 28, letterSpacing: 3, color: CRM, marginBottom: 10 }}>Paiement échoué</p>
              <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: 15, color: "rgba(245,240,232,0.6)", lineHeight: 1.6, marginBottom: 24 }}>{errorMsg}</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={reset} style={{ padding: "13px 32px", background: "transparent", color: G, fontFamily: "Raleway", fontWeight: 700, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", border: `1px solid ${G}`, cursor: "pointer" }}>
                  Réessayer
                </button>
                <button onClick={close} style={{ padding: "13px 32px", background: "transparent", color: "rgba(245,240,232,0.4)", fontFamily: "Raleway", fontWeight: 700, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", border: "1px solid rgba(245,240,232,0.15)", cursor: "pointer" }}>
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 24px", borderTop: "1px solid rgba(201,149,58,0.08)", display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "Raleway", fontSize: 9, letterSpacing: 2, color: "rgba(245,240,232,0.22)", textTransform: "uppercase" }}>Sécurisé par NOKASH</p>
          <p style={{ fontFamily: "Raleway", fontSize: 9, color: "rgba(245,240,232,0.18)" }}>api.nokash.app</p>
        </div>
      </div>
    </div>
  );
}