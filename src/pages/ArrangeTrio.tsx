import { useState } from 'react'
import { Link } from 'react-router-dom'

interface FormLink {
  label: string
  url: string
  note?: string
}

interface CheckItem {
  id: string
  step: number
  title: string
  detail: string
  bullets?: string[]
  links?: FormLink[]
  warning?: string
}

const CHECKLIST: CheckItem[] = [
  {
    id: 'eligibility',
    step: 1,
    title: 'Confirm eligibility',
    detail: 'Check the patient meets WGS rare disease eligibility criteria before proceeding. Key indications relevant to community paediatrics:',
    bullets: [
      'R27 — Paediatric disorders (congenital malformation, dysmorphism, ID, GDD) ✅ Community paeds',
      'R28/R137 — Chromosomal microarray (recognisable chromosomal syndromes) ✅ Community paeds',
      'R29 — Intellectual disability WGS ✅ Community paeds',
      'R48 — Prader-Willi syndrome ✅ Community paeds',
      'R69 — Hypotonic infant with likely central cause ✅ Community paeds',
      'R70 — SMA type 1 ✅ Community paeds',
      'R59 — Early onset/syndromic epilepsy ⚠️ Neurology/Clinical Genetics/Metabolic Medicine only',
      'R72 — Myotonic dystrophy ⚠️ Clinical Genetics or Neurology only',
      'R98 — Inborn errors of metabolism ⚠️ Metabolic Medicine/Clinical Genetics only',
      'R104 — Skeletal dysplasia ⚠️ Clinical Genetics only (requires specialist review first)',
    ],
    links: [
      {
        label: 'NEY GLH WGS Eligibility & Sample Requirements',
        url: 'https://ney-genomics.org.uk/testing/whole-genome-sequencing-documentation/',
        note: 'Full eligibility criteria and sample volumes',
      },
    ],
  },
  {
    id: 'local-forms',
    step: 2,
    title: 'Complete local DNA request forms — one per person',
    detail: 'Fill out a NEY GLH Genetic Testing Request Form for each individual in the trio (proband + mother + father). These are the phlebotomy request forms used by the lab.',
    bullets: [
      'Complete one form per trio member (3 forms total)',
      'Mark clearly "FOR WGS" in the Test section',
      'These forms direct phlebotomy — not the WGS referral form',
    ],
    links: [
      {
        label: 'NEY GLH Rare Disease Request Form (v4.2)',
        url: 'https://ney-genomics.org.uk/wp-content/uploads/2026/03/FORM-411.027-NEYGLH-Rare-Disease-Request-Form-v4.2.docx',
        note: 'Use for phlebotomy — one per person, mark "FOR WGS"',
      },
    ],
  },
  {
    id: 'wgs-form',
    step: 3,
    title: 'Complete the WGS Rare Disease Trio referral form',
    detail: 'One form covers the whole family (trio, duo, or singleton). Can be completed outside clinic. Best completed electronically using Fill & Sign in Adobe — auto-populates demographic fields.',
    bullets: [
      'Select the clinical indication and R code from the drop-down',
      'Add secondary virtual panels if relevant (via PanelApp)',
      'Complete family members section for trio/duo',
      'Page 2: enter phenotype using HPO terms OR tick from the provided list',
      'Up to 10 HPO terms — must be exact. Incorrect HPO terms can lead to missed results',
      'Electronic completion strongly advised',
    ],
    links: [
      {
        label: 'GMS Test Order Form — Rare Disease (v1.5)',
        url: 'https://www.england.nhs.uk/wp-content/uploads/2024/07/gms-test-order-form-rare-disease-v1.5.pdf',
        note: 'National WGS referral form — one per family',
      },
      {
        label: 'NHS GMS PanelApp — virtual panels',
        url: 'https://nhsgms-panelapp.genomicsengland.co.uk/panels',
        note: 'Search "GMS Rare Disease Virtual" for secondary panels',
      },
      {
        label: 'Human Phenotype Ontology (HPO)',
        url: 'https://hpo.jax.org/app/',
        note: 'Search and copy exact HPO terms for the phenotype section',
      },
      {
        label: 'National Genomic Test Directory',
        url: 'https://www.england.nhs.uk/publication/national-genomic-test-directories/',
        note: 'Full list of eligible clinical indications and R codes',
      },
    ],
  },
  {
    id: 'rod-forms',
    step: 4,
    title: 'Complete Record of Discussion (RoD) forms — one per person',
    detail: 'A RoD form must be completed for every member of the trio. The form covers consent for genomic testing AND the option to contribute to the National Genomic Research Library (NGRL).',
    bullets: [
      'Anyone aged 16+ signs their own form',
      'A parent signs for a child under 16 — indicate this in the appropriate box',
      'If signing as Consultee for an adult without capacity — also complete the Genomic Consultee Declaration',
      'If NGRL research option is selected (Question B = Yes) — Consultee Declaration is mandatory',
      'Complete the Healthcare Professional section: Patient category + Test Type = Rare and Inherited Diseases – WGS',
      'Samples WILL NOT be dispatched for analysis without completed RoD forms',
    ],
    links: [
      {
        label: 'Record of Discussion Form (v4.03)',
        url: 'https://www.england.nhs.uk/wp-content/uploads/2021/09/nhs-genomic-medicine-service-record-of-discussion-form.pdf',
        note: 'NHS GMS consent form — one per person',
      },
      {
        label: 'Young Persons Assent Form (v3.02)',
        url: 'https://www.england.nhs.uk/wp-content/uploads/2021/09/nhs-genomic-medicine-service-young-persons-assent-form.pdf',
        note: 'For children aged ~7–16 who can give assent',
      },
      {
        label: 'Genomic Consultee Declaration (v3.02)',
        url: 'https://www.england.nhs.uk/wp-content/uploads/2021/09/nhs-genomic-medicine-service-genomic-consultee-declaration-1.pdf',
        note: 'Required if NGRL research option selected for adult without capacity',
      },
    ],
    warning: 'Samples will NOT be dispatched for analysis until completed test request form AND all RoD forms have been received by the lab.',
  },
  {
    id: 'email',
    step: 5,
    title: 'Email forms to the lab',
    detail: 'Email the completed WGS referral form and all RoD forms together to your local GLH lab. Include the proband\'s NHS number and "WGS request" in the subject line.',
    bullets: [
      'Newcastle: nuth.dna@nhs.net',
      'Leeds: leedsth-tr.DNA@nhs.net',
      'Sheffield: sheffield.diagnosticgenetics@nhs.net',
    ],
  },
  {
    id: 'bloods',
    step: 6,
    title: 'Send blood samples',
    detail: 'Arrange blood samples for the proband and both parents using the local DNA request forms completed in step 2. Send to your local GLH extraction lab.',
    links: [
      {
        label: 'NEY GLH WGS Documentation — sample requirements',
        url: 'https://ney-genomics.org.uk/testing/whole-genome-sequencing-documentation/',
        note: 'Volume and tube requirements',
      },
    ],
  },
]

