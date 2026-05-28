import { useNavigate } from 'react-router-dom'

const SKILLS = ['Python', 'Guitar', 'Spanish', 'React', 'Piano', 'Figma', 'Yoga', 'Chess', 'French', 'Photography', 'Drawing', 'Machine Learning']

export default function LandingPage() {
  const nav = useNavigate()
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Nav */}
      <nav className="px-6 h-14 flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="font-bold text-gray-300 text-lg">SkillX</span>
        </div>
        <button onClick={() => nav('/signup')} className="btn btn-primary btn-md">Create Free Account</button>
      </nav>

      {/* Hero */}
      <div className="max-w-2xl mx-auto px-6 pt-20 pb-14 text-center">
        <div className="inline-flex items-center gap-2 border border-gray-200 text-xs font-medium px-3 py-1 rounded-full mb-6 text-gray-500" style={{ background: 'var(--bg)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse text-lg" />
          100% credit-based · no money needed
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-600 leading-tight tracking-tight mb-4">
          Teach what you know.<br />
          <span className="text-blue-500">Learn what you love.</span>
        </h1>
        <p className="text-gray-400 text-base max-w-md mx-auto mb-8">
          Peer-to-peer skill exchange. Teach to earn credits. Spend them to learn anything.
        </p>
        <button onClick={() => nav('/signup')} className="btn btn-primary btn-lg text-lg">Start for free →</button>
      </div>

      {/* Marquee */}
      <div className="border-y border-gray-100 py-3 overflow-hidden mb-16">
        <div className="flex gap-3 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <span key={i} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 text-sm flex-shrink-0">{s}</span>
          ))}
        </div>
        <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>

      {/* How it works */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-center text-xl font-bold text-gray-500 mb-8">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { n: '1', title: 'Set up your profile', desc: 'Tell us what you teach and want to learn. Takes 2 minutes.' },
            { n: '2', title: 'Get matched', desc: 'We find people whose skills complement yours.' },
            { n: '3', title: 'Exchange & grow', desc: 'Book sessions, earn credits teaching, spend them learning.' },
          ].map(s => (
            <div key={s.n} className="card p-5">
              <div className="w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center mb-3">{s.n}</div>
              <h3 className="font-semibold text-gray-500 text-sm mb-1">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-gray-100 py-5 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} SkillX
      </footer>
    </div>
  )
}