// src/components/common/EmptyState.jsx
export default function EmptyState({ icon = '📭', title, subtitle, actions }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '48px 24px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 16,
    }}>
      <div style={{ fontSize: 44, marginBottom: 12, lineHeight: 1 }}>{icon}</div>
      <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', margin: '0 0 6px' }}>{title}</p>
      {subtitle && (
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: '0 0 20px', lineHeight: 1.5 }}>
          {subtitle}
        </p>
      )}
      {actions && (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {actions}
        </div>
      )}
    </div>
  )
}