import { useState } from 'react'
import { Link } from 'react-router-dom'

interface CheckItem {
  id: string
  step: number
  title: string
  detail: string
  hasQR?: boolean
  qrNote?: string
}

const CHECKLIST: CheckItem[] = [
  {
    id: 'wgs-form',
    step: 1,
    title: 'Complete WGS request form',
    detail: 'One form per trio (covers all three individuals). Available via QR code or Northern Genetics. Include clinical summary, phenotype details, and family history.',
    hasQR: true,
    qrNote: 'Scan to access WGS request form',
  },
  {
    id: 'rod-forms',
    step: 2,
    title: 'Complete Record of Discussion (ROD) forms',
    detail: 'One form per individual — three forms total (proband + mother + father). Documents informed consent discussion. Must be completed before samples are taken.',
    hasQR: true,
    qrNote: 'Scan to access ROD forms',
  },
  {
    id: 'blood-samples',
    step: 3,
    title: 'Arrange blood samples',
    detail: 'Proband + both parents. Each sample requires an individual genetic test request form (one per person). Samples sent to Genetics lab (Newcastle, Sheffield, or Leeds).',
    hasQR: true,
    qrNote: 'Scan to access NHS Genetic Testing Request Form',
  },
  {
    id: 'email',
    step: 4,
    title: 'Email copies to Northern Genetics',
    detail: 'Email a copy of the WGS request form AND all ROD forms to nuth.dna@nhs.net. Do this before or at the same time as sending samples.',
  },
]

export default function ArrangeTrio() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const allDone = checked.size === CHECKLIST.length

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Arrange Trio WGS</h2>
        <p className="text-base text-gray-500">Step-by-step checklist — Northern Genetics Service</p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 font-medium">{checked.size} of {CHECKLIST.length} steps complete</span>
          {allDone && <span className="text-teal-600 font-semibold">✓ All done</span>}
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${(checked.size / CHECKLIST.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        {CHECKLIST.map(item => {
          const done = checked.has(item.id)
          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border-2 shadow-sm transition-all ${done ? 'border-teal-300' : 'border-gray-200'}`}
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full p-4 flex items-start gap-4 text-left"
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  done ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300 text-gray-400'
                }`}>
                  {done ? '✓' : item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${done ? 'text-teal-700 line-through' : 'text-gray-800'}`}>
                    {item.title}
                  </p>
                  <p className="text-base text-gray-500 mt-1 leading-relaxed">{item.detail}</p>
                  {item.hasQR && (
                    <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 inline-flex items-center gap-2">
                      <span className="text-blue-700 text-sm">📱 {item.qrNote}</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Email action */}
      <div className="bg-blue-700 text-white rounded-2xl p-5">
        <p className="font-bold text-sm mb-1">📧 Email address for forms</p>
        <p className="text-blue-100 text-sm mb-3">Send WGS request form + all ROD forms to:</p>
        <a
          href="mailto:nuth.dna@nhs.net"
          className="block bg-white text-blue-700 font-bold text-center py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors"
        >
          nuth.dna@nhs.net
        </a>
      </div>

      {/* Reset */}
      <button
        onClick={() => setChecked(new Set())}
        className="w-full text-sm text-gray-400 hover:text-blue-600 py-2"
      >
        Reset checklist
      </button>

      {/* Link to results */}
      {allDone && (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center">
          <p className="text-teal-800 font-semibold text-sm mb-2">All steps complete ✓</p>
          <Link
            to="/results"
            className="inline-block bg-teal-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-teal-700"
          >
            What to do when results arrive →
          </Link>
        </div>
      )}
    </div>
  )
}
