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

type SyndromeInfo = {
  name: string
  features: string[]
  genetics: string
  test: string
  link?: { label: string; url: string }
}

const SYNDROME_INFO: Record<string, SyndromeInfo> = {
  "Down's syndrome": {
    name: "Down's syndrome (Trisomy 21)",
    features: [
      "Upslanting palpebral fissures, epicanthic folds",
      "Flat facial profile, small ears",
      "Single palmar crease",
      "Hypotonia, joint laxity",
      "Short stature",
      "Intellectual disability (mild–moderate)",
    ],
    genetics: "Trisomy 21 in 95% of cases. Translocation (4%) or mosaic (1%) forms also occur.",
    test: "Karyotype (R297) is the primary diagnostic test. Microarray (R28) if translocation or mosaic form suspected. WGS (R27) is not the first-line test for Down's — diagnosis is usually clinical or antenatal.",
    link: { label: "DS health surveillance pathway", url: "https://dspathway.app" },
  },
  "Turner's syndrome": {
    name: "Turner syndrome (45,X)",
    features: [
      "Short stature (most consistent feature)",
      "Webbed neck, low posterior hairline",
      "Widely spaced nipples, shield chest",
      "Lymphoedema of hands/feet at birth",
      "Ovarian dysgenesis → primary amenorrhoea",
      "Bicuspid aortic valve, coarctation",
    ],
    genetics: "45,X in 50%; mosaic forms (45,X/46,XX) or structural X abnormalities in remainder.",
    test: "Karyotype (R297) — the primary test for suspected Turner's. Microarray for structural X chromosome variants. Not a primary R28 indication — refer to Clinical Genetics or Endocrinology.",
  },
  "Williams syndrome": {
    name: "Williams syndrome (7q11.23 deletion)",
    features: [
      "Elfin facies — periorbital fullness, stellate iris",
      "Friendly, loquacious personality",
      "Intellectual disability with relative language strength",
      "Hypercalcaemia in infancy",
      "Supravalvular aortic stenosis (SVAS)",
      "Hypersensitivity to sound",
    ],
    genetics: "~1.5 Mb deletion at 7q11.23 including ELN gene. De novo in most cases.",
    test: "Chromosomal microarray (R28/R137) — detects 7q11.23 deletion reliably",
  },
  "22q11 deletion": {
    name: "22q11.2 Deletion syndrome (DiGeorge / velocardiofacial)",
    features: [
      "Congenital heart defects (conotruncal — TOF, IAA, VSD)",
      "Palatal abnormalities — cleft, VPI, submucous cleft",
      "Immune deficiency (T-cell, thymic hypoplasia)",
      "Hypocalcaemia (hypoparathyroidism)",
      "Characteristic facies — tubular nose, small ears",
      "Learning difficulties, psychiatric risk (schizophrenia ~25%)",
    ],
    genetics: "~3 Mb deletion at 22q11.2, includes TBX1. Usually de novo; AD inheritance.",
    test: "Chromosomal microarray (R28/R137) — FISH no longer first-line",
  },
  "Cri du Chat": {
    name: "Cri du Chat syndrome (5p deletion)",
    features: [
      "High-pitched cat-like cry in infancy",
      "Microcephaly",
      "Wide-set eyes (hypertelorism), low-set ears",
      "Low birth weight, feeding difficulties",
      "Severe intellectual disability",
      "Behavioural features — self-injurious behaviour",
    ],
    genetics: "Deletion of short arm of chromosome 5 (5p15.2-p15.3). Usually de novo; size correlates with severity.",
    test: "Chromosomal microarray (R28/R137)",
  },
  "Other recognisable syndrome": {
    name: "Other recognisable chromosomal syndrome",
    features: [
      "Clinical features suggest a specific chromosomal or contiguous gene deletion syndrome",
      "May include: Angelman, Prader-Willi, Smith-Magenis, Wolf-Hirschhorn, Kabuki, Cornelia de Lange",
      "Consider whether features fit a recognisable pattern",
    ],
    genetics: "Variable — depends on suspected syndrome. Many are caused by chromosomal deletions/duplications detectable by microarray.",
    test: "Chromosomal microarray (R28/R137) as first-line. Discuss with Northern Genetics if uncertain.",
  },
}

const RECOGNISABLE = Object.keys(SYNDROME_INFO)

const QUICK_SINGLES = [
  { code: 'R70', name: 'Spinal muscular atrophy type 1', paeds: true },
  { code: 'R72', name: 'Myotonic dystrophy', paeds: false, specialist: 'Clinical Genetics or Neurology' },
  { code: 'R48', name: 'Prader-Willi syndrome', paeds: true },
  { code: '—', name: 'Imprinting disorders', paeds: true },
]

