"use client";
import { useState } from "react";
import { X, Phone, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { formatCurrency, generateOrderId, getPaymentMethods } from "@/lib";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  itemType: "book" | "track" | "album";
  amount: number;
  currency: string;
  itemId: string;
}

type Step = "method" | "phone" | "pending" | "success" | "error";

export default function PaymentModal({
  isOpen, onClose, itemTitle, itemType, amount, currency, itemId,
}: PaymentModalProps) {
  const [step, setStep] = useState<Step>("method");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [phone, setPhone] = useState("237");
  const [transactionId, setTransactionId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const methods = getPaymentMethods("CM");

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
    setStep("phone");
  };

  const handleSubmitPayment = async () => {
    if (phone.length < 9) return;
    setStep("pending");

    try {
      const orderId = generateOrderId(itemType === "book" ? "BOOK" : "TRACK");
      const selectedMethodData = methods.find(m => m.method === selectedMethod);
      
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          amount: String(amount),
          country: "CM",
          payment_method: selectedMethod,
          payment_type: selectedMethodData?.type || "CM_MOBILEMONEY",
          user_phone: phone,
          item_id: itemId,
          item_type: itemType,
        }),
      });

      const data = await response.json();

      if (data.status === "REQUEST_OK" && data.data) {
        setTransactionId(data.data.id);
        setStep("success");
      } else {
        setErrorMsg(data.message || "Une erreur est survenue lors du paiement.");
        setStep("error");
      }
    } catch {
      setErrorMsg("Erreur réseau. Veuillez réessayer.");
      setStep("error");
    }
  };

  const reset = () => {
    setStep("method");
    setSelectedMethod("");
    setPhone("237");
    setTransactionId("");
    setErrorMsg("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  const G = "#C9953A";
  const GreenDeep = "#0B3D2E";

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(10px)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        style={{
          background: "#0d1a14",
          border: "1px solid rgba(201,149,58,0.3)",
          width: "100%", maxWidth: 480,
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Gold top bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${G}, #E8C06A, ${G})` }} />
        
        {/* Header */}
        <div style={{ padding: "24px 28px 20px", borderBottom: "1px solid rgba(201,149,58,0.12)", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 6 }}>
              Paiement sécurisé · NOKASH
            </p>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: "#F5F0E8", fontWeight: 700, lineHeight: 1.2 }}>
              {itemTitle}
            </h3>
            <p style={{ marginTop: 8, fontFamily: "Bebas Neue, cursive", fontSize: 28, color: G, letterSpacing: 2 }}>
              {formatCurrency(amount, currency)}
            </p>
          </div>
          <button onClick={handleClose} style={{ color: "rgba(245,240,232,0.4)", background: "none", border: "none", cursor: "pointer", marginTop: 4 }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "28px" }}>

          {/* STEP: Select Method */}
          {step === "method" && (
            <div>
              <p style={{ fontFamily: "Raleway", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginBottom: 20 }}>
                Choisir le mode de paiement
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {methods.map(m => (
                  <button
                    key={m.method}
                    onClick={() => handleSelectMethod(m.method)}
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      padding: "16px 20px",
                      background: "rgba(11,61,46,0.3)",
                      border: "1px solid rgba(201,149,58,0.2)",
                      cursor: "pointer", width: "100%", textAlign: "left",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.background = "rgba(11,61,46,0.6)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,149,58,0.2)"; e.currentTarget.style.background = "rgba(11,61,46,0.3)"; }}
                  >
                    <div style={{ width: 40, height: 40, background: GreenDeep, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Phone size={18} color={G} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "Raleway", fontWeight: 700, fontSize: 14, color: "#F5F0E8" }}>{m.label}</p>
                      <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 11, color: "rgba(245,240,232,0.45)", marginTop: 2 }}>Mobile Money · Cameroun</p>
                    </div>
                    <span style={{ marginLeft: "auto", color: G, fontSize: 18 }}>›</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Phone */}
          {step === "phone" && (
            <div>
              <button onClick={() => setStep("method")} style={{ background: "none", border: "none", color: "rgba(245,240,232,0.4)", cursor: "pointer", marginBottom: 20, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                ← Retour
              </button>
              <p style={{ fontFamily: "Raleway", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginBottom: 8 }}>
                {methods.find(m => m.method === selectedMethod)?.label}
              </p>
              <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 15, color: "rgba(245,240,232,0.7)", marginBottom: 24, lineHeight: 1.5 }}>
                Entrez votre numéro de téléphone pour recevoir la demande de paiement.
              </p>
              <label style={{ display: "block", fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: G, marginBottom: 8 }}>
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="237XXXXXXXXX"
                style={{
                  width: "100%", padding: "14px 16px",
                  background: "rgba(11,61,46,0.3)",
                  border: "1px solid rgba(201,149,58,0.3)",
                  color: "#F5F0E8", fontFamily: "Raleway",
                  fontSize: 16, outline: "none",
                  letterSpacing: 2, marginBottom: 24,
                }}
              />
              <p style={{ fontFamily: "Raleway", fontSize: 11, color: "rgba(245,240,232,0.35)", marginBottom: 24, lineHeight: 1.6 }}>
                💡 Format : 237XXXXXXXXX (ex. 237670000000 pour MTN)<br />
                Vous recevrez une notification USSD sur votre téléphone.
              </p>
              <button
                onClick={handleSubmitPayment}
                disabled={phone.length < 9}
                style={{
                  width: "100%", padding: "16px",
                  background: phone.length >= 9 ? G : "rgba(201,149,58,0.3)",
                  color: phone.length >= 9 ? "#080F0D" : "rgba(8,15,13,0.5)",
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

          {/* STEP: Pending */}
          {step === "pending" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
                <Loader size={48} color={G} style={{ animation: "spin 1s linear infinite" }} />
              </div>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              <p className="font-bebas" style={{ fontSize: 28, letterSpacing: 3, color: "#F5F0E8", marginBottom: 12 }}>
                Traitement en cours
              </p>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 16, color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>
                Vérifiez votre téléphone et validez la demande de paiement USSD.
              </p>
            </div>
          )}

          {/* STEP: Success */}
          {step === "success" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
                <CheckCircle size={56} color="#22c55e" strokeWidth={1.5} />
              </div>
              <p className="font-bebas" style={{ fontSize: 32, letterSpacing: 3, color: "#F5F0E8", marginBottom: 12 }}>
                Paiement initié !
              </p>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 16, color: "rgba(245,240,232,0.7)", lineHeight: 1.7, marginBottom: 20 }}>
                Votre paiement a été lancé avec succès. Confirmez sur votre téléphone pour finaliser.
              </p>
              {transactionId && (
                <p style={{ fontFamily: "Raleway", fontSize: 10, letterSpacing: 2, color: "rgba(245,240,232,0.3)", marginBottom: 28 }}>
                  Réf. transaction : {transactionId}
                </p>
              )}
              <button
                onClick={handleClose}
                style={{
                  padding: "14px 40px",
                  background: G, color: "#080F0D",
                  fontFamily: "Raleway", fontWeight: 800, fontSize: 11,
                  letterSpacing: 3, textTransform: "uppercase", border: "none", cursor: "pointer",
                }}
              >
                Fermer
              </button>
            </div>
          )}

          {/* STEP: Error */}
          {step === "error" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
                <AlertCircle size={56} color="#CE1126" strokeWidth={1.5} />
              </div>
              <p className="font-bebas" style={{ fontSize: 28, letterSpacing: 3, color: "#F5F0E8", marginBottom: 12 }}>
                Paiement échoué
              </p>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 16, color: "rgba(245,240,232,0.6)", lineHeight: 1.6, marginBottom: 24 }}>
                {errorMsg}
              </p>
              <button
                onClick={reset}
                style={{
                  padding: "14px 40px",
                  background: "transparent", color: G,
                  fontFamily: "Raleway", fontWeight: 700, fontSize: 11,
                  letterSpacing: 3, textTransform: "uppercase",
                  border: `1px solid ${G}`, cursor: "pointer", marginRight: 12,
                }}
              >
                Réessayer
              </button>
              <button
                onClick={handleClose}
                style={{
                  padding: "14px 40px",
                  background: "transparent", color: "rgba(245,240,232,0.4)",
                  fontFamily: "Raleway", fontWeight: 700, fontSize: 11,
                  letterSpacing: 3, textTransform: "uppercase",
                  border: "1px solid rgba(245,240,232,0.15)", cursor: "pointer",
                }}
              >
                Fermer
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 28px", borderTop: "1px solid rgba(201,149,58,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "Raleway", fontSize: 9, letterSpacing: 2, color: "rgba(245,240,232,0.25)", textTransform: "uppercase" }}>
            Paiement sécurisé par NOKASH
          </p>
          <p style={{ fontFamily: "Raleway", fontSize: 9, letterSpacing: 1, color: "rgba(245,240,232,0.2)" }}>
            api.nokash.app
          </p>
        </div>
      </div>
    </div>
  );
}