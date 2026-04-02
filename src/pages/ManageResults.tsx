import { useState } from 'react'

const RESULTS = [
  {
    id: 'nothing',
    label: 'Nothing found',
    colour: 'gray',
    emoji: '🔍',
    title: 'No diagnostic variant identified',
    actions: [
      'Consider likelihood of a monogenic disorder given phenotype and family history',
      'Consider whether Genetics MDT discussion is indicated',
      'Consider referral to Clinical Genetics if not already done',
      'Discuss with Northern Genetics if uncertain about next steps',
    ],
    refer: false,
    mdt: true,
  },
  {
    id: 'diagnostic',
    label: 'Gene variant(s) explaining presentation',
    colour: 'green',
    emoji: '✅',
    title: 'Pathogenic / likely pathogenic variant — genetic diagnosis made',
    actions: [
      'Inform patient/family of the results',
      'Refer to Clinical Genetics',
      'Discuss implications for family members (cascade testing)',
    ],
    refer: true,
    mdt: false,
  },
  {
    id: 'unexpected',
    label: 'Unexpected variant found',
    colour: 'orange',
    emoji: '⚠️',
    title: 'Pathogenic / likely pathogenic variant — other healthcare implications',
    actions: [
      'Inform patient/family of the results',
      'Refer to Clinical Genetics — urgent if clinically indicated',
      'These variants are reportable due to implications beyond the presenting condition',
      'Contact Northern Genetics for advice on how to share and manage',
    ],
    refer: true,
    mdt: false,
  },
  {
    id: 'uncertain',
    label: 'Uncertain variant found (VUS)',
    colour: 'yellow',
    emoji: '❓',
    title: 'Variant of uncertain significance',
    actions: [
      'Genetics MDT discussion is indicated',
      'Referral to Clinical Genetics is indicated',
      'Do not share result with patient/family without genetics input',
      'Contact Northern Genetics for guidance on result sharing',
    ],
    refer: true,
    mdt: true,
  },
]

const colourMap = {
  gray: { bg: 'bg-gray-50', border: 'border-gray-300', badge: 'bg-gray-200 text-gray-700', btn: 'bg-gray-600 hover:bg-gray-700' },
  green: { bg: 'bg-green-50', border: 'border-green-400', badge: 'bg-green-200 text-green-800', btn: 'bg-green-600 hover:bg-green-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-400', badge: 'bg-orange-200 text-orange-800', btn: 'bg-orange-600 hover:bg-orange-700' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-400', badge: 'bg-yellow-200 text-yellow-800', btn: 'bg-yellow-600 hover:bg-yellow-700' },
}

export default function ManageResults() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Managing WGS Results</h2>
        <p className="text-sm text-gray-500">Select the result type to see what action to take</p>
      </div>

      {/* Result selector */}
      <div className="space-y-2">
        {RESULTS.map(r => {
          const c = colourMap[r.colour as keyof typeof colourMap]
          const isSelected = selected === r.id
          return (
            <button
              key={r.id}
              onClick={() => setSelected(isSelected ? null : r.id)}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                isSelected ? `${c.bg} ${c.border}` : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.emoji}</span>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                    {r.label}
                  </p>
                  {isSelected && <p className="text-xs text-gray-500 mt-0.5">{r.title}</p>}
                </div>
                <span className="text-gray-400 text-sm">{isSelected ? '▲' : '▼'}</span>
              </div>

              {isSelected && (
                <div className="mt-4 space-y-3" onClick={e => e.stopPropagation()}>
                  <div className="space-y-2">
                    {r.actions.map((a, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold text-sm mt-0.5 flex-shrink-0">→</span>
                        <p className="text-sm text-gray-700">{a}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap pt-1">
                    {r.refer && (
                      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Refer to Clinical Genetics
                      </span>
                    )}
                    {r.mdt && (
                      <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Genetics MDT indicated
                      </span>
                    )}
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Contact genetics */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-3">⚠️ Complex result sharing</h3>
        <p className="text-sm text-gray-600 mb-3">
          Result sharing can be complex — particularly for unexpected or uncertain variants. Do not share results with patients without genetics input where there is uncertainty.
        </p>
        <a
          href="mailto:nuth.dna@nhs.net"
          className="block bg-blue-700 text-white font-semibold text-center py-3 rounded-xl text-sm hover:bg-blue-800 transition-colors"
        >
          📧 Contact Northern Genetics — nuth.dna@nhs.net
        </a>
      </div>
    </div>
  )
}
