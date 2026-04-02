import { Routes, Route, Link, useLocation } from 'react-router-dom'
import TestSelector from './pages/TestSelector'
import WhyTrio from './pages/WhyTrio'
import ArrangeTrio from './pages/ArrangeTrio'
import ManageResults from './pages/ManageResults'
import QuickRef from './pages/QuickRef'

const nav = [
  { to: '/', label: '🧬 Test Selector' },
  { to: '/why-trio', label: '❓ Why Trio?' },
  { to: '/arrange', label: '📋 Arrange Trio' },
  { to: '/results', label: '📊 Results' },
  { to: '/ref', label: '📖 Quick Ref' },
]

function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex">
        {nav.map(n => (
          <Link
            key={n.to}
            to={n.to}
            className={`flex-1 flex flex-col items-center py-2 text-xs gap-0.5 transition-colors ${
              (n.to === '/' ? pathname === '/' : pathname.startsWith(n.to))
                ? 'text-blue-700 font-semibold'
                : 'text-gray-400 hover:text-blue-600'
            }`}
          >
            <span className="text-lg leading-none">{n.label.split(' ')[0]}</span>
            <span className="leading-tight text-center">{n.label.split(' ').slice(1).join(' ')}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-blue-700 text-white px-4 py-3 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <span className="text-2xl">🧬</span>
          <div>
            <h1 className="font-bold text-base leading-tight">GeneGuide</h1>
            <p className="text-blue-200 text-xs">Paediatric Genetic Testing — North Tees</p>
          </div>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-5 pb-24">
        <Routes>
          <Route path="/" element={<TestSelector />} />
          <Route path="/why-trio" element={<WhyTrio />} />
          <Route path="/arrange" element={<ArrangeTrio />} />
          <Route path="/results" element={<ManageResults />} />
          <Route path="/ref" element={<QuickRef />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
