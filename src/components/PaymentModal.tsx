'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  X,
  Phone,
  Building2,
  CheckCircle,
  AlertCircle,
  Loader,
  Clock,
  RefreshCw,
} from 'lucide-react'
import {
  formatCurrency,
  generateOrderId,
  getMethodsForCountry,
  categoriseError,
  errorAdvice,
  canRetryImmediately,
  type PaymentMethodDef,
  type ErrorCategory,
} from '@/lib'

interface Props {
  isOpen: boolean
  onClose: () => void
  itemTitle: string
  itemType: 'book' | 'track' | 'album' | 'digital'
  amount: number
  currency: string
  itemId: string
}
type Step = 'country' | 'method' | 'form' | 'pending' | 'polling' | 'success' | 'error'
interface FormState {
  user_phone: string
  user_email: string
  user_name: string
  user_bank_code: string
  user_bank_account: string
}

const G = '#C9953A'
const GD = '#0B3D2E'
const CRM = '#F5F0E8'
const DRK = '#080F0D'
const POLL_INTERVAL = 4000
const POLL_MAX = 30

export default function PaymentModal({
  isOpen,
  onClose,
  itemTitle,
  itemType,
  amount,
  currency,
  itemId,
}: Props) {
  const [step, setStep] = useState<Step>('country')
  const [country, setCountry] = useState<'CM' | 'NG'>('CM')
  const [selectedMethod, setMethod] = useState<PaymentMethodDef | null>(null)
  const [form, setForm] = useState<FormState>({
    user_phone: '237',
    user_email: '',
    user_name: '',
    user_bank_code: '',
    user_bank_account: '',
  })
  const [orderId, setOrderId] = useState('')
  const [nokashTxId, setTxId] = useState('')
  const [txStatus, setTxStatus] = useState('')
  const [errorMsg, setError] = useState('')
  const [errorCat, setErrorCat] = useState<ErrorCategory>('UNKNOWN')
  const [pollCount, setPollCount] = useState(0)
  const [isTest, setIsTest] = useState(false)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPoll = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  const pollStatus = useCallback(
    async (txId: string, oId: string) => {
      try {
        const res = await fetch('/api/payment/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transaction_id: txId, order_id: oId }),
        })
        const d = await res.json()
        if (d.status !== 'REQUEST_OK' || !d.data) return
        const s = d.data.status as string
        setTxStatus(s)
        if (s === 'SUCCESS') {
          stopPoll()
          setStep('success')
        }
        if (s === 'FAILED' || s === 'CANCELED' || s === 'TIMEOUT') {
          stopPoll()
          setError(d.data.statusReason ?? "Le paiement n'a pas abouti.")
          setErrorCat('PROVIDER')
          setStep('error')
        }
      } catch {}
      setPollCount((c) => c + 1)
    },
    [stopPoll],
  )

  useEffect(() => {
    if (pollCount >= POLL_MAX && step === 'polling') {
      stopPoll()
      setError(
        "Délai d'attente dépassé. Vérifiez votre téléphone ou contactez le support.",
      )
      setErrorCat('UNKNOWN')
      setStep('error')
    }
  }, [pollCount, step, stopPoll])
  useEffect(() => () => stopPoll(), [stopPoll])

  const reset = () => {
    stopPoll()
    setStep('country')
    setCountry('CM')
    setMethod(null)
    setForm({
      user_phone: '237',
      user_email: '',
      user_name: '',
      user_bank_code: '',
      user_bank_account: '',
    })
    setOrderId('')
    setTxId('')
    setTxStatus('')
    setError('')
    setErrorCat('UNKNOWN')
    setPollCount(0)
    setIsTest(false)
  }
  const close = () => {
    reset()
    onClose()
  }
  const setField = (k: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }))

  const isFormValid = (): boolean => {
    if (!selectedMethod) return false
    for (const f of selectedMethod.requiredFields) {
      if (!form[f as keyof FormState] || form[f as keyof FormState].trim().length < 3)
        return false
    }
    if (selectedMethod.method !== 'BANK_TRANSFER')
      return form.user_phone.replace(/\D/g, '').length >= 9
    return true
  }

  const handlePay = async () => {
    if (!isFormValid() || !selectedMethod) return
    setStep('pending')
    const oid = generateOrderId(itemType.toUpperCase())
    setOrderId(oid)
    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: oid,
          amount: String(amount),
          country,
          payment_method: selectedMethod.method,
          payment_type: selectedMethod.type,
          currency,
          ...form,
          item_id: itemId,
          item_type: itemType,
        }),
      })
      const data = await res.json()
      setIsTest(!!data._test)
      if (data.status === 'REQUEST_OK' && data.data) {
        const txId = data.data.id
        setTxId(txId)
        setTxStatus('PENDING')
        setStep('polling')
        pollRef.current = setInterval(() => pollStatus(txId, oid), POLL_INTERVAL)
        pollStatus(txId, oid)
      } else {
        setError(data.message ?? 'Erreur inconnue.')
        setErrorCat(categoriseError(data.status, data.message ?? ''))
        setStep('error')
      }
    } catch {
      setError('Erreur réseau.')
      setErrorCat('NETWORK')
      setStep('error')
    }
  }

  if (!isOpen) return null
  const methods = getMethodsForCountry(country)

  const iStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    background: 'rgba(11,61,46,.3)',
    border: '1px solid rgba(201,149,58,.3)',
    color: CRM,
    fontFamily: 'Raleway',
    fontSize: 15,
    outline: 'none',
    letterSpacing: 1,
    marginBottom: 14,
  }
  const lStyle: React.CSSProperties = {
    fontFamily: 'Raleway',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: G,
    marginBottom: 8,
    display: 'block',
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div
        style={{
          background: '#0d1a14',
          border: '1px solid rgba(201,149,58,.3)',
          width: '100%',
          maxWidth: 460,
          maxHeight: 'calc(100dvh - 32px)',
          overflowY: 'auto',
        }}
      >
        <div
          style={{ height: 4, background: `linear-gradient(90deg,${G},#E8C06A,${G})` }}
        />
        <div
          style={{
            padding: '20px 22px 16px',
            borderBottom: '1px solid rgba(201,149,58,.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontFamily: 'Raleway',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: G,
                marginBottom: 4,
              }}
            >
              Paiement sécurisé · NOKASH{isTest ? ' (test)' : ''}
            </p>
            <h3
              style={{
                fontFamily: 'Playfair Display,serif',
                fontSize: 16,
                color: CRM,
                fontWeight: 700,
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {itemTitle}
            </h3>
            <p
              style={{
                fontFamily: 'Bebas Neue,cursive',
                fontSize: 24,
                color: G,
                letterSpacing: 2,
                marginTop: 6,
              }}
            >
              {formatCurrency(amount, currency)}
            </p>
          </div>
          <button
            onClick={close}
            style={{
              color: 'rgba(245,240,232,.35)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <X size={20} />
          </button>
        </div>
        {!['success', 'error'].includes(step) && (
          <div
            style={{
              display: 'flex',
              gap: 6,
              padding: '10px 22px 0',
              justifyContent: 'center',
            }}
          >
            {(['country', 'method', 'form', 'pending', 'polling'] as Step[]).map(
              (s, i, arr) => (
                <div
                  key={s}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: arr.indexOf(step) >= i ? G : 'rgba(201,149,58,.2)',
                    transition: 'background .3s',
                  }}
                />
              ),
            )}
          </div>
        )}
        <div style={{ padding: '22px' }}>
          {/* Country */}
          {step === 'country' && (
            <div>
              <p
                style={{
                  fontFamily: 'Raleway',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,.4)',
                  marginBottom: 16,
                }}
              >
                Votre pays
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(
                  [
                    {
                      code: 'CM',
                      name: 'Cameroun',
                      flag: '🇨🇲',
                      desc: 'MTN MoMo · Orange Money · EUM',
                    },
                    {
                      code: 'NG',
                      name: 'Nigeria',
                      flag: '🇳🇬',
                      desc: 'Virement bancaire',
                    },
                  ] as const
                ).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCountry(c.code)
                      setStep('method')
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '14px 18px',
                      background: 'rgba(11,61,46,.3)',
                      border: '1px solid rgba(201,149,58,.2)',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      transition: 'all .2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = G
                      e.currentTarget.style.background = 'rgba(11,61,46,.6)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201,149,58,.2)'
                      e.currentTarget.style.background = 'rgba(11,61,46,.3)'
                    }}
                  >
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{c.flag}</span>
                    <div>
                      <p
                        style={{
                          fontFamily: 'Raleway',
                          fontWeight: 700,
                          fontSize: 14,
                          color: CRM,
                        }}
                      >
                        {c.name}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Raleway',
                          fontWeight: 300,
                          fontSize: 11,
                          color: 'rgba(245,240,232,.38)',
                          marginTop: 2,
                        }}
                      >
                        {c.desc}
                      </p>
                    </div>
                    <span style={{ marginLeft: 'auto', color: G }}>›</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Method */}
          {step === 'method' && (
            <div>
              <button
                onClick={() => setStep('country')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(245,240,232,.38)',
                  cursor: 'pointer',
                  marginBottom: 18,
                  fontSize: 12,
                  fontFamily: 'Raleway',
                }}
              >
                ← Retour
              </button>
              <p
                style={{
                  fontFamily: 'Raleway',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,.4)',
                  marginBottom: 16,
                }}
              >
                Mode de paiement
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {methods.map((m) => (
                  <button
                    key={m.method}
                    onClick={() => {
                      setMethod(m)
                      setStep('form')
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '14px 18px',
                      background: 'rgba(11,61,46,.3)',
                      border: '1px solid rgba(201,149,58,.2)',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      transition: 'all .2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = G
                      e.currentTarget.style.background = 'rgba(11,61,46,.6)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201,149,58,.2)'
                      e.currentTarget.style.background = 'rgba(11,61,46,.3)'
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        background: GD,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {m.type === 'NG_BANKTRANSFER' ? (
                        <Building2 size={16} color={G} />
                      ) : (
                        <Phone size={16} color={G} />
                      )}
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: 'Raleway',
                          fontWeight: 700,
                          fontSize: 14,
                          color: CRM,
                        }}
                      >
                        {m.flag} {m.label}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Raleway',
                          fontWeight: 300,
                          fontSize: 11,
                          color: 'rgba(245,240,232,.38)',
                          marginTop: 2,
                        }}
                      >
                        {m.type === 'NG_BANKTRANSFER'
                          ? 'Compte bancaire nigérian'
                          : 'Mobile Money'}
                      </p>
                    </div>
                    <span style={{ marginLeft: 'auto', color: G }}>›</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Form */}
          {step === 'form' && selectedMethod && (
            <div>
              <button
                onClick={() => setStep('method')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(245,240,232,.38)',
                  cursor: 'pointer',
                  marginBottom: 18,
                  fontSize: 12,
                  fontFamily: 'Raleway',
                }}
              >
                ← Retour
              </button>
              <p
                style={{
                  fontFamily: 'Raleway',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,.4)',
                  marginBottom: 18,
                }}
              >
                {selectedMethod.flag} {selectedMethod.label}
              </p>
              {selectedMethod.type === 'CM_MOBILEMONEY' && (
                <>
                  <label style={lStyle}>Numéro de téléphone</label>
                  <input
                    type="tel"
                    value={form.user_phone}
                    onChange={(e) =>
                      setField('user_phone')(e.target.value.replace(/[^0-9]/g, ''))
                    }
                    placeholder={selectedMethod.placeholder?.user_phone}
                    style={iStyle}
                  />
                  <p
                    style={{
                      fontFamily: 'Raleway',
                      fontSize: 11,
                      color: 'rgba(245,240,232,.28)',
                      marginBottom: 22,
                      lineHeight: 1.6,
                    }}
                  >
                    💡 Format : 237XXXXXXXXX — Vous recevrez une notification USSD.
                  </p>
                </>
              )}
              {selectedMethod.type === 'NG_BANKTRANSFER' && (
                <>
                  <label style={lStyle}>Nom complet</label>
                  <input
                    value={form.user_name}
                    onChange={(e) => setField('user_name')(e.target.value)}
                    placeholder={selectedMethod.placeholder?.user_name}
                    style={iStyle}
                  />
                  <label style={lStyle}>Adresse email</label>
                  <input
                    type="email"
                    value={form.user_email}
                    onChange={(e) => setField('user_email')(e.target.value)}
                    placeholder={selectedMethod.placeholder?.user_email}
                    style={iStyle}
                  />
                  <label style={lStyle}>Code bancaire</label>
                  <input
                    value={form.user_bank_code}
                    onChange={(e) => setField('user_bank_code')(e.target.value)}
                    placeholder={selectedMethod.placeholder?.user_bank_code}
                    style={iStyle}
                  />
                  <label style={lStyle}>Numéro de compte</label>
                  <input
                    value={form.user_bank_account}
                    onChange={(e) => setField('user_bank_account')(e.target.value)}
                    placeholder={selectedMethod.placeholder?.user_bank_account}
                    style={iStyle}
                  />
                  <p
                    style={{
                      fontFamily: 'Raleway',
                      fontSize: 11,
                      color: 'rgba(245,240,232,.28)',
                      marginBottom: 22,
                      lineHeight: 1.6,
                    }}
                  >
                    💡 Un compte virtuel vous sera attribué.
                  </p>
                </>
              )}
              <button
                onClick={handlePay}
                disabled={!isFormValid()}
                style={{
                  width: '100%',
                  padding: 15,
                  background: isFormValid() ? G : 'rgba(201,149,58,.25)',
                  color: isFormValid() ? DRK : 'rgba(8,15,13,.4)',
                  fontFamily: 'Raleway',
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: isFormValid() ? 'pointer' : 'not-allowed',
                  transition: 'all .2s',
                }}
                onMouseEnter={(e) => {
                  if (isFormValid()) e.currentTarget.style.background = '#E8C06A'
                }}
                onMouseLeave={(e) => {
                  if (isFormValid()) e.currentTarget.style.background = G
                }}
              >
                Payer {formatCurrency(amount, currency)}
              </button>
            </div>
          )}
          {/* Pending */}
          {step === 'pending' && (
            <div style={{ textAlign: 'center', padding: '28px 0' }}>
              <div
                style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
              >
                <Loader size={48} color={G} className="spin" />
              </div>
              <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
              <p
                style={{
                  fontFamily: 'Bebas Neue,cursive',
                  fontSize: 26,
                  letterSpacing: 3,
                  color: CRM,
                  marginBottom: 10,
                }}
              >
                Envoi en cours…
              </p>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond,serif',
                  fontStyle: 'italic',
                  fontSize: 15,
                  color: 'rgba(245,240,232,.55)',
                  lineHeight: 1.6,
                }}
              >
                Connexion à NOKASH en cours.
              </p>
            </div>
          )}
          {/* Polling */}
          {step === 'polling' && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 20,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    border: `3px solid ${G}`,
                    borderTopColor: 'transparent',
                    animation: 'spin 1.2s linear infinite',
                  }}
                />
                <Clock
                  size={28}
                  color={G}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: 'Bebas Neue,cursive',
                  fontSize: 26,
                  letterSpacing: 3,
                  color: CRM,
                  marginBottom: 10,
                }}
              >
                En attente de confirmation
              </p>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond,serif',
                  fontStyle: 'italic',
                  fontSize: 15,
                  color: 'rgba(245,240,232,.6)',
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                Vérifiez votre téléphone et confirmez la demande USSD.
                <br />
                Cette page se met à jour automatiquement.
              </p>
              {isTest && (
                <div
                  style={{
                    background: 'rgba(201,149,58,.08)',
                    border: '1px solid rgba(201,149,58,.2)',
                    padding: '10px 16px',
                    marginBottom: 16,
                  }}
                >
                  <p style={{ fontFamily: 'Raleway', fontSize: 11, color: G }}>
                    Mode test — confirmation dans ~12 secondes
                  </p>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'rgba(11,61,46,.3)',
                  border: '1px solid rgba(201,149,58,.1)',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 10,
                    color: 'rgba(245,240,232,.35)',
                    letterSpacing: 2,
                  }}
                >
                  STATUT
                </span>
                <span
                  style={{
                    fontFamily: 'Raleway',
                    fontWeight: 700,
                    fontSize: 11,
                    color: G,
                    letterSpacing: 2,
                  }}
                >
                  {txStatus || 'PENDING'}
                </span>
              </div>
              {nokashTxId && (
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    color: 'rgba(245,240,232,.2)',
                    letterSpacing: 1,
                    wordBreak: 'break-all',
                    marginBottom: 12,
                  }}
                >
                  Réf : {nokashTxId}
                </p>
              )}
              <p
                style={{
                  fontFamily: 'Raleway',
                  fontSize: 11,
                  color: 'rgba(245,240,232,.28)',
                }}
              >
                Vérification {pollCount}/{POLL_MAX}
              </p>
            </div>
          )}
          {/* Success */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '28px 0' }}>
              <div
                style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
              >
                <CheckCircle size={56} color="#22c55e" strokeWidth={1.5} />
              </div>
              <p
                style={{
                  fontFamily: 'Bebas Neue,cursive',
                  fontSize: 32,
                  letterSpacing: 3,
                  color: CRM,
                  marginBottom: 10,
                }}
              >
                Paiement confirmé !
              </p>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond,serif',
                  fontStyle: 'italic',
                  fontSize: 16,
                  color: 'rgba(245,240,232,.65)',
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                Votre paiement a été confirmé avec succès.
              </p>
              {nokashTxId && (
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    color: 'rgba(245,240,232,.22)',
                    marginBottom: 6,
                    wordBreak: 'break-all',
                  }}
                >
                  Réf. NOKASH : {nokashTxId}
                </p>
              )}
              {orderId && (
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    color: 'rgba(245,240,232,.22)',
                    marginBottom: 24,
                    wordBreak: 'break-all',
                  }}
                >
                  Commande : {orderId}
                </p>
              )}
              <div
                style={{
                  background: 'rgba(34,197,94,.08)',
                  border: '1px solid rgba(34,197,94,.2)',
                  padding: 16,
                  marginBottom: 24,
                }}
              >
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 12,
                    color: '#22c55e',
                    lineHeight: 1.5,
                  }}
                >
                  📧 Contactez <strong>info@falamoi.com</strong> avec votre référence pour
                  recevoir votre produit.
                </p>
              </div>
              <button
                onClick={close}
                style={{
                  padding: '14px 44px',
                  background: G,
                  color: DRK,
                  fontFamily: 'Raleway',
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Fermer
              </button>
            </div>
          )}
          {/* Error */}
          {step === 'error' && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div
                style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
              >
                <AlertCircle size={52} color="#CE1126" strokeWidth={1.5} />
              </div>
              <p
                style={{
                  fontFamily: 'Bebas Neue,cursive',
                  fontSize: 28,
                  letterSpacing: 3,
                  color: CRM,
                  marginBottom: 10,
                }}
              >
                Paiement échoué
              </p>
              <div
                style={{
                  background: 'rgba(206,17,38,.08)',
                  border: '1px solid rgba(206,17,38,.2)',
                  padding: '14px 16px',
                  marginBottom: 20,
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#CE1126',
                    marginBottom: 6,
                  }}
                >
                  {errorCat === 'UNKNOWN' || errorCat === 'INTERNAL'
                    ? '⚠️ Vérification requise'
                    : '❌ Échec'}
                </p>
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontWeight: 300,
                    fontSize: 13,
                    color: 'rgba(245,240,232,.7)',
                    lineHeight: 1.6,
                  }}
                >
                  {errorAdvice(errorCat)}
                </p>
                {errorMsg && (
                  <p
                    style={{
                      fontFamily: 'Raleway',
                      fontSize: 11,
                      color: 'rgba(245,240,232,.4)',
                      marginTop: 8,
                      fontStyle: 'italic',
                    }}
                  >
                    Détail : {errorMsg}
                  </p>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {canRetryImmediately(errorCat) && (
                  <button
                    onClick={reset}
                    style={{
                      padding: '12px 28px',
                      background: 'transparent',
                      color: G,
                      fontFamily: 'Raleway',
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      border: `1px solid ${G}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <RefreshCw size={13} />
                    Réessayer
                  </button>
                )}
                <button
                  onClick={close}
                  style={{
                    padding: '12px 28px',
                    background: 'transparent',
                    color: 'rgba(245,240,232,.38)',
                    fontFamily: 'Raleway',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    border: '1px solid rgba(245,240,232,.15)',
                    cursor: 'pointer',
                  }}
                >
                  Fermer
                </button>
              </div>
              {(errorCat === 'UNKNOWN' || errorCat === 'INTERNAL') && (
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 11,
                    color: 'rgba(245,240,232,.28)',
                    marginTop: 20,
                    lineHeight: 1.6,
                  }}
                >
                  Ne relancez pas encore. Contactez{' '}
                  <strong style={{ color: G }}>info@falamoi.com</strong>
                  <br />
                  <span style={{ fontSize: 10, wordBreak: 'break-all' }}>
                    {orderId || '—'}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
        <div
          style={{
            padding: '10px 22px',
            borderTop: '1px solid rgba(201,149,58,.08)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              fontFamily: 'Raleway',
              fontSize: 9,
              letterSpacing: 2,
              color: 'rgba(245,240,232,.2)',
              textTransform: 'uppercase',
            }}
          >
            Sécurisé par NOKASH
          </p>
          <p
            style={{ fontFamily: 'Raleway', fontSize: 9, color: 'rgba(245,240,232,.16)' }}
          >
            api.nokash.app
          </p>
        </div>
      </div>
    </div>
  )
}