export default function ArrangeTrio() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['eligibility']))

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
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
        <p className="text-base text-gray-500">Step-by-step checklist — NEY Genomic Laboratory Hub</p>
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
          const open = expanded.has(item.id)
          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border-2 shadow-sm transition-all ${done ? 'border-teal-300' : 'border-gray-200'}`}
            >
              {/* Header row — tap to expand/collapse */}
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full p-4 flex items-start gap-3 text-left"
              >
                {/* Step circle — tap to mark done */}
                <div
                  role="button"
                  onClick={e => { e.stopPropagation(); toggle(item.id) }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    done ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {done ? '✓' : item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${done ? 'text-teal-700' : 'text-gray-800'}`}>
                    {item.title}
                  </p>
                </div>
                <span className="text-gray-400 text-sm mt-0.5">{open ? '▲' : '▼'}</span>
              </button>

              {/* Expanded content */}
              {open && (
                <div className="px-4 pb-4 space-y-3">
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>

                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="space-y-1.5">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-blue-400 font-bold mt-0.5 shrink-0">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.warning && (
                    <div className="bg-red-50 border border-red-300 rounded-xl px-3 py-2">
                      <p className="text-red-700 text-sm font-semibold">⚠️ {item.warning}</p>
                    </div>
                  )}

                  {item.links && item.links.length > 0 && (
                    <div className="space-y-2">
                      {item.links.map(link => (
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
                  )}

                  {/* Email buttons for step 5 */}
                  {item.id === 'email' && (
                    <div className="space-y-2 mt-1">
                      {[
                        { label: 'Newcastle', email: 'nuth.dna@nhs.net' },
                        { label: 'Leeds', email: 'leedsth-tr.DNA@nhs.net' },
                        { label: 'Sheffield', email: 'sheffield.diagnosticgenetics@nhs.net' },
                      ].map(lab => (
                        <a
                          key={lab.email}
                          href={`mailto:${lab.email}`}
                          className="flex items-center justify-between bg-blue-700 text-white px-4 py-2.5 rounded-xl hover:bg-blue-800 transition-colors"
                        >
                          <span className="text-sm font-semibold">{lab.label}</span>
                          <span className="text-blue-200 text-xs">{lab.email}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => toggle(item.id)}
                    className={`w-full py-2 rounded-xl text-sm font-semibold transition-colors ${
                      done
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {done ? '✓ Mark incomplete' : 'Mark complete'}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Reset */}
      <button
        onClick={() => { setChecked(new Set()); setExpanded(new Set(['eligibility'])) }}
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