const QUICK_SINGLES_INFO: Record<string, SyndromeInfo> = {
  'Spinal muscular atrophy type 1': {
    name: 'Spinal muscular atrophy type 1 (R70)',
    features: [
      'Onset before 6 months, never achieves sitting',
      'Profound hypotonia — "floppy infant"',
      'Paradoxical breathing (chest sucks in on inspiration)',
      'Tongue fasciculations',
      'Alert, bright expression (cognition preserved)',
      'Areflexia',
    ],
    genetics: 'Autosomal recessive. Homozygous deletion of SMN1 exon 7 in ~95%. SMN2 copy number modifies severity.',
    test: 'R70 — SMN1 deletion analysis (MLPA). Fast turnaround. Do not wait for WGS — treatment window is narrow. Nusinersen/onasemnogene available on NHS.',
  },
  'Myotonic dystrophy': {
    name: 'Myotonic dystrophy (R72)',
    features: [
      'Congenital form: severe hypotonia, respiratory failure at birth, talipes',
      'Facial diplegia, tented upper lip',
      'Mother almost always affected (often mildly)',
      'Childhood form: learning difficulties, myotonia, facial weakness',
      'Ptosis, distal muscle weakness',
      'Cardiac conduction defects (older patients)',
    ],
    genetics: 'Autosomal dominant. CTG trinucleotide repeat expansion in DMPK gene (chromosome 19q). Anticipation — expands with maternal transmission.',
    test: 'R72 — DMPK repeat expansion analysis. Examine and test mother if congenital form suspected.',
  },
  'Prader-Willi syndrome': {
    name: 'Prader-Willi syndrome (R48)',
    features: [
      'Neonatal hypotonia, poor feeding, FTT',
      'Hyperphagia and obesity from ~2 years',
      'Hypogonadism, cryptorchidism',
      'Short stature',
      'Mild–moderate intellectual disability',
      'Behavioural problems — rigidity, skin-picking, temper tantrums',
    ],
    genetics: 'Paternal 15q11-q13 deletion (70%), maternal uniparental disomy (25%), or imprinting defect (5%). Imprinting centre controls expression.',
    test: 'R48 — methylation-specific MLPA detects all three mechanisms. Do not rely on microarray alone (misses UPD and imprinting defects).',
  },
  'Imprinting disorders': {
    name: 'Imprinting disorders',
    features: [
      'Angelman syndrome: severe ID, absent speech, seizures, happy affect, ataxia',
      'Beckwith-Wiedemann: macrosomia, macroglossia, omphalocele, hypoglycaemia, tumour risk',
      'Silver-Russell: severe growth restriction, relative macrocephaly, body asymmetry',
      'Temple syndrome: hypotonia, developmental delay, early puberty, obesity',
      'Consider when features do not fit a standard pattern',
    ],
    genetics: 'Caused by abnormal imprinting at various loci. Mechanisms include deletion, UPD, and imprinting centre defects. Standard microarray may miss UPD and methylation errors.',
    test: 'Methylation-specific tests required (not standard microarray). Discuss with Northern Genetics to select the correct panel for the suspected syndrome.',
  },
}


const FORM_LINKS = [
  { label: 'GMS Test Order Form — Rare Disease (v1.5)', url: 'https://www.england.nhs.uk/wp-content/uploads/2024/07/gms-test-order-form-rare-disease-v1.5.pdf', note: 'National WGS request form' },
  { label: 'NEY GLH Rare Disease Request Form (v4.2)', url: 'https://ney-genomics.org.uk/wp-content/uploads/2026/03/FORM-411.027-NEYGLH-Rare-Disease-Request-Form-v4.2.docx', note: 'Local NEY GLH form — also required' },
  { label: 'Record of Discussion Form (v4.03)', url: 'https://www.england.nhs.uk/wp-content/uploads/2021/09/nhs-genomic-medicine-service-record-of-discussion-form.pdf', note: 'Consent form — one per person (×3)' },
  { label: 'Young Persons Assent Form (v3.02)', url: 'https://www.england.nhs.uk/wp-content/uploads/2021/09/nhs-genomic-medicine-service-young-persons-assent-form.pdf', note: 'For children aged ~7–16' },
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
      className={`w-full py-3 px-4 rounded-xl font-semibold text-base transition-all ${cls}`}
    >
      {children}
    </button>
  )
}

