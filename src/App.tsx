import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
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
  const navigate = useNavigate()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-bottom">
      <div className="flex">
        {nav.map(n => {
          const active = n.to === '/' ? pathname === '/' : pathname.startsWith(n.to)
          return (
            <button
              key={n.to}
              onClick={() => navigate(n.to)}
              className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
                active ? 'text-blue-700' : 'text-gray-400 hover:text-blue-600'
              }`}
            >
              <span className="text-2xl leading-none">{n.label.split(' ')[0]}</span>
              <span className={`text-xs leading-tight text-center font-medium ${active ? 'font-bold' : ''}`}>
                {n.label.split(' ').slice(1).join(' ')}
              </span>
              {active && <span className="w-1 h-1 rounded-full bg-blue-700 mt-0.5" />}
            </button>
          )
        })}
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
            <h1 className="font-bold text-lg leading-tight">GeneGuide</h1>
            <p className="text-blue-200 text-sm">Paediatric Genetic Testing — North Tees</p>
          </div>
        </div>
      </header>
      <ScrollToTop />
      <main className="max-w-2xl mx-auto px-4 py-6 pb-28">
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
