import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const nav = useNavigate()
  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '32px 24px', textAlign: 'center',
      background: 'var(--bg)',
    }}>
      <div style={{ fontSize: 64, marginBottom: 16, lineHeight: 1 }}>🔍</div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', margin: '0 0 8px' }}>
        Page not found
      </h1>
      <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: '0 0 28px', maxWidth: 300 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => nav(-1)}
          style={{
            padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
            background: 'var(--surface)', color: 'var(--text)',
            border: '1px solid var(--border)', cursor: 'pointer',
          }}>
          ← Go back
        </button>
        <button
          onClick={() => nav('/dashboard')}
          style={{
            padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
            background: 'var(--brand)', color: '#fff',
            border: 'none', cursor: 'pointer',
          }}>
          Home
        </button>
      </div>
    </div>
  )
}