function SyndromeModal({ info, onClose }: { info: SyndromeInfo; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-2 pb-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-blue-700 text-white px-5 py-4 rounded-t-2xl flex items-start justify-between">
          <h3 className="font-bold text-base leading-snug pr-4">{info.name}</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white text-2xl leading-none mt-[-2px]">×</button>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Key clinical features</p>
            <ul className="space-y-1">
              {info.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Genetics</p>
            <p className="text-sm text-gray-700 leading-relaxed">{info.genetics}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">Recommended test</p>
            <p className="text-sm text-blue-800 font-medium">{info.test}</p>
          </div>
          {info.link && (
            <a
              href={info.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl p-3 text-teal-700 hover:bg-teal-100 transition-colors"
            >
              <span className="text-lg">🔗</span>
              <div>
                <p className="text-xs font-semibold text-teal-500 uppercase tracking-wide">Related resource</p>
                <p className="text-sm font-medium">{info.link.label}</p>
              </div>
            </a>
          )}
        </div>
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function ResultBox({ title, code, rationale, actions, formLinks, urgent }: {
  title: string
  code: string
  rationale: string
  actions?: string[]
  formLinks?: { label: string; url: string; note?: string }[]
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
        <p className="text-gray-700 text-base leading-relaxed">{rationale}</p>
      </Card>
      {actions && actions.length > 0 && (
        <Card>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Next steps</p>
          <ul className="space-y-2">
            {actions.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-gray-700">
                <span className="text-teal-500 font-bold mt-0.5">→</span>
                {a}
              </li>
            ))}
          </ul>
        </Card>
      )}
      {formLinks && formLinks.length > 0 && (
        <Card>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Forms & documents</p>
          <div className="space-y-2">
            {formLinks.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 hover:bg-blue-100 transition-colors"
              >
                <span className="text-blue-500 mt-0.5 shrink-0">📄</span>
                <div>
                  <p className="text-blue-700 text-sm font-semibold leading-snug">{link.label}</p>
                  {link.note && <p className="text-blue-400 text-xs mt-0.5">{link.note}</p>}
                </div>
              </a>
            ))}
          </div>
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
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const reset = () => {
    setStep('start')
    setBoxASelected([])
    setSeizures(false)
    setPregnant(false)
    setUrgent(false)
    setRecognisableSelected([])
    setActiveModal(null)
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
      {/* Syndrome info modal */}
      {activeModal && (() => {
        const info = activeModal.startsWith('qs:')
          ? QUICK_SINGLES_INFO[activeModal.slice(3)]
          : SYNDROME_INFO[activeModal]
        return info ? <SyndromeModal info={info} onClose={() => setActiveModal(null)} /> : null
      })()}

      <div>
        <h2 className="text-xl font-bold text-gray-800">Test Selector</h2>
        <p className="text-base text-gray-500">North Tees community paediatrics genetic testing pathway — April 2026</p>
      </div>

      {/* Urgent flags — always visible */}
      {step !== 'start' && (
        <Card>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Urgent flags — check at any stage</p>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={pregnant} onChange={e => setPregnant(e.target.checked)}
                className="w-4 h-4 accent-red-600" />
              <span className="text-base text-gray-700">Mother of patient is pregnant</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={urgent} onChange={e => setUrgent(e.target.checked)}
                className="w-4 h-4 accent-red-600" />
              <span className="text-base text-gray-700">Urgent management implications</span>
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
          <p className="text-base font-semibold text-gray-700 mb-4">
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
          <p className="text-base font-semibold text-gray-700 mb-1">
            Does the clinical picture suggest a <strong>recognisable chromosomal condition</strong>?
          </p>
          <p className="text-xs text-gray-400 mb-3">Tick any that apply — tap the ⓘ for key features. Note: Down's and Turner's have specific karyotype pathways (R297) — R28 is not primary for these.</p>
          <div className="space-y-2 mb-4">
            {RECOGNISABLE.map(r => (
              <div key={r} className="flex items-center gap-2">
                <label className="flex items-center gap-3 cursor-pointer flex-1">
                  <input type="checkbox" checked={recognisableSelected.includes(r)}
                    onChange={() => toggleRec(r)} className="w-4 h-4 accent-blue-700 shrink-0" />
                  <span className="text-base text-gray-700">{r}</span>
                </label>
                {SYNDROME_INFO[r] && r !== 'Other recognisable syndrome' && (
                  <button
                    onClick={() => setActiveModal(r)}
                    className="shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold hover:bg-blue-200 transition-colors flex items-center justify-center"
                    aria-label={`Info about ${r}`}
                  >
                    ⓘ
                  </button>
                )}
              </div>
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
          <p className="text-base font-semibold text-gray-700 mb-1">
            Does the patient have any <strong>syndromic features</strong>? (Box A)
          </p>
          <p className="text-xs text-gray-400 mb-3">Tick all that apply</p>
          <div className="space-y-2 mb-4">
            {BOX_A.map(item => (
              <label key={item} className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={boxASelected.includes(item)}
                  onChange={() => toggleBoxA(item)} className="w-4 h-4 mt-0.5 accent-blue-700" />
                <span className="text-base text-gray-700">{item}</span>
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
          <p className="text-base font-semibold text-gray-700 mb-4">
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
          title="Chromosomal microarray (SNP array) — Paeds-led"
          code="R28 / R137"
          rationale={`Microarray is appropriate when there is strong clinical suspicion of a specific chromosomal cause${recognisableSelected.length > 0 ? ` (${recognisableSelected.join(', ')})` : ''} — it gives faster results for chromosomal deletions/duplications. Note: as of June 2025, WGS (R27) is now the default first-line test for most paediatric indications. Microarray is retained where chromosomal suspicion is high and speed matters. If Down's or Turner's is suspected, karyotype (R297) is the primary test — refer to Clinical Genetics. WGS detects CNVs and no longer requires separate microarray or fragile X testing.`}
          actions={[
            'Request R28 or R137 (SNP array) if strong chromosomal suspicion',
            'If Down\'s or Turner\'s suspected → karyotype (R297), refer to Clinical Genetics',
            'If microarray normal or chromosomal suspicion lower → request R27 WGS trio',
            'WGS (R27) is now first-line for most paediatric indications as of June 2025',
          ]}
          urgent={urgentFlag}
        />
      )}

      {step === 'result_r27_seizures' && (
        <ResultBox
          title="WGS trio — Paeds-led"
          code="R27 (inc. R59)"
          rationale="Patient has developmental delay with seizures only and no other syndromic features. R27 includes the R59 epilepsy panel across 13 sub-panels. WGS detects CNVs — no separate microarray needed. Trio approach maximises diagnostic yield."
          actions={[
            'Request R27 (includes R59)',
            'Arrange trio — proband + both parents',
            'Complete WGS request form + Record of Discussion forms',
            'Email forms to nuth.dna@nhs.net',
          ]}
          formLinks={FORM_LINKS}
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
          rationale="No additional syndromic features. Paeds-led R27 is appropriate and is now the default first-line WGS test for most paediatric patients (as of June 2025). R27 is a super panel covering 13 sub-panels including ID (R29), early onset epilepsy (R59), inborn errors of metabolism (R98), skeletal dysplasia (R104) and more. WGS detects CNVs — no separate microarray needed. Note: R98, R104, and R59 are covered within R27 but cannot be requested as standalone tests by community paediatricians — those require Metabolic Medicine, Neurology, or Clinical Genetics."
          actions={[
            'Request R27 paeds-led trio',
            'Arrange trio — proband + both parents',
            'Complete WGS request form + Record of Discussion forms',
            'Email forms to nuth.dna@nhs.net',
          ]}
          formLinks={FORM_LINKS}
          urgent={urgentFlag}
        />
      )}

      {step === 'out_of_scope' && (
        <Card>
          <p className="text-2xl mb-2">⚠️</p>
          <p className="font-semibold text-gray-800 mb-1">Outside this pathway</p>
          <p className="text-base text-gray-600">This pathway is for patients with at least moderate ID or GDD. Consider single gene / small panel tests with quick turnaround if a specific diagnosis is suspected, or contact Northern Genetics for advice.</p>
        </Card>
      )}

      {/* Quick turnaround singles — always shown once past start */}
      {step !== 'start' && step !== 'out_of_scope' && (
        <Card>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Also consider at any stage — quick turnaround single gene tests
          </p>
          <div className="flex gap-3 mb-3">
            <span className="text-xs text-gray-400 flex items-center gap-1">✅ Community paeds</span>
            <span className="text-xs text-gray-400 flex items-center gap-1">⚠️ Refer to specialist</span>
          </div>
          <div className="space-y-2">
            {QUICK_SINGLES.map(q => (
              <div key={q.code} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg min-w-10 text-center shrink-0 ${q.paeds === false ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{q.code}</span>
                  <span className="text-base text-gray-700 flex-1">{q.name}</span>
                  {QUICK_SINGLES_INFO[q.name] && (
                    <button
                      onClick={() => setActiveModal('qs:' + q.name)}
                      className="shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold hover:bg-blue-200 transition-colors flex items-center justify-center"
                      aria-label={`Info about ${q.name}`}
                    >
                      ⓘ
                    </button>
                  )}
                </div>
                {q.paeds === false && q.specialist && (
                  <p className="text-xs text-amber-700 ml-12">⚠️ Refer to {q.specialist} — cannot be requested by community paediatrics</p>
                )}
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
