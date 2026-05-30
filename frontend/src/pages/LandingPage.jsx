import { useNavigate } from 'react-router-dom'

const SKILLS = ['Python', 'Guitar', 'Spanish', 'React', 'Piano', 'Figma', 'Yoga', 'Chess', 'French', 'Photography', 'Drawing', 'Machine Learning']

export default function LandingPage() {
  const nav = useNavigate()
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .hero-title { font-family: 'Playfair Display', Georgia, serif; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>

      {/* Nav */}
      <nav className="px-6 h-14 flex items-center justify-center max-w-4xl mx-auto border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 border border-blue-500/60 flex items-center justify-center">
            <span className="text-blue-400 font-bold" style={{ fontFamily: 'Georgia, serif' }}>S</span>
          </div>
          <span className="font-medium text-gray-300 tracking-wide">SkillX</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-2xl mx-auto px-6 pt-20 pb-14 text-center">
        <div className="inline-flex items-center gap-2 border border-gray-700 text-xs px-3 py-1.5 mb-8 text-gray-500 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          100% credit-based · no money needed
        </div>
        <h1 className="hero-title text-4xl sm:text-5xl font-bold text-gray-200 leading-tight mb-0">
          Teach what you know.<br />
          <em className="text-blue-400">Learn what you love.</em>
        </h1>
        <div className="w-10 h-px bg-blue-500 mx-auto my-6 opacity-40" />
        <p className="text-gray-500 text-base max-w-md mx-auto mb-8">
          Peer-to-peer skill exchange. Teach to earn credits. Spend them to learn anything.
        </p>
        <button onClick={() => nav('/signup')} className="btn btn-primary btn-lg">Create Free Account →</button>
      </div>

      {/* Marquee */}
      <div className="border-y border-gray-800 py-3 overflow-hidden mb-16">
        <div className="flex gap-3 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <span key={i} className="px-4 py-1.5 border border-gray-700 text-gray-500 text-sm flex-shrink-0 tracking-wide">{s}</span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-gray-800" />
          <h2 className="text-gray-500 text-xs font-medium tracking-[0.2em] uppercase">How it works</h2>
          <div className="h-px w-12 bg-gray-800" />
        </div>
        <div className="grid sm:grid-cols-3 gap-px bg-gray-800 border border-gray-800">
          {[
            { n: '01', title: 'Set up your profile', desc: 'Tell us what you teach and want to learn. Takes 2 minutes.' },
            { n: '02', title: 'Get matched', desc: 'We find people whose skills complement yours.' },
            { n: '03', title: 'Exchange & grow', desc: 'Book sessions, earn credits teaching, spend them learning.' },
          ].map(s => (
            <div key={s.n} className="card p-5" style={{ background: 'var(--bg)' }}>
              <div className="hero-title text-2xl font-bold text-blue-900/60 mb-3">{s.n}</div>
              <h3 className="font-medium text-gray-400 text-sm mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-gray-800 py-5 text-center text-gray-700 text-xs tracking-widest uppercase">
        © {new Date().getFullYear()} SkillX
      </footer>
    </div>
  )
}