import { useState } from 'react'

type Step =
  | 'start'
  | 'recognisable'
  | 'boxA'
  | 'additional'
  | 'result_array'
  | 'result_r27_seizures'
  | 'result_r27_genetics'
  | 'result_trio_mdt'
  | 'result_trio_paeds'
  | 'result_refer_genetics'
  | 'out_of_scope'

const BOX_A = [
  'Dysmorphic features',
  'Congenital anomalies',
  'Regression (not associated with autism)',
  'Growth abnormality',
  'Microcephaly (<0.4th centile) or macrocephaly',
  'Skin findings suggestive of genetic disorder (e.g. neurofibromatosis, tuberous sclerosis)',
]

const RECOGNISABLE = [
  "Down's syndrome",
  "Turner's syndrome",
  "Williams syndrome",
  "22q11 deletion",
  "Cri du Chat",
  "Other recognisable syndrome",
]

const QUICK_SINGLES = [
  { code: 'R70', name: 'Spinal muscular atrophy type 1' },
  { code: 'R72', name: 'Myotonic dystrophy' },
  { code: 'R48', name: 'Prader-Willi syndrome' },
  { code: '—', name: 'Imprinting disorders' },
]

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-5 ${className}`}>
      {children}
    </div>
  )
}

function Btn({ children, onClick, colour = 'blue' }: { children: React.ReactNode; onClick: () => void; colour?: 'blue' | 'teal' | 'gray' | 'red' }) {
  const cls = {
    blue: 'bg-blue-700 hover:bg-blue-800 text-white',
    teal: 'bg-teal-600 hover:bg-teal-700 text-white',
    gray: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300',
    red: 'bg-red-600 hover:bg-red-700 text-white',
  }[colour]
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all ${cls}`}
    >
      {children}
    </button>
  )
}

