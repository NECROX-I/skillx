import { useState, useEffect } from 'react'
import { creditApi } from '../api/index'
import { useAuthStore } from '../store/authStore'
import EmptyState from '../components/common/EmptyState'
import Loader from '../components/common/Loader'
import { format } from 'date-fns'

const TYPE_META = {
  earn:    { label: 'Earned',    color: '#16a34a', bg: '#dcfce7', sign: '+' },
  spend:   { label: 'Spent',     color: '#dc2626', bg: '#fee2e2', sign: '-' },
  hold:    { label: 'On hold',   color: '#b45309', bg: '#fef9c3', sign: '-' },
  refund:  { label: 'Refunded',  color: '#2563eb', bg: '#dbeafe', sign: '+' },
  bonus:   { label: 'Bonus',     color: '#7c3aed', bg: '#ede9fe', sign: '+' },
  settle:  { label: 'Settled',   color: '#16a34a', bg: '#dcfce7', sign: '+' },
}

const TABS = [
  { val: '', label: 'All' },
  { val: 'earn',   label: 'Earned' },
  { val: 'spend',  label: 'Spent' },
  { val: 'refund', label: 'Refunded' },
]

export default function WalletPage() {
  const { user } = useAuthStore()
  const [txns, setTxns]     = useState([])
  const [tab, setTab]       = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage]     = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const load = (t = tab, p = 1, append = false) => {
    setLoading(true)
    const params = { page: p, limit: 20 }
    if (t) params.type = t
    creditApi.history(params)
      .then(({ data }) => {
        const list = data.data.transactions || []
        const meta = data.meta || {}
        setTxns(prev => append ? [...prev, ...list] : list)
        setHasMore(p < (meta.totalPages || 1))
        setPage(p)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load(tab, 1) }, [tab])

  const meta = (type) => TYPE_META[type] || { label: type, color: 'var(--text-muted)', bg: 'var(--surface-2)', sign: '' }

  return (
    <div style={{ maxWidth: 580, margin: '0 auto', padding: '16px 16px 8px' }}>

      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Wallet</h1>
      </div>

      {/* Balance card */}
      <div style={{
        background: 'var(--brand)',
        borderRadius: 16,
        padding: '24px 20px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '0 0 4px' }}>Available credits</p>
          <p style={{ color: '#fff', fontSize: 40, fontWeight: 800, margin: 0, lineHeight: 1 }}>
            {user?.creditBalance ?? 0}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '6px 0 0' }}>
            1 credit = 1 session hour
          </p>
        </div>
        <div style={{ fontSize: 48, opacity: 0.4 }}>🪙</div>
      </div>

      {/* How it works */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20,
      }}>
        {[
          { icon: '🎓', title: 'Teach', desc: '+1 credit per session you teach' },
          { icon: '📚', title: 'Learn', desc: '−1 credit per session you attend' },
        ].map(({ icon, title, desc }) => (
          <div key={title} style={{
            padding: '12px 14px', borderRadius: 12,
            background: 'var(--surface)', border: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: 22, margin: '0 0 6px' }}>{icon}</p>
            <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', margin: '0 0 2px' }}>{title}</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 14, scrollbarWidth: 'none' }}>
        {TABS.map(({ val, label }) => {
          const active = tab === val
          return (
            <button key={val} onClick={() => setTab(val)}
              style={{
                flexShrink: 0, padding: '6px 14px', borderRadius: 20, fontSize: 13,
                fontWeight: active ? 600 : 400, cursor: 'pointer',
                background: active ? 'var(--brand)' : 'var(--surface)',
                color: active ? '#fff' : 'var(--text-muted)',
                border: active ? '1px solid var(--brand)' : '1px solid var(--border)',
              }}>
              {label}
            </button>
          )
        })}
      </div>

      {/* Transaction list */}
      {loading && page === 1 ? <Loader /> : txns.length === 0 ? (
        <EmptyState
          icon="🪙"
          title="No transactions yet"
          subtitle="Teach a skill to earn your first credit."
        />
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {txns.map(tx => {
              const m = meta(tx.type)
              return (
                <div key={tx._id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '12px 14px',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                    background: m.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                  }}>
                    {tx.type === 'earn' || tx.type === 'settle' ? '↑' :
                     tx.type === 'spend' || tx.type === 'hold'  ? '↓' :
                     tx.type === 'refund' ? '↩' : '🪙'}
                  </div>

                  {/* Description */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>
                      {tx.description || m.label}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-faint)', margin: '2px 0 0' }}>
                      {format(new Date(tx.createdAt), 'MMM d, yyyy · h:mm a')}
                    </p>
                  </div>

                  {/* Amount */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{
                      fontWeight: 700, fontSize: 16,
                      color: m.color, margin: 0,
                    }}>
                      {m.sign}{tx.amount}
                    </p>
                    <p style={{
                      fontSize: 11, fontWeight: 600, margin: '2px 0 0',
                      padding: '1px 7px', borderRadius: 99,
                      background: m.bg, color: m.color,
                      display: 'inline-block',
                    }}>
                      {m.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button className="btn btn-white btn-md"
                onClick={() => load(tab, page + 1, true)}
                disabled={loading}>
                {loading ? 'Loading…' : 'Load more'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}