function ResultBox({ title, code, rationale, actions, urgent }: {
  title: string
  code: string
  rationale: string
  actions?: string[]
  urgent?: string
}) {
  return (
    <div className="space-y-4">
      {urgent && (
        <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4">
          <p className="text-red-700 font-bold text-sm">⚠️ {urgent}</p>
        </div>
      )}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">Recommended test</p>
        <h2 className="text-2xl font-bold text-blue-800">{code}</h2>
        <p className="text-blue-700 font-medium mt-1">{title}</p>
      </Card>
      <Card>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Why this test</p>
        <p className="text-gray-700 text-sm leading-relaxed">{rationale}</p>
      </Card>
      {actions && actions.length > 0 && (
        <Card>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Next steps</p>
          <ul className="space-y-2">
            {actions.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-teal-500 font-bold mt-0.5">→</span>
                {a}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}

export default function TestSelector() {
  const [step, setStep] = useState<Step>('start')
  const [boxASelected, setBoxASelected] = useState<string[]>([])
  const [_seizures, setSeizures] = useState(false)
  const [pregnant, setPregnant] = useState(false)
  const [urgent, setUrgent] = useState(false)
  const [recognisableSelected, setRecognisableSelected] = useState<string[]>([])

  const reset = () => {
    setStep('start')
    setBoxASelected([])
    setSeizures(false)
    setPregnant(false)
    setUrgent(false)
    setRecognisableSelected([])
  }

  const toggleBoxA = (item: string) =>
    setBoxASelected(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item])

  const toggleRec = (item: string) =>
    setRecognisableSelected(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item])

  const urgentFlag = pregnant
    ? 'Pregnant mother — refer mother and child urgently to Clinical Genetics. Do not wait for scans.'
    : urgent
    ? 'Urgent management implications — contact Northern Genetics for advice before proceeding.'
    : undefined

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Test Selector</h2>
        <p className="text-sm text-gray-500">North Tees community paediatrics genetic testing pathway — April 2026</p>
      </div>

      {/* Urgent flags — always visible */}
      {step !== 'start' && (
        <Card>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Urgent flags — check at any stage</p>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={pregnant} onChange={e => setPregnant(e.target.checked)}
                className="w-4 h-4 accent-red-600" />
              <span className="text-sm text-gray-700">Mother of patient is pregnant</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={urgent} onChange={e => setUrgent(e.target.checked)}
                className="w-4 h-4 accent-red-600" />
              <span className="text-sm text-gray-700">Urgent management implications</span>
            </label>
          </div>
          {(pregnant || urgent) && (
            <div className="mt-3 bg-red-50 border border-red-300 rounded-xl p-3">
              <p className="text-red-700 text-sm font-semibold">⚠️ {urgentFlag}</p>
            </div>
          )}
        </Card>
      )}

      {/* Step: Start */}
      {step === 'start' && (
        <Card>
          <p className="text-sm font-semibold text-gray-700 mb-4">
            Does the patient have at least <strong>moderate intellectual disability</strong> or at least <strong>moderate global developmental delay</strong>?
          </p>
          <div className="space-y-2">
            <Btn onClick={() => setStep('recognisable')}>Yes</Btn>
            <Btn colour="gray" onClick={() => setStep('out_of_scope')}>No</Btn>
          </div>
        </Card>
      )}

      {/* Step: Recognisable chromosomal condition */}
      {step === 'recognisable' && (
        <Card>
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Does the clinical picture suggest a <strong>recognisable chromosomal condition</strong>?
          </p>
          <p className="text-xs text-gray-400 mb-3">Tick any that apply</p>
          <div className="space-y-2 mb-4">
            {RECOGNISABLE.map(r => (
              <label key={r} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={recognisableSelected.includes(r)}
                  onChange={() => toggleRec(r)} className="w-4 h-4 accent-blue-700" />
                <span className="text-sm text-gray-700">{r}</span>
              </label>
            ))}
          </div>
          <div className="space-y-2">
            <Btn onClick={() => setStep('result_array')} colour="teal">
              Yes — recognisable syndrome suspected
            </Btn>
            <Btn onClick={() => setStep('boxA')} colour="gray">
              No — no recognisable syndrome
            </Btn>
          </div>
        </Card>
      )}

      {/* Step: Box A syndromic features */}
      {step === 'boxA' && (
        <Card>
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Does the patient have any <strong>syndromic features</strong>? (Box A)
          </p>
          <p className="text-xs text-gray-400 mb-3">Tick all that apply</p>
          <div className="space-y-2 mb-4">
            {BOX_A.map(item => (
              <label key={item} className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={boxASelected.includes(item)}
                  onChange={() => toggleBoxA(item)} className="w-4 h-4 mt-0.5 accent-blue-700" />
                <span className="text-sm text-gray-700">{item}</span>
              </label>
            ))}
          </div>
          {boxASelected.length > 0
            ? <Btn onClick={() => setStep('additional')}>Yes — has syndromic features →</Btn>
            : <Btn onClick={() => setStep('result_trio_paeds')} colour="teal">No additional features</Btn>
          }
        </Card>
      )}

      {/* Step: Additional branching */}
      {step === 'additional' && (
        <Card>
          <p className="text-sm font-semibold text-gray-700 mb-4">
            Which best describes the patient?
          </p>
          <div className="space-y-2">
            <Btn onClick={() => setStep('result_r27_seizures')}>
              Has seizures only (no other syndromic features)
            </Btn>
            <Btn onClick={() => setStep('result_r27_genetics')} colour="teal">
              Has syndromic features — genetics referral indicated
            </Btn>
            <Btn onClick={() => setStep('result_trio_mdt')} colour="gray">
              Additional features but best pathway unclear
            </Btn>
          </div>
        </Card>
      )}

      {/* Results */}
      {step === 'result_array' && (
        <ResultBox
          title="Array CGH (SNP array) — Paeds-led"
          code="R28 / R137"
          rationale={`Array CGH should be performed first when a recognisable chromosomal syndrome is suspected${recognisableSelected.length > 0 ? ` (${recognisableSelected.join(', ')})` : ''} — it provides faster results than WGS. Request R27 trio WGS if array CGH result is normal.`}
          actions={[
            'Request R28 or R137 (SNP array)',
            'If normal → request R27 WGS trio',
            'Note: WGS will identify CNVs and fragile X — no need to request array CGH or FraX separately if going straight to WGS',
          ]}
          urgent={urgentFlag}
        />
      )}

      {step === 'result_r27_seizures' && (
        <ResultBox
          title="WGS trio — Paeds-led"
          code="R27 (inc. R59)"
          rationale="Patient has developmental delay with seizures only and no other syndromic features. R27 includes R59 (epilepsy panel). Covers 2,892+ genes across 13 sub-panels. Trio approach maximises diagnostic yield."
          actions={[
            'Request R27 (includes R59)',
            'Arrange trio — proband + both parents',
            'Complete WGS request form + Record of Discussion forms',
            'Email forms to nuth.dna@nhs.net',
          ]}
          urgent={urgentFlag}
        />
      )}

      {step === 'result_r27_genetics' && (
        <ResultBox
          title="Consider referral to Clinical Genetics"
          code="R27 may still be appropriate"
          rationale="Patient has syndromic features suggesting a genetic disorder. Consider referral to Clinical Genetics. Paeds-led R27 may still be appropriate — use clinical judgement."
          actions={[
            'Consider referral to Clinical Genetics',
            'Paeds-led R27 may still be appropriate',
            'Discuss with Northern Genetics if uncertain',
          ]}
          urgent={urgentFlag}
        />
      )}

      {step === 'result_trio_mdt' && (
        <ResultBox
          title="Take to Genetics MDT"
          code="Trio R27"
          rationale="Additional features are present but the best pathway for this patient is unclear. Take to Genetics MDT for discussion. Trio R27 is the likely outcome."
          actions={[
            'Take to Genetics MDT',
            'Paeds-led R27 trio may be appropriate following MDT',
            'Contact Northern Genetics for advice',
          ]}
          urgent={urgentFlag}
        />
      )}

      {step === 'result_trio_paeds' && (
        <ResultBox
          title="WGS trio — Paeds-led"
          code="R27"
          rationale="No additional syndromic features. Paeds-led R27 is appropriate. R27 is a super panel covering 2,892+ genes across 13 sub-panels including ID (R29), inborn errors of metabolism (R98), skeletal dysplasia (R104) and more. Suitable for most paediatric patients with a possible syndromic genetic diagnosis."
          actions={[
            'Request R27 paeds-led trio',
            'Arrange trio — proband + both parents',
            'Complete WGS request form + Record of Discussion forms',
            'Email forms to nuth.dna@nhs.net',
          ]}
          urgent={urgentFlag}
        />
      )}

      {step === 'out_of_scope' && (
        <Card>
          <p className="text-2xl mb-2">⚠️</p>
          <p className="font-semibold text-gray-800 mb-1">Outside this pathway</p>
          <p className="text-sm text-gray-600">This pathway is for patients with at least moderate ID or GDD. Consider single gene / small panel tests with quick turnaround if a specific diagnosis is suspected, or contact Northern Genetics for advice.</p>
        </Card>
      )}

      {/* Quick turnaround singles — always shown once past start */}
      {step !== 'start' && step !== 'out_of_scope' && (
        <Card>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Also consider at any stage — quick turnaround single gene tests
          </p>
          <div className="space-y-2">
            {QUICK_SINGLES.map(q => (
              <div key={q.code} className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-lg min-w-10 text-center">{q.code}</span>
                <span className="text-sm text-gray-700">{q.name}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">These may not be detectable by WGS or have faster turnaround — request as single gene / small panel tests</p>
        </Card>
      )}

      {/* Reset */}
      {step !== 'start' && (
        <button onClick={reset} className="w-full text-sm text-gray-400 hover:text-blue-600 py-2">
          ← Start over
        </button>
      )}
    </div>
  )
